-- Add rekomendasi column to hasil_konseling table
ALTER TABLE hasil_konseling 
ADD COLUMN rekomendasi TEXT;

-- Update existing records with sample rekomendasi
UPDATE hasil_konseling 
SET rekomendasi = CASE 
    WHEN kategori = 'akademik' THEN 'Tingkatkan fokus belajar dan manajemen waktu'
    WHEN kategori = 'karir' THEN 'Eksplorasi lebih lanjut tentang pilihan karir yang sesuai'
    WHEN kategori = 'pribadi' THEN 'Kembangkan kepercayaan diri dan komunikasi'
    ELSE 'Lanjutkan konseling berkala untuk monitoring progress'
END
WHERE rekomendasi IS NULL;

-- Verify the changes
SELECT id, "nisSiswa", kategori, rekomendasi 
FROM hasil_konseling 
LIMIT 5;
