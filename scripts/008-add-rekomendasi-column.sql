-- Add rekomendasi column to hasil_konseling table
ALTER TABLE hasil_konseling 
ADD COLUMN IF NOT EXISTS rekomendasi TEXT;

-- Update existing records with empty rekomendasi
UPDATE hasil_konseling 
SET rekomendasi = '' 
WHERE rekomendasi IS NULL;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_hasil_konseling_kategori ON hasil_konseling(kategori);
CREATE INDEX IF NOT EXISTS idx_hasil_konseling_rating ON hasil_konseling(rating);
CREATE INDEX IF NOT EXISTS idx_hasil_konseling_tanggal ON hasil_konseling(tanggal_konseling);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'hasil_konseling' 
ORDER BY ordinal_position;
