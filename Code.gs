/**
 * RSVP & Ucapan Doa → Google Sheet
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
 */

const SHEET_NAME = "RSVP"; // nama tab; dibuat otomatis bila belum ada
const HEADERS = ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"];
const KEHADIRAN = ["Hadir", "Tidak hadir", "Masih ragu"];
const JUMLAH = ["1 orang", "2 orang", "3 orang", "4 orang"];
const MAX_TAMPIL = 200; // jumlah ucapan terbaru yang ditampilkan di undangan

/** Menerima kiriman form RSVP dari undangan. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // cegah baris tertimpa saat banyak tamu mengirim bersamaan
    const p = (e && e.parameter) || {};

    // jebakan spam: kolom "web" tersembunyi, manusia tidak akan mengisinya
    if (p.web) return json_({ ok: true });

    const nama = clean_(p.n, 100);
    const kehadiran = KEHADIRAN.indexOf(p.k) > -1 ? p.k : "";
    const jumlah = JUMLAH.indexOf(p.j) > -1 ? p.j : "";
    const ucapan = clean_(p.m, 500);

    if (nama.length < 2 || !kehadiran || !jumlah || !ucapan) {
      return json_({ ok: false, error: "Data tidak lengkap" });
    }

    sheet_().appendRow([new Date(), nama, kehadiran, jumlah, ucapan]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

/** Mengirim daftar ucapan agar tampil di undangan (tanpa data waktu/pribadi lain). */
function doGet() {
  try {
    const sh = sheet_();
    const last = sh.getLastRow();
    let wishes = [];
    if (last > 1) {
      const start = Math.max(2, last - MAX_TAMPIL + 1);
      wishes = sh
        .getRange(start, 2, last - start + 1, 4)
        .getValues()
        .map((r) => ({ n: r[0], k: r[1], j: r[2], m: r[3] })); // urut lama → baru
    }
    return json_({ ok: true, wishes: wishes });
  } catch (err) {
    return json_({ ok: false, error: String(err), wishes: [] });
  }
}

/* ---------- helper ---------- */

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sh.setFrozenRows(1);
    sh.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  }
  return sh;
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
