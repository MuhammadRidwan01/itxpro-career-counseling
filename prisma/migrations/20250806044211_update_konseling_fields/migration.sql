/*
  Warnings:

  - You are about to drop the column `rating` on the `hasil_konseling` table. All the data in the column will be lost.
  - You are about to drop the column `rekomendasi` on the `hasil_konseling` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."StatusKonseling" AS ENUM ('SUDAH', 'BELUM');

-- AlterTable
ALTER TABLE "public"."hasil_konseling" DROP COLUMN "rating",
DROP COLUMN "rekomendasi",
ADD COLUMN     "deskripsi" TEXT,
ADD COLUMN     "status" "public"."StatusKonseling" NOT NULL DEFAULT 'BELUM',
ADD COLUMN     "tindakLanjut" TEXT;
