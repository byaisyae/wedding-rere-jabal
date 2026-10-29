# Undangan Pernikahan Rere & Jabal

## Struktur
- `index.html` — kerangka halaman (cover, musik, lightbox) dan pemanggilan file CSS/JS
- `css/style.css` — gaya kustom (animasi scroll, cover, bingkai desktop, dll)
- `scripts/tailwind.config.js` — tema Tailwind (warna & font)
- `scripts/config.js` — **data undangan**: nama, tanggal, acara, rekening, galeri, cerita (file yang paling sering diedit)
- `scripts/helpers.js` — variabel & fungsi bantu
- `scripts/render.js` — menyusun seluruh halaman ke `#app`
- `scripts/ui.js` — cover, nama tamu, navigasi, musik, hitung mundur
- `scripts/rsvp.js` — RSVP, ucapan & balasan
- `scripts/gallery.js` — tombol salin & lightbox galeri
- `scripts/animations.js` — animasi scroll
- `img/`, `sound/` — foto dan musik
- `Code.gs` — Google Apps Script untuk RSVP (tidak dimuat di browser)

## Urutan pemanggilan script (jangan ditukar)
`tailwind.config.js` (setelah CDN Tailwind) → `config` → `helpers` → `render` → `ui` → `rsvp` → `gallery` → `animations`
