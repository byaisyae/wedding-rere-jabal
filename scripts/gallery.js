/* Tombol salin, lightbox galeri. */
/* salin + lightbox (geser / panah / dot) */
const copyTxt = (t, ok) => {
  const fb = () => {
    const a = document.createElement("textarea");
    a.value = t;
    a.style.cssText = "position:fixed;left:-9999px";
    document.body.appendChild(a);
    a.select();
    let g = false;
    try {
      g = document.execCommand("copy");
    } catch (_) {}
    a.remove();
    g ? ok() : prompt("Salin manual:", t);
  };
  navigator.clipboard && window.isSecureContext
    ? navigator.clipboard.writeText(t).then(ok, fb)
    : fb();
};
let li = 0;
const GL = () => [...document.querySelectorAll(".gl")];
const lbShow = (i, d = 0, first) => {
  const a = GL(),
    im = $("#lbi");
  li = (i + a.length) % a.length;
  const set = () => {
    im.src = a[li].src;
    im.style.opacity = 1;
    im.style.transform = "none";
  };
  if (first) set();
  else {
    im.style.opacity = 0;
    im.style.transform = `translateX(${d * 60}px)`;
    setTimeout(set, 200);
  }
  $("#lbd").innerHTML = a
    .map(
      (_, k) =>
        `<button data-i="${k}" aria-label="Foto ${k + 1}" class="ld h-2 rounded-full transition-all ${k == li ? "w-6 bg-white" : "w-2 bg-white/40"}"></button>`,
    )
    .join("");
};
const lbOpen = (i) => {
    $("#lb").classList.replace("hidden", "grid");
    lbShow(i, 0, 1);
  },
  lbClose = () => $("#lb").classList.replace("grid", "hidden");
document.addEventListener("click", (e) => {
  const b = e.target.closest(".cp");
  if (b)
    return copyTxt(b.dataset.copy, () => {
      const o = b.innerHTML;
      b.textContent = "Tersalin ✓";
      setTimeout(() => (b.innerHTML = o), 1800);
    });
  const g = e.target.closest(".gl");
  if (g) return lbOpen(GL().indexOf(g));
  if (e.target.closest("#lbp")) return lbShow(li - 1, -1);
  if (e.target.closest("#lbn")) return lbShow(li + 1, 1);
  const d = e.target.closest(".ld");
  if (d) return lbShow(+d.dataset.i, +d.dataset.i > li ? 1 : -1);
  if (e.target.id === "lb" || e.target.closest("#lbx")) lbClose();
});
let sx = 0;
$("#lb").addEventListener(
  "touchstart",
  (e) => (sx = e.touches[0].clientX),
  { passive: true },
);
$("#lb").addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50)
      lbShow(li + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  },
  { passive: true },
);
addEventListener("keydown", (e) => {
  if ($("#lb").classList.contains("hidden")) return;
  if (e.key === "ArrowRight") lbShow(li + 1, 1);
  if (e.key === "ArrowLeft") lbShow(li - 1, -1);
  if (e.key === "Escape") lbClose();
});
