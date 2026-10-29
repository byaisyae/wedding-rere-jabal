/* Data undangan (nama, tanggal, acara, rekening, galeri, cerita) — edit di file ini. */
/* ============ DATA — edit di sini ============ */
// semua gambar dummy diambil dari folder img/ (ganti file di folder tsb dengan foto asli)
const C = {
  bride: {
    full: "Regina Febrianti, S.T.",
    nick: "Rere",
    ig: "reginafebriantii",
    wa: "6285772146874",
    father: "Suhermawan",
    mother: "Tuti Milawati",
    role: "Putri",
    address:
      "KPAD Pindad Utara K2234 Kel. Kebon Jayanti, Kec. Kiaracondong, Kota Bandung",
    photo: "img/rere.jpg",
  },
  groom: {
    full: "Jabal Mufridiharja, S.Pd., S.T.",
    nick: "Jabal",
    ig: "jabalmufrid",
    wa: "6287820237963",
    father: "Syarifudin",
    mother: "Supriyatini",
    role: "Putra",
    address:
      "Jl. Asep Berlian No.37 Kel. Cicadas, Kec. Cibeunying Kidul, Kota Bandung",
    photo: "img/jabal.jpg",
  },
  // TODO: ganti tanggal, lokasi, rekening, cerita & foto dengan data asli
  date: "2026-12-30T08:00:00",
  rsvp: "https://script.google.com/macros/s/AKfycbyodnzRqBJE0Kvy5vc0SHNJUqDKdmHAJ4rZ4lNUVWc5rVaoaFL6mfpOFuO85fHEsiMi/exec", // URL Web App Google Apps Script (berakhiran /exec). Kosong = RSVP hanya disimpan di browser tamu
  bg: {
    cover: "img/4.jpg",
    quote: "img/5.jpg",
    foot: "img/1.jpg",
    date: "img/2.jpg",
  },
  events: [
    {
      t: "Akad Nikah",
      time: "08.00 - 09.00 WIB",
      place: "LPTQ Jabar",
      addr: "Jl. AH. Nasution No. 247 KM 8, RT.03/RW.08, Karang Pamulang, Kec. Mandalajati, Kota Bandung, Jawa Barat 40194",
      map: "https://maps.app.goo.gl/tbRfviGo2Xn6nkbZA?g_st=ac",
    },
    {
      t: "Resepsi",
      time: "10.00 - 14.00 WIB",
      place: "LPTQ Jabar",
      addr: "Jl. AH. Nasution No. 247 KM 8, RT.03/RW.08, Karang Pamulang, Kec. Mandalajati, Kota Bandung, Jawa Barat 40194",
      map: "https://maps.app.goo.gl/tbRfviGo2Xn6nkbZA?g_st=ac",
    },
  ],
  live: "https://www.instagram.com/reginafebriantii", // link live streaming (kosongkan jika tidak ada)
  music: "sound/nadin.mp3", // lagu latar (folder sound/)
  giftAddress: {
    name: "Jabal Mufridiharja",
    addr: "Jl. Asep Berlian No.37, Cicadas, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40121",
  },
  gifts: [
    { bank: "BCA", no: "2802218967", name: "Regina Febrianti" },
    { bank: "BCA", no: "4373541934", name: "Jabal Mufridiharja" },
  ],
  gallery: [
    "img/5.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/2.jpg",
    "img/a1.jpg",
    "img/a2.jpg",
    "img/a3.jpg",
    "img/a10.jpg",
    "img/a4.jpg",
    "img/a5.jpg",
    "img/a6.jpg",
    "img/a7.jpg",
    "img/a8.jpg",
    "img/a9.jpg",
    "img/1.jpg",
    "img/bride.jpg",

    "img/jabal.jpg",
    "img/groom.jpg",

    "img/rere.jpg",
  ],
  story: [
    {
      d: "22 Januari 2024",
      t: "Awal Pertemuan",
      p: "Awal dari sebuah pertemuan yang tidak terduga dan akhirnya membawa kami pada satu tujuan yang sama. Kami percaya bahwa setiap perjalanan ini adalah bagian dari takdir yang telah Allah gariskan.",
      i: "img/1.jpg",
    },
    {
      d: "11 Februari 2024",
      t: "Menjalin Hubungan",
      p: "Perjalanan cinta kami bukanlah tanpa ujian, dihadapkan pada jarak yang memisahkan dan entah sudah berapa kali kami saling memaafkan. Sehingga menuntut kami untuk belajar saling mendewasakan dan terus berkomitmen untuk terus berjalan berdampingan, menyatukan perbedaan menjadi satu tujuan yang pasti.",
      i: "img/2.jpg",
    },
    {
      d: "28 Februari 2026",
      t: "Lamaran",
      p: "Setelah menjalin hubungan selama 2 tahun kami memantapkan langkah untuk menjalin sebuah ikatan suci yang dicintai-Nya. Melalui lamaran ini menjadi satu langkah keputusan sadar untuk mengikatkan janji, memberikan sisa waktu kami hanya untuk satu nama di hari ini dan selamanya.",
      i: "img/5.jpg",
    },
    {
      d: "30 Desember 2026",
      t: "Menikah",
      p: "Percayalah, bukan karena bertemu lalu berjodoh, tapi karena berjodohlah kami dipertemukan. Kami memutuskan untuk mengikrarkan janji suci pernikahan kami yang InsyaAllah di bulan Desember ini. Sebagaimana yang pernah dikatakan oleh Ali bin Abi Thalib: “Apa yang menjadi takdirmu, akan menemukan jalannya untuk menemukanmu”.",
      i: "img/3.jpg",
    },
  ],
};
const GD = {
  "img/og.jpg": [1200, 630],
  "img/3.jpg": [1201, 1800],
  "img/4.jpg": [1201, 1800],
  "img/2.jpg": [1202, 1800],
  "img/a1.jpg": [1202, 1800],
  "img/a2.jpg": [1202, 1800],
  "img/a3.jpg": [1202, 1800],
  "img/1.jpg": [1800, 1202],
  "img/a4.jpg": [1202, 1800],
  "img/a5.jpg": [1202, 1800],
  "img/a6.jpg": [1202, 1800],
  "img/a7.jpg": [1202, 1800],
  "img/a8.jpg": [1201, 1800],
  "img/a9.jpg": [1202, 1800],
  "img/5.jpg": [1800, 1202],
  "img/d1.jpg": [900, 900],
  "img/d2.jpg": [900, 900],
  "img/d3.jpg": [900, 900],
  "img/a10.jpg": [1800, 1202],
  "img/bride.jpg": [900, 1200],
  "img/jabal.jpg": [1202, 1800],
  "img/groom.jpg": [900, 1200],
  "img/rere.jpg": [1202, 1800],
}; // ukuran foto galeri (lebar, tinggi); foto landscape otomatis tampil selebar grid
/* =============================================== */
