import { pathToFileURL } from "node:url";
import { pool } from "../src/db/pool.js";

export async function verifikasiPenyedia(
  db,
  email,
  opsi = {},
) {
  const { tolak = false } = opsi;

  const statusVerifikasi = tolak
    ? "ditolak"
    : "terverifikasi";

  const hasil = await db.query(
    `UPDATE penyedia AS py
     SET status_verifikasi = $1
     FROM pengguna AS u
     WHERE py.pengguna_id = u.id
       AND u.email = $2
       AND u.peran = 'penyedia'
     RETURNING py.id, py.status_verifikasi`,
    [statusVerifikasi, email],
  );

  if (hasil.rowCount !== 1) {
    throw new Error(
      "Penyedia tidak ditemukan atau email bukan akun penyedia.",
    );
  }

  return hasil.rows[0];
}

async function main() {
  const args = process.argv.slice(2);
  const email = args.find((arg) => !arg.startsWith("--"));
  const tolak = args.includes("--tolak");

  if (!email) {
    throw new Error(
      "Penggunaan: node scripts/verifikasi-penyedia.js email@example.test [--tolak]",
    );
  }

  const hasil = await verifikasiPenyedia(
    pool,
    email,
    { tolak },
  );

  console.log(
    `Penyedia ${email}: ${hasil.status_verifikasi}`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    })
    .finally(async () => {
      await pool.end();
    });
}