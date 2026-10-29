/* RSVP, ucapan & balasan (Google Sheet / localStorage). */
/* RSVP + ucapan + balasan: disimpan ke Google Sheet (C.rsvp); bila C.rsvp kosong → localStorage browser */
const PER = 5; // ucapan per halaman (pagination muncul jika lebih dari ini)
let WL = [],
  RL = [],
  wpg = 1,
  RO = null; // WL = ucapan, RL = balasan, wpg = halaman aktif, RO = id ucapan yang form balasannya terbuka
const W = () => WL;
const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const IN =
  "w-full px-3 py-2 rounded-xl bg-n9/80 border border-sk-300/30 outline-none focus:border-sk-300 text-base";
const draw = () => {
  const w = W(),
    n = (k) => w.filter((x) => x.k === k).length;
  $("#cnt").innerHTML = ["Hadir", "Tidak hadir", "Masih ragu"]
    .map(
      (k) =>
        `<span><b class="text-white text-xl">${n(k)}</b> ${k}</span>`,
    )
    .join("");
  const list = w
      .map((x, i) => [x, i])
      .sort((a, b) => (b[0].t || 0) - (a[0].t || 0) || b[1] - a[1])
      .map((a) => a[0]),
    pages = Math.max(1, Math.ceil(list.length / PER));
  wpg = Math.min(Math.max(wpg, 1), pages);
  const rf = $("#rf"),
    keep =
      rf && RO && rf.dataset.id === RO
        ? { n: $("#rn").value, m: $("#rm").value }
        : null; // pertahankan ketikan saat daftar di-refresh
  $("#wl").innerHTML = list
    .slice((wpg - 1) * PER, wpg * PER)
    .map((x) => {
      const rs = RL.filter((r) => r.w === x.id);
      return `<div class="rounded-2xl bg-n9/80 border border-sk-300/20 p-4"><p class="font-semibold text-white">${esc(x.n)} <span class="text-[10px] ml-1 px-2 py-0.5 rounded-full bg-sk-300/20 text-sk-300">${esc(x.k)}${x.k !== "Tidak hadir" && x.j && x.j !== "-" ? " · " + esc(x.j) : ""}</span></p><p class="text-sm mt-1">${esc(x.m)}</p>
  <button type="button" data-act="reply" data-id="${esc(x.id)}" class="mt-2 -ml-1 px-1 py-1 text-xs text-sk-300 hover:text-white transition">↩ Balas${rs.length ? ` · ${rs.length} balasan` : ""}</button>
  ${rs.length ? `<div class="mt-2 space-y-2 border-l-2 border-sk-300/30 pl-3">${rs.map((r) => `<div><p class="text-xs font-semibold text-white">${esc(r.n)}</p><p class="text-xs mt-0.5 break-words">${esc(r.m)}</p></div>`).join("")}</div>` : ""}
  ${RO === x.id ? `<form id="rf" data-id="${esc(x.id)}" class="mt-3 space-y-2"><input name="web" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden"><input id="rn" name="n" required minlength="2" maxlength="100" placeholder="Nama" class="${IN}"><textarea id="rm" name="m" required rows="2" maxlength="300" placeholder="Tulis balasan..." class="${IN}"></textarea><div class="flex gap-2"><button class="px-4 py-2 rounded-full bg-sk-300 text-n9 text-sm font-semibold hover:bg-white transition">Kirim Balasan</button><button type="button" data-act="cancel" class="px-4 py-2 rounded-full border border-sk-300/40 text-sm hover:bg-sk-300/10 transition">Batal</button></div></form>` : ""}</div>`;
    })
    .join("");
  if (keep) {
    $("#rn").value = keep.n;
    $("#rm").value = keep.m;
  }
  // pagination
  const nv = $("#pgn");
  if (pages < 2) {
    nv.innerHTML = "";
    return;
  }
  const pb = (p, l, on, off) =>
    `<button type="button" data-pg="${p}" ${off ? "disabled" : ""} ${on ? 'aria-current="page"' : ""} class="min-w-[2.25rem] h-9 px-3 rounded-full border transition ${on ? "bg-sk-300 text-n9 border-sk-300 font-semibold" : off ? "border-sk-300/20 text-sk-300/40" : "border-sk-300/40 hover:bg-sk-300/10"}">${l}</button>`;
  let h = pb(wpg - 1, "‹", 0, wpg === 1),
    lp = 0;
  [
    ...new Set(
      [1, wpg - 1, wpg, wpg + 1, pages].filter(
        (p) => p >= 1 && p <= pages,
      ),
    ),
  ]
    .sort((a, b) => a - b)
    .forEach((p) => {
      if (p - lp > 1) h += '<span class="px-1 text-sk-300/60">…</span>';
      h += pb(p, p, p === wpg);
      lp = p;
    });
  nv.innerHTML = h + pb(wpg + 1, "›", 0, wpg === pages);
};
const loadWishes = async () => {
  if (!C.rsvp) {
    WL = JSON.parse(localStorage.getItem("wishes") || "[]");
    WL.forEach((x, i) => (x.id = x.id || "l" + i));
    RL = JSON.parse(localStorage.getItem("replies") || "[]");
    return draw();
  }
  try {
    const r = await fetch(C.rsvp, { cache: "no-store" }),
      d = await r.json();
    if (d.ok) {
      WL = d.wishes || [];
      RL = d.replies || [];
    }
  } catch (_) {}
  draw();
};
// kirim ke Apps Script. no-cors: kiriman terkirim (respons tidak dibaca), daftar lalu dimuat ulang dari Sheet
const post = (d) =>
  fetch(C.rsvp, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(d),
  });
