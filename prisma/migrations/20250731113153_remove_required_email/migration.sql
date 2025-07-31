/*
  Warnings:

  - You are about to drop the column `rekomendasi` on the `hasil_konseling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."siswa" DROP CONSTRAINT "siswa_email_fkey";

-- AlterTable
ALTER TABLE "public"."hasil_konseling" DROP COLUMN "rekomendasi";

-- AlterTable
ALTER TABLE "public"."siswa" ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."siswa" ADD CONSTRAINT "siswa_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
