-- Script untuk reset database jika diperlukan
-- HATI-HATI: Script ini akan menghapus semua data!

-- Drop foreign key constraints first
ALTER TABLE IF EXISTS "siswa" DROP CONSTRAINT IF EXISTS "siswa_email_fkey";
ALTER TABLE IF EXISTS "hasil_konseling" DROP CONSTRAINT IF EXISTS "hasil_konseling_nisSiswa_fkey";
ALTER TABLE IF EXISTS "tujuan_karir" DROP CONSTRAINT IF EXISTS "tujuan_karir_nisSiswa_fkey";

-- Drop tables
DROP TABLE IF EXISTS "tujuan_karir";
DROP TABLE IF EXISTS "hasil_konseling";
DROP TABLE IF EXISTS "siswa";
DROP TABLE IF EXISTS "users";

-- Drop enums
DROP TYPE IF EXISTS "Status";
DROP TYPE IF EXISTS "Role";
