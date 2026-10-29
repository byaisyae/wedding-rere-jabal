/* Menyusun seluruh halaman undangan ke #app. */
$("#app").innerHTML =
  `<header id="home" class="relative min-h-screen grid place-items-center text-center px-5 bg fx" style="${ov("rgba(6,18,42,.55)", "rgba(6,18,42,.9)")}"><div data-p=".25">
<p class="rv tracking-[.45em] text-xs text-sk-300">THE WEDDING OF</p>
<h1 class="rz font-script text-7xl sm:text-9xl lg:text-7xl text-white my-6 drop-shadow-lg" style="--d:.15s">${B.nick} &amp; ${G.nick}</h1>
<p class="rv font-serif tracking-[.3em] text-lg text-sk-200" style="--d:.3s">${d0.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", ".")}</p>
<div id="cd" class="rv mt-10 flex justify-center gap-2 sm:gap-4 lg:gap-2" style="--d:.45s"></div></div></header>` +
  sec(
    "mempelai",
    "Assalamu'alaikum Wr. Wb.",
    "Segala puji bagi Allah SWT yang telah menjadikan hamba-Nya hidup berpasang-pasangan. Dengan memohon ridho, rahmat, dan berkah-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan kami.",
    `<div class="grid md:grid-cols-2 lg:grid-cols-1 gap-14 md:gap-8 lg:gap-14">${prof(B, "rl")}${prof(G, "rr")}</div>`,
    "",
    "bg-n8",
  ) +
  `<section class="relative py-24 px-6 bg fx" style="${bgs(C.bg.quote)}"><div data-p=".12" class="rz max-w-2xl mx-auto text-center"><p class="font-serif italic text-lg sm:text-2xl leading-relaxed text-white">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."</p><p class="mt-5 tracking-widest text-xs text-sk-300">AR-RUM AYAT : 21</p></div></section>` +
  sec(
    "acara",
    "Save The Date",
    `<b class="text-white font-semibold tracking-wide">${fmt.toUpperCase()}</b>`,
    `<div class="grid md:grid-cols-2 lg:grid-cols-1 gap-6">${C.events.map((e, i) => `<div class="${i ? "rr" : "rl"} rounded-3xl border border-sk-300/30 bg-n9/70 backdrop-blur-sm p-8 sm:p-10"><h3 class="font-serif text-3xl text-white">${e.t}</h3><p class="mt-3 text-sk-300 font-medium">${e.time}</p><p class="mt-5 text-white">${e.place}</p><p class="text-sm mt-1 mb-6 leading-relaxed">${e.addr}</p>${btn(e.map, "Buka Maps")}</div>`).join("")}</div>
 <div class="rv mt-6 rounded-3xl border border-sk-300/30 bg-n9/70 backdrop-blur-sm p-8"><h3 class="font-serif text-xl text-white">Live Streaming</h3><p class="text-sm my-3">Bagi tamu yang berhalangan hadir, silakan saksikan acara melalui link berikut:</p>${btn(C.live, "Live Streaming")}</div>`,
    bgs(C.bg.date, "rgba(6,18,42,.88)"),
  ) +
  sec(
    "galeri",
    "Our Gallery",
    "",
    `<div class="columns-2 md:columns-3 gap-x-2 sm:gap-x-3">${C.gallery.map((g, i) => `<div class="rz ph break-inside-avoid mb-2 sm:mb-3 rounded-2xl overflow-hidden cursor-zoom-in" style="${GD[g] ? `aspect-ratio:${GD[g][0]}/${GD[g][1]};${GD[g][0] / GD[g][1] > 1.2 ? "column-span:all;" : ""}` : ""}--d:${(i % 3) * 0.1}s"><img src="${g}" loading="lazy" onerror="this.remove()" class="gl w-full h-full object-cover hover:scale-105 transition duration-700"></div>`).join("")}</div>`,
    "",
    "bg-n8",
  ) +
  sec(
    "cerita",
    "Our Story",
    "",
    `<div class="space-y-12">${C.story.map((s, i) => `<div class="grid md:grid-cols-2 lg:grid-cols-1 gap-6 items-center ${i % 2 ? "md:[&>*:first-child]:order-2 lg:[&>*:first-child]:order-none" : ""}"><div class="rc ph rounded-3xl overflow-hidden aspect-[4/3]"><img src="${s.i}" alt="${s.t}" onerror="this.remove()" class="w-full h-full object-cover"></div><div class="${i % 2 ? "rl" : "rr"} text-left md:px-8 lg:px-0"><p class="text-xs tracking-widest text-sk-300">${s.d}</p><h3 class="font-serif text-2xl text-white mt-1">${s.t}</h3><p class="text-sm mt-2 leading-relaxed">${s.p}</p></div></div>`).join("")}</div>`,
  ) +
  sec(
    "rsvp",
    "RSVP &amp; Ucapan Doa",
    "Konfirmasi kehadiran dan sampaikan doa restu untuk kedua mempelai.",
    `<form id="f" class="rz text-left max-w-md mx-auto space-y-3">
 <input name="web" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">
 <input name="n" required minlength="2" placeholder="Nama" class="w-full px-4 py-3 rounded-xl bg-n9/80 border border-sk-300/30 outline-none focus:border-sk-300">
 <div class="grid grid-cols-2 gap-3"><select name="k" class="px-4 py-3 rounded-xl bg-n9/80 border border-sk-300/30"><option>Hadir</option><option>Tidak hadir</option><option>Masih ragu</option></select>
 <select name="j" class="px-4 py-3 rounded-xl bg-n9/80 border border-sk-300/30 disabled:opacity-40 disabled:cursor-not-allowed"><option>1 orang</option><option>2 orang</option><option>3 orang</option><option>4 orang</option></select></div>
 <textarea name="m" required rows="3" placeholder="Ucapan &amp; doa restu" class="w-full px-4 py-3 rounded-xl bg-n9/80 border border-sk-300/30 outline-none focus:border-sk-300"></textarea>
 <button class="w-full py-3 rounded-xl bg-sk-300 text-n9 font-semibold hover:bg-white transition">Kirim</button></form>
 <div id="cnt" class="mt-10 flex justify-center gap-6 text-sm"></div><div id="wl" class="mt-6 max-w-xl mx-auto space-y-3 text-left"></div><nav id="pgn" aria-label="Halaman ucapan" class="mt-5 flex flex-wrap justify-center items-center gap-1.5 text-sm"></nav>`,
    bgs(C.bg.foot, "rgba(6,18,42,.9)"),
  ) +
  sec(
    "hadiah",
    "Wedding Gift",
    "Tanpa mengurangi rasa hormat, bagi tamu yang ingin mengirimkan hadiah kepada kedua mempelai dapat melalui:",
    `<div class="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-3xl mx-auto">${C.gifts.map((g, i) => `<div class="rl bank-card relative overflow-hidden rounded-[26px] p-5 md:p-6 shadow-[0_20px_45px_rgba(30,41,59,0.18)] border border-white/60 text-left min-h-[210px] flex flex-col justify-between" style="background:linear-gradient(135deg,#f5f7f9 0%,#e6e9ed 45%,#f0f2f5 100%)"><div class="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-gray-300/50 to-transparent rotate-45 rounded-3xl pointer-events-none"></div><div class="absolute right-0 bottom-0 w-28 h-28 pointer-events-none" style="background-image:radial-gradient(rgba(100,116,139,.35) 1px,transparent 1px);background-size:7px 7px;-webkit-mask-image:linear-gradient(to top left,black 20%,transparent 70%);mask-image:linear-gradient(to top left,black 20%,transparent 70%)"></div><div class="relative z-10 flex items-start justify-between"><svg width="46" height="36" viewBox="0 0 48 38" fill="none" aria-hidden="true"><defs><linearGradient id="chip${i}" x1="0" y1="0" x2="48" y2="38" gradientUnits="userSpaceOnUse"><stop stop-color="#f7e8b0"/><stop offset=".5" stop-color="#d4af5a"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs><rect x="1" y="1" width="46" height="36" rx="8" fill="url(#chip${i})" stroke="#a97a1f"/><line x1="16" y1="1" x2="16" y2="37" stroke="#a97a1f"/><line x1="32" y1="1" x2="32" y2="37" stroke="#a97a1f"/><line x1="1" y1="12" x2="47" y2="12" stroke="#a97a1f"/><line x1="1" y1="25" x2="47" y2="25" stroke="#a97a1f"/><path d="M16 12Q24 19 32 12" stroke="#a97a1f" fill="none"/><path d="M16 25Q24 18 32 25" stroke="#a97a1f" fill="none"/></svg><img src="img/bca.svg" alt="${g.bank}" class="w-20 h-20 object-contain"></div><div class="relative z-10 flex items-end justify-between gap-3 mt-8"><div class="min-w-0"><p class="font-bold text-gray-800 text-sm md:text-base mb-1 truncate">${g.name.toUpperCase()}</p><p class="font-extrabold text-gray-900 text-lg md:text-2xl tracking-wide font-mono">${g.no}</p></div><button data-copy="${g.no}" class="cp flex-shrink-0 inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs md:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-md" aria-label="Salin nomor ${g.bank} ${g.name}"><svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"/></svg>Copy</button></div></div>`).join("")}
 <div class="rr rounded-3xl p-7 border border-sk-300/30 bg-n9/60"><p class="font-serif text-xl text-white">Alamat Pengiriman Hadiah</p><p class="text-sm my-3 leading-relaxed"><b class="text-white">${C.giftAddress.name}</b><br>${C.giftAddress.addr}</p><button data-copy="${C.giftAddress.name}, ${C.giftAddress.addr}" class="cp px-5 py-2 rounded-full bg-sk-300 text-n9 text-sm font-medium">Salin</button></div></div>`,
    "",
    "bg-n8",
  ) +
  `<footer class="relative py-28 px-6 text-center bg fx" style="${bgs(C.bg.foot, "rgba(6,18,42,.78)")}"><div class="rz max-w-xl mx-auto"><p class="text-sm">Kami yang berbahagia,</p><h2 class="font-script text-6xl sm:text-7xl lg:text-6xl text-white my-4">${B.nick} &amp; ${G.nick}</h2><p class="text-sm leading-relaxed">Merupakan sebuah kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Terima kasih.</p></div><p class="relative mt-16 text-xs tracking-wide text-white/60">Copyright &copy; 2026 Aisyae Digital Invitation</p></footer><div class="h-20"></div>`;