const busy = (b, txt) => {
  const t = b.textContent;
  b.disabled = true;
  b.textContent = txt;
  return () => {
    b.textContent = t;
    b.disabled = false;
  };
};
// jumlah tamu dinonaktifkan jika memilih "Tidak hadir"
const fk = $("#f").elements.k,
  fj = $("#f").elements.j;
const syncJ = () => {
  fj.disabled = fk.value === "Tidak hadir";
};
fk.addEventListener("change", syncJ);
$("#f").addEventListener("reset", () => setTimeout(syncJ));
syncJ();
$("#f").onsubmit = async (e) => {
  e.preventDefault();
  const f = e.target,
    d = Object.fromEntries(new FormData(f));
  d.id = uid();
  d.t = Date.now();
  if (d.k === "Tidak hadir") d.j = "-"; // field disabled tidak ikut terkirim
  localStorage.setItem("rname", d.n);
  if (!C.rsvp) {
    WL.push(d);
    localStorage.setItem("wishes", JSON.stringify(WL));
    f.reset();
    wpg = 1;
    return draw();
  }
  const b = f.querySelector("button"),
    t = b.textContent;
  b.disabled = true;
  b.textContent = "Mengirim...";
  try {
    await post(d);
    WL.push(d);
    f.reset();
    wpg = 1;
    draw();
    b.textContent = "Terkirim ✓ Terima kasih";
    setTimeout(loadWishes, 2500);
  } catch (_) {
    b.textContent = "Gagal mengirim, coba lagi";
  }
  setTimeout(() => {
    b.textContent = t;
    b.disabled = false;
  }, 2500);
};
// buka/tutup form balasan
$("#wl").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  if (b.dataset.act === "cancel") RO = null;
  else RO = RO === b.dataset.id ? null : b.dataset.id;
  draw();
  if (RO) {
    const n = $("#rn");
    n.value = localStorage.getItem("rname") || "";
    (n.value ? $("#rm") : n).focus();
  }
});
// kirim balasan
$("#wl").addEventListener("submit", async (e) => {
  const f = e.target.closest("#rf");
  if (!f) return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f));
  d.act = "reply";
  d.w = f.dataset.id;
  localStorage.setItem("rname", d.n);
  const r = { w: d.w, n: d.n.trim(), m: d.m.trim() };
  if (!C.rsvp) {
    RL.push(r);
    localStorage.setItem("replies", JSON.stringify(RL));
    RO = null;
    return draw();
  }
  const done = busy(f.querySelector("button:not([type])"), "Mengirim...");
  try {
    await post(d);
    RL.push(r);
    RO = null;
    draw();
    setTimeout(loadWishes, 2500);
  } catch (_) {
    done();
    alert("Gagal mengirim balasan, coba lagi.");
  }
});
// pindah halaman
$("#pgn").addEventListener("click", (e) => {
  const b = e.target.closest("[data-pg]");
  if (!b || b.disabled) return;
  wpg = +b.dataset.pg;
  draw();
  $("#cnt").scrollIntoView({ behavior: "smooth", block: "center" });
});
loadWishes();
