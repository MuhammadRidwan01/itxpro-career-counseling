-- Initial schema setup
-- This file contains the basic schema structure without any data

-- Clear existing data if exists (only for development)
DROP TABLE IF EXISTS "tujuan_karir" CASCADE;
DROP TABLE IF EXISTS "hasil_konseling" CASCADE;
DROP TABLE IF EXISTS "siswa" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "Status" CASCADE;

-- Create ENUMs
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT');
CREATE TYPE "Status" AS ENUM ('AKTIF', 'ALUMNI', 'PINDAH', 'TINGGAL_KELAS');

-- Create tables
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "siswa" (
    "nis" VARCHAR(9) PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "kelasSaatIni" TEXT,
    "angkatan" INTEGER NOT NULL,
    "jurusan" TEXT,
    "status" "Status" NOT NULL DEFAULT 'AKTIF',
    "tahunLulusTarget" INTEGER,
    "tujuanKarirSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("email") REFERENCES "users"("email")
);

CREATE TABLE IF NOT EXISTS "hasil_konseling" (
    "id" TEXT PRIMARY KEY,
    "nisSiswa" VARCHAR(9) NOT NULL,
    "tanggalKonseling" TIMESTAMP(3) NOT NULL,
    "hasilText" TEXT NOT NULL,
    "rekomendasi" TEXT,
    "rating" INTEGER NOT NULL,
    "kategori" TEXT,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("nisSiswa") REFERENCES "siswa"("nis")
);

CREATE TABLE IF NOT EXISTS "tujuan_karir" (
    "id" TEXT PRIMARY KEY,
    "nisSiswa" VARCHAR(9) UNIQUE NOT NULL,
    "kategoriUtama" TEXT NOT NULL,
    "ptn1" TEXT,
    "jurusan1" TEXT,
    "ptn2" TEXT,
    "jurusan2" TEXT,
    "ptn3" TEXT,
    "jurusan3" TEXT,
    "detailBekerja" TEXT,
    "detailWirausaha" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("nisSiswa") REFERENCES "siswa"("nis")
);
