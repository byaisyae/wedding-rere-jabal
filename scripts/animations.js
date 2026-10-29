/* Animasi scroll interaktif. */
/* animasi scroll interaktif */
document.querySelectorAll("h2.rv").forEach((h) => {
  h.innerHTML = h.textContent
    .trim()
    .split(/\s+/)
    .map(
      (w, i) =>
        `<span class="inline-block overflow-hidden align-bottom px-3 -mx-3 py-3 -my-3"><span class="wd" style="--i:${i}">${esc(w)}</span></span>`,
    )
    .join(" ");
});
const AN = ".rv,.rl,.rr,.rz,.rc",
  grp = new Map();
document.querySelectorAll(AN).forEach((el) => {
  const p = el.parentElement,
    i = grp.get(p) || 0;
  grp.set(p, i + 1);
  if (!el.style.getPropertyValue("--d"))
    el.style.setProperty("--d", Math.min(i, 5) * 0.12 + "s");
});
const io = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(AN).forEach((el) => io.observe(el));
const pe = [...document.querySelectorAll("[data-p]")],
  fx = [...document.querySelectorAll(".fx")],
  hc = $("#home>div"),
  pg = $("#pg");
let tk = 0;
const onS = () => {
  tk = 0;
  const h = innerHeight,
    y = scrollY,
    m = document.documentElement.scrollHeight - h;
  pg.style.transform = `scaleX(${m > 0 ? y / m : 0})`;
  hc.style.opacity = Math.max(0, 1 - y / (h * 0.75));
  fx.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > h) return;
    el.style.backgroundPositionY =
      (
        Math.min(1, Math.max(0, (h - r.top) / (h + r.height))) * 100
      ).toFixed(1) + "%";
  });
  pe.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > h + 200) return;
    el.style.translate = `0 ${((r.top + r.height / 2 - h / 2) * -el.dataset.p).toFixed(1)}px`;
  });
};
addEventListener(
  "scroll",
  () => {
    if (!tk) tk = requestAnimationFrame(onS);
  },
  { passive: true },
);
onS();
