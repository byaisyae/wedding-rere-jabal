/* Cover, nama tamu, navigasi samping, musik, dan hitung mundur. */
/* cover, tamu, navigasi */
history.scrollRestoration = "manual";
scrollTo(0, 0);
$("#cvbg").style.backgroundImage = `url(${C.bg.cover})`;
$("#coverDate").textContent = fmt;
$("#sideDate").textContent = fmt.toUpperCase();
const sl = [...document.querySelectorAll(".sl")];
sl.forEach(
  (el) => (el.style.backgroundImage = `url(${C.bg[el.dataset.k]})`),
);
const SK = {
  home: "cover",
  mempelai: "cover",
  acara: "date",
  galeri: "quote",
  cerita: "quote",
  rsvp: "foot",
  hadiah: "foot",
};
const so = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        const k = SK[x.target.id];
        sl.forEach(
          (el) => (el.style.opacity = el.dataset.k === k ? 1 : 0),
        );
      }
    }),
  { rootMargin: "-50% 0px -50% 0px" },
);
Object.keys(SK).forEach((i) => so.observe(document.getElementById(i)));
$("#guest").textContent =
  new URLSearchParams(location.search).get("to") || "Tamu Undangan";
$("#nav").innerHTML = [
  ["home", "Home"],
  ["mempelai", "Mempelai"],
  ["acara", "Acara"],
  ["galeri", "Galeri"],
  ["cerita", "Cerita"],
  ["rsvp", "RSVP"],
  ["hadiah", "Hadiah"],
]
  .map(
    ([i, t]) =>
      `<a href="#${i}" class="inline-block px-3 py-1.5 rounded-full hover:bg-sk-300 hover:text-n9 transition">${t}</a>`,
  )
  .join("");
const a = $("#bgm");
a.src = C.music;
const mus = (on) => {
  $("#mb").innerHTML = on
    ? '<span style="display:inline-block;animation:spin 6s linear infinite">♫</span>'
    : '<span class="opacity-60 line-through">♫</span>';
};
$("#mb").onclick = () =>
  a.paused ? a.play().then(() => mus(1)) : (a.pause(), mus(0));
$("#openBtn").onclick = () => {
  const c = $("#cover");
  document.body.classList.remove("lock");
  c.classList.add("up");
  scrollTo({ top: 0, behavior: "instant" });
  $("#pg").classList.remove("hidden");
  onS();
  $("#mb").classList.remove("hidden");
  a.play()
    .then(() => mus(1))
    .catch(() => mus(0));
  $("#nav").classList.remove("hidden");
  setTimeout(() => c.remove(), 1000);
};

/* countdown */
const tick = () => {
  const s = Math.max(0, ((d0 - Date.now()) / 1000) | 0),
    v = [
      ["Hari", s / 86400],
      ["Jam", (s % 86400) / 3600],
      ["Menit", (s % 3600) / 60],
      ["Detik", s % 60],
    ];
  $("#cd").innerHTML = v
    .map(
      ([l, n]) =>
        `<div class="w-[4.3rem] sm:w-24 lg:w-[4.3rem] py-3 sm:py-5 lg:py-3 rounded-2xl border border-sk-300/30 bg-n9/60 backdrop-blur-sm"><div class="font-serif text-2xl sm:text-4xl lg:text-2xl text-white">${String(n | 0).padStart(2, "0")}</div><div class="text-[9px] sm:text-[10px] tracking-widest text-sk-300">${l.toUpperCase()}</div></div>`,
    )
    .join("");
};
tick();
setInterval(tick, 1000);
