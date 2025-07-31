-- Development seed data
-- Contains sample data for testing and development

-- Insert sample users (password: student123 for all students)
INSERT INTO "users" ("id", "email", "password", "role", "createdAt", "updatedAt") VALUES
('user_252610001', '252610001@temp.itxpro.sch.id', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610002', '252610002@temp.itxpro.sch.id', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610003', '252610003@temp.itxpro.sch.id', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

-- Insert sample siswa data
INSERT INTO "siswa" ("nis", "nama", "email", "kelasSaatIni", "angkatan", "jurusan", "status", "tahunLulusTarget", "createdAt", "updatedAt") VALUES
('252610001', 'Ahmad Rizki Pratama', '252610001@temp.itxpro.sch.id', 'XII RPL 1', 2025, 'RPL', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610002', 'Siti Nurhaliza', '252610002@temp.itxpro.sch.id', 'XII DKV 1', 2025, 'DKV', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610003', 'Budi Santoso', '252610003@temp.itxpro.sch.id', 'XII TKJ 1', 2025, 'TKJ', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("nis") DO NOTHING;

-- Insert sample konseling data
INSERT INTO "hasil_konseling" ("id", "nisSiswa", "tanggalKonseling", "hasilText", "rating", "kategori", "adminId", "createdAt", "updatedAt") VALUES
('konseling_001', '252610001', '2024-01-15 10:00:00', 'Siswa menunjukkan minat yang besar terhadap bidang teknologi informasi.', 5, 'karir', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('konseling_002', '252610002', '2024-01-20 09:15:00', 'Siswa memiliki bakat seni yang menonjol.', 5, 'karir', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Insert sample tujuan karir
INSERT INTO "tujuan_karir" ("id", "nisSiswa", "kategoriUtama", "ptn1", "jurusan1", "createdAt", "updatedAt") VALUES
('tujuan_001', '252610001', 'kuliah', 'Universitas Indonesia', 'Teknik Informatika', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("nisSiswa") DO NOTHING;

-- Update siswa yang sudah mengisi tujuan karir
UPDATE "siswa" SET "tujuanKarirSubmitted" = true WHERE "nis" IN ('252610001');
