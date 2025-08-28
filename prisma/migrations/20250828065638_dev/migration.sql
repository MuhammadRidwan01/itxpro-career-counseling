-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'STUDENT');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('AKTIF', 'ALUMNI', 'PINDAH', 'TINGGAL_KELAS');

-- CreateEnum
CREATE TYPE "public"."StatusKonseling" AS ENUM ('SUDAH', 'BELUM', 'PROSES');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."siswa" (
    "nis" VARCHAR(9) NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT,
    "kelasSaatIni" TEXT,
    "angkatan" INTEGER NOT NULL,
    "jurusan" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'AKTIF',
    "tahunLulusTarget" INTEGER,
    "tujuanKarirSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("nis")
);

-- CreateTable
CREATE TABLE "public"."hasil_konseling" (
    "id" TEXT NOT NULL,
    "nisSiswa" VARCHAR(9) NOT NULL,
    "tanggalKonseling" TIMESTAMP(3) NOT NULL,
    "hasilText" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tindakLanjut" TEXT,
    "status" "public"."StatusKonseling" NOT NULL DEFAULT 'PROSES',
    "kategori" TEXT,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hasil_konseling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tujuan_karir" (
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "siswa_email_key" ON "public"."siswa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tujuan_karir_nisSiswa_key" ON "public"."tujuan_karir"("nisSiswa");

-- AddForeignKey
ALTER TABLE "public"."siswa" ADD CONSTRAINT "siswa_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hasil_konseling" ADD CONSTRAINT "hasil_konseling_nisSiswa_fkey" FOREIGN KEY ("nisSiswa") REFERENCES "public"."siswa"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tujuan_karir" ADD CONSTRAINT "tujuan_karir_nisSiswa_fkey" FOREIGN KEY ("nisSiswa") REFERENCES "public"."siswa"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
