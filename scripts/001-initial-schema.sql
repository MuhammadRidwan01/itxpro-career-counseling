-- Create tables based on Prisma schema
-- This script will be executed automatically

-- Create enum types
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT');
CREATE TYPE "Status" AS ENUM ('AKTIF', 'ALUMNI', 'PINDAH', 'TINGGAL_KELAS');

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Create siswa table
CREATE TABLE IF NOT EXISTS "siswa" (
    "nis" VARCHAR(9) NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kelasSaatIni" TEXT,
    "angkatan" INTEGER NOT NULL,
    "jurusan" TEXT,
    "status" "Status" NOT NULL DEFAULT 'AKTIF',
    "tahunLulusTarget" INTEGER,
    "tujuanKarirSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("nis")
);

-- Create hasil_konseling table
CREATE TABLE IF NOT EXISTS "hasil_konseling" (
    "id" TEXT NOT NULL,
    "nisSiswa" VARCHAR(9) NOT NULL,
    "tanggalKonseling" TIMESTAMP(3) NOT NULL,
    "hasilText" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "kategori" TEXT,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hasil_konseling_pkey" PRIMARY KEY ("id")
);

-- Create tujuan_karir table
CREATE TABLE IF NOT EXISTS "tujuan_karir" (
    "id" TEXT NOT NULL,
    "nisSiswa" VARCHAR(9) NOT NULL,
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

    CONSTRAINT "tujuan_karir_pkey" PRIMARY KEY ("id")
);

-- Create unique indexes
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "siswa_email_key" ON "siswa"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "tujuan_karir_nisSiswa_key" ON "tujuan_karir"("nisSiswa");

-- Add foreign key constraints
ALTER TABLE "siswa" ADD CONSTRAINT "siswa_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "hasil_konseling" ADD CONSTRAINT "hasil_konseling_nisSiswa_fkey" FOREIGN KEY ("nisSiswa") REFERENCES "siswa"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "tujuan_karir" ADD CONSTRAINT "tujuan_karir_nisSiswa_fkey" FOREIGN KEY ("nisSiswa") REFERENCES "siswa"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
