-- Make email optional in siswa table
ALTER TABLE "siswa" ALTER COLUMN "email" DROP NOT NULL;
