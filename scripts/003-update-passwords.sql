-- Hapus semua data user yang ada dan insert ulang dengan password yang benar
DELETE FROM "hasil_konseling";
DELETE FROM "tujuan_karir";
DELETE FROM "siswa";
DELETE FROM "users";

-- Insert admin user dengan password hash yang benar untuk 'admin123'
INSERT INTO "users" ("id", "email", "password", "role", "createdAt", "updatedAt") 
VALUES (
    'admin_001', 
    'admin@itxpro.sch.id', 
    '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 
    'ADMIN', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- Insert users untuk siswa dengan password hash yang benar untuk 'student123'
INSERT INTO "users" ("id", "email", "password", "role", "createdAt", "updatedAt") VALUES
('user_252610001', '252610001@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610002', '252610002@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610003', '252610003@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610004', '252610004@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_252610005', '252610005@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_242510001', '242510001@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_242510002', '242510002@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_242510003', '242510003@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_232410001', '232410001@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user_232410002', '232410002@temp.itxpro.sch.id', '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', 'STUDENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert data siswa
INSERT INTO "siswa" ("nis", "nama", "email", "kelasSaatIni", "angkatan", "jurusan", "status", "tahunLulusTarget", "createdAt", "updatedAt") VALUES
('252610001', 'Ahmad Rizki Pratama', '252610001@temp.itxpro.sch.id', 'XII RPL 1', 2025, 'RPL', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610002', 'Siti Nurhaliza', '252610002@temp.itxpro.sch.id', 'XII DKV 1', 2025, 'DKV', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610003', 'Budi Santoso', '252610003@temp.itxpro.sch.id', 'XII TKJ 1', 2025, 'TKJ', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610004', 'Dewi Lestari', '252610004@temp.itxpro.sch.id', 'XII RPL 2', 2025, 'RPL', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('252610005', 'Andi Wijaya', '252610005@temp.itxpro.sch.id', 'XII DKV 2', 2025, 'DKV', 'AKTIF', 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('242510001', 'Rina Sari', '242510001@temp.itxpro.sch.id', 'XI RPL 1', 2024, 'RPL', 'AKTIF', 2026, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('242510002', 'Joko Susilo', '242510002@temp.itxpro.sch.id', 'XI TKJ 1', 2024, 'TKJ', 'AKTIF', 2026, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('242510003', 'Maya Indah', '242510003@temp.itxpro.sch.id', 'XI DKV 1', 2024, 'DKV', 'AKTIF', 2026, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('232410001', 'Rudi Hartono', '232410001@temp.itxpro.sch.id', 'Alumni', 2023, 'RPL', 'ALUMNI', 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('232410002', 'Sari Wulandari', '232410002@temp.itxpro.sch.id', 'Alumni', 2023, 'DKV', 'ALUMNI', 2023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample konseling data
INSERT INTO "hasil_konseling" ("id", "nisSiswa", "tanggalKonseling", "hasilText", "rating", "kategori", "adminId", "createdAt", "updatedAt") VALUES
('konseling_001', '252610001', '2024-01-15 10:00:00', 'Siswa menunjukkan minat yang besar terhadap bidang teknologi informasi. Direkomendasikan untuk melanjutkan ke jurusan Teknik Informatika atau Sistem Informasi. Perlu meningkatkan kemampuan matematika dan bahasa Inggris.', 5, 'karir', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('konseling_002', '252610001', '2024-01-08 14:30:00', 'Evaluasi prestasi akademik menunjukkan nilai yang baik di mata pelajaran produktif. Perlu fokus pada mata pelajaran umum untuk persiapan UTBK. Diberikan strategi belajar yang lebih efektif.', 4, 'akademik', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('konseling_003', '252610002', '2024-01-20 09:15:00', 'Siswa memiliki bakat seni yang menonjol. Direkomendasikan untuk melanjutkan ke jurusan Desain Komunikasi Visual atau Desain Grafis. Portfolio sudah cukup baik, perlu ditingkatkan lagi.', 5, 'karir', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('konseling_004', '252610003', '2024-01-12 11:00:00', 'Minat di bidang jaringan komputer sangat tinggi. Direkomendasikan untuk melanjutkan ke jurusan Teknik Komputer Jaringan atau Teknik Informatika. Perlu sertifikasi tambahan di bidang networking.', 4, 'karir', 'admin_001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample tujuan karir
INSERT INTO "tujuan_karir" ("id", "nisSiswa", "kategoriUtama", "ptn1", "jurusan1", "ptn2", "jurusan2", "ptn3", "jurusan3", "createdAt", "updatedAt") VALUES
('tujuan_001', '252610001', 'kuliah', 'Universitas Indonesia', 'Teknik Informatika', 'Institut Teknologi Bandung', 'Sistem Informasi', 'Universitas Gadjah Mada', 'Ilmu Komputer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('tujuan_002', '252610002', 'kuliah', 'Institut Seni Budaya Indonesia', 'Desain Komunikasi Visual', 'Universitas Negeri Jakarta', 'Pendidikan Seni Rupa', 'Institut Teknologi Bandung', 'Seni Rupa dan Desain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update siswa yang sudah mengisi tujuan karir
UPDATE "siswa" SET "tujuanKarirSubmitted" = true WHERE "nis" IN ('252610001', '252610002');

-- Verify the data
SELECT 'Users' as table_name, COUNT(*) as count FROM "users"
UNION ALL
SELECT 'Siswa' as table_name, COUNT(*) as count FROM "siswa"
UNION ALL
SELECT 'Hasil Konseling' as table_name, COUNT(*) as count FROM "hasil_konseling"
UNION ALL
SELECT 'Tujuan Karir' as table_name, COUNT(*) as count FROM "tujuan_karir";
