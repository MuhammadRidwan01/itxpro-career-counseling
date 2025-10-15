-- CreateIndex
CREATE INDEX "hasil_konseling_nisSiswa_idx" ON "public"."hasil_konseling"("nisSiswa");

-- CreateIndex
CREATE INDEX "hasil_konseling_tanggalKonseling_idx" ON "public"."hasil_konseling"("tanggalKonseling");

-- CreateIndex
CREATE INDEX "hasil_konseling_status_idx" ON "public"."hasil_konseling"("status");

-- CreateIndex
CREATE INDEX "hasil_konseling_kategori_idx" ON "public"."hasil_konseling"("kategori");

-- CreateIndex
CREATE INDEX "hasil_konseling_createdAt_idx" ON "public"."hasil_konseling"("createdAt");

-- CreateIndex
CREATE INDEX "siswa_status_idx" ON "public"."siswa"("status");

-- CreateIndex
CREATE INDEX "siswa_angkatan_idx" ON "public"."siswa"("angkatan");

-- CreateIndex
CREATE INDEX "siswa_jurusan_idx" ON "public"."siswa"("jurusan");

-- CreateIndex
CREATE INDEX "siswa_createdAt_idx" ON "public"."siswa"("createdAt");

-- CreateIndex
CREATE INDEX "siswa_kelasSaatIni_idx" ON "public"."siswa"("kelasSaatIni");

-- CreateIndex
CREATE INDEX "tujuan_karir_kategoriUtama_idx" ON "public"."tujuan_karir"("kategoriUtama");

-- CreateIndex
CREATE INDEX "tujuan_karir_createdAt_idx" ON "public"."tujuan_karir"("createdAt");
