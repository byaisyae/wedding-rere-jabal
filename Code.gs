/**
 * RSVP, Ucapan Doa & Balasan → Google Sheet
 * Undangan Rere & Jabal
 *
 * CARA PASANG (sekali saja):
 * 1. Buat Google Sheet baru (nama bebas, mis. "RSVP Rere & Jabal").
 * 2. Menu Extensions (Ekstensi) → Apps Script. Hapus isi default, tempel seluruh kode ini, lalu Save.
 * 3. Klik Deploy → New deployment → ikon roda gigi → pilih "Web app".
 *      - Execute as (Jalankan sebagai) : Me (akun Anda)
 *      - Who has access (Akses)        : Anyone (Siapa saja)
 *    Klik Deploy, setujui izin yang diminta, lalu salin "Web app URL" (berakhiran /exec).
 * 4. Tempel URL itu ke index.html pada: rsvp:"https://script.google.com/macros/s/.../exec"
 *
 * CATATAN: setiap kali Anda mengubah kode ini, buat versi baru lewat
 * Deploy → Manage deployments → Edit (pensil) → Version: New version → Deploy.
 * URL-nya tetap sama.
 *
 * ISI SHEET:
 *  - Tab "RSVP"    : Waktu | Nama | Kehadiran | Jumlah Tamu | Ucapan & Doa | ID
 *  - Tab "Balasan" : Waktu | ID Ucapan | Nama | Balasan
 *    (kolom ID jangan dihapus/diubah — itulah yang menghubungkan balasan dengan ucapannya)
 */

const SHEET_NAME = "RSVP"; // tab ucapan; dibuat otomatis bila belum ada
const REPLY_SHEET = "Balasan"; // tab balasan; dibuat otomatis bila belum ada
const HEADERS = ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa", "ID"];
const REPLY_HEADERS = ["Waktu", "ID Ucapan", "Nama", "Balasan"];
const KEHADIRAN = ["Hadir", "Tidak hadir", "Masih ragu"];
const JUMLAH = ["1 orang", "2 orang", "3 orang", "4 orang"];
const MAX_TAMPIL = 200; // jumlah ucapan terbaru yang ditampilkan di undangan
const MAX_BALASAN = 1000; // jumlah balasan terbaru yang ditampilkan

/** Menerima kiriman dari undangan: ucapan RSVP baru ATAU balasan (act=reply). */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // cegah baris tertimpa saat banyak tamu mengirim bersamaan
    const p = (e && e.parameter) || {};

    // jebakan spam: kolom "web" tersembunyi, manusia tidak akan mengisinya
    if (p.web) return json_({ ok: true });

    if (p.act === "reply") return simpanBalasan_(p);

    const nama = clean_(p.n, 100);
    const kehadiran = KEHADIRAN.indexOf(p.k) > -1 ? p.k : "";
    // tamu yang tidak hadir tidak mengisi jumlah → disimpan sebagai "-"
    const jumlah =
      kehadiran === "Tidak hadir" ? "-" : JUMLAH.indexOf(p.j) > -1 ? p.j : "";
    const ucapan = clean_(p.m, 500);

    if (nama.length < 2 || !kehadiran || !jumlah || !ucapan) {
      return json_({ ok: false, error: "Data tidak lengkap" });
    }

    // id dibuat di undangan agar balasan bisa langsung menempel; buat sendiri bila tidak valid
    const id = /^[a-z0-9]{6,40}$/i.test(p.id || "") ? p.id : newId_();
    sheet_().appendRow([new Date(), nama, kehadiran, jumlah, ucapan, id]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

function simpanBalasan_(p) {
  const wid = String(p.w || "");
  const nama = clean_(p.n, 100);
  const balasan = clean_(p.m, 300);
  if (!/^[a-z0-9]{1,40}$/i.test(wid) || nama.length < 2 || !balasan) {
    return json_({ ok: false, error: "Data tidak lengkap" });
  }
  // pastikan ucapan yang dibalas memang ada
  const sh = sheet_();
  const last = sh.getLastRow();
  const ada =
    last > 1 &&
    sh.getRange(2, 6, last - 1, 1).createTextFinder(wid).matchEntireCell(true).findNext();
  if (!ada) return json_({ ok: false, error: "Ucapan tidak ditemukan" });

  replySheet_().appendRow([new Date(), wid, nama, balasan]);
  return json_({ ok: true });
}

/** Mengirim daftar ucapan + balasan agar tampil di undangan (tanpa data pribadi lain). */
function doGet() {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sh = sheet_();
    const last = sh.getLastRow();
    let wishes = [];
    if (last > 1) {
      const start = Math.max(2, last - MAX_TAMPIL + 1);
      const rows = sh.getRange(start, 1, last - start + 1, 6).getValues(); // Waktu..ID

      // baris lama (sebelum fitur balasan) belum punya ID → beri otomatis
      let perluTulis = false;
      rows.forEach((r) => {
        if (!r[5]) {
          r[5] = newId_();
          perluTulis = true;
        }
      });
      if (perluTulis) {
        sh.getRange(start, 6, rows.length, 1).setValues(rows.map((r) => [r[5]]));
      }

      // diurutkan DESCENDING berdasarkan waktu kirim (terbaru di atas)
      wishes = rows
        .map((r) => ({
          id: r[5],
          n: r[1],
          k: r[2],
          j: r[3],
          m: r[4],
          t: r[0] instanceof Date ? r[0].getTime() : 0,
        }))
        .sort((a, b) => b.t - a.t);
    }

    let replies = [];
    const rs = replySheet_();
    const rl = rs.getLastRow();
    if (rl > 1) {
      const s2 = Math.max(2, rl - MAX_BALASAN + 1);
      replies = rs
        .getRange(s2, 2, rl - s2 + 1, 3)
        .getValues()
        .map((r) => ({ w: r[0], n: r[1], m: r[2] })); // ID Ucapan, Nama, Balasan
    }
    return json_({ ok: true, wishes: wishes, replies: replies });
  } catch (err) {
    return json_({ ok: false, error: String(err), wishes: [], replies: [] });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

/* ---------- helper ---------- */

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sh.setFrozenRows(1);
    sh.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  } else if (sh.getRange(1, 6).getValue() !== "ID") {
    // sheet versi lama (5 kolom) → tambahkan kolom ID
    sh.getRange(1, 6).setValue("ID").setFontWeight("bold");
  }
  return sh;
}

function replySheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(REPLY_SHEET);
  if (!sh) sh = ss.insertSheet(REPLY_SHEET);
  if (sh.getLastRow() === 0) {
    sh.appendRow(REPLY_HEADERS);
    sh.getRange(1, 1, 1, REPLY_HEADERS.length).setFontWeight("bold");
    sh.setFrozenRows(1);
    sh.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  }
  return sh;
}

function newId_() {
  return Utilities.getUuid().replace(/-/g, "").slice(0, 12);
}

// rapikan teks + cegah "formula injection" (isi sel diawali = + - @ dianggap rumus oleh Sheet)
function clean_(v, max) {
  let s = String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
