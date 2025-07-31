"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Star, User } from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import { GlassCard } from "@/components/ui/glass-card"

interface Student {
  nis: string
  nama: string
  kelasSaatIni: string
}

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  rekomendasi: string
  rating: number
  kategori: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface KonselingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  konseling?: Konseling | null
}

export function KonselingModal({ isOpen, onClose, onSuccess, konseling }: KonselingModalProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nisSiswa: "",
    tanggalKonseling: "",
    kategori: "akademik",
    hasilText: "",
    rekomendasi: "",
    rating: 5,
  })

  useEffect(() => {
    if (isOpen) {
      fetchStudents()
      if (konseling) {
        setFormData({
          nisSiswa: konseling.nisSiswa,
          tanggalKonseling: konseling.tanggalKonseling.split("T")[0],
          kategori: konseling.kategori,
          hasilText: konseling.hasilText,
          rekomendasi: konseling.rekomendasi || "",
          rating: konseling.rating,
        })
      } else {
        resetForm()
      }
    }
  }, [isOpen, konseling])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/admin/siswa")
      const data = await response.json()
      if (data.success) {
        setStudents(data.data.siswa)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = konseling ? `/api/admin/konseling/${konseling.id}` : "/api/admin/konseling"
      const method = konseling ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        onSuccess()
        onClose()
        resetForm()
      } else {
        alert(data.message || "Gagal menyimpan konseling")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nisSiswa: "",
      tanggalKonseling: "",
      kategori: "akademik",
      hasilText: "",
      rekomendasi: "",
      rating: 5,
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-nude-800">{konseling ? "Edit Konseling" : "Tambah Konseling"}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-nude-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Siswa Selection */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Siswa</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                  <select
                    value={formData.nisSiswa}
                    onChange={(e) => setFormData({ ...formData, nisSiswa: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800"
                    required
                    disabled={!!konseling}
                  >
                    <option value="">Pilih Siswa</option>
                    {students.map((student) => (
                      <option key={student.nis} value={student.nis}>
                        {student.nama} - {student.nis} ({student.kelasSaatIni})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Tanggal Konseling</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                  <input
                    type="date"
                    value={formData.tanggalKonseling}
                    onChange={(e) => setFormData({ ...formData, tanggalKonseling: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800"
                    required
                  />
                </div>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Kategori</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800"
                >
                  <option value="akademik">Akademik</option>
                  <option value="karir">Karir</option>
                  <option value="pribadi">Pribadi</option>
                  <option value="sosial">Sosial</option>
                  <option value="belajar">Belajar</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Rating (1-5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? "text-gold-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Hasil Konseling */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Hasil Konseling</label>
                <textarea
                  value={formData.hasilText}
                  onChange={(e) => setFormData({ ...formData, hasilText: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800 resize-none"
                  placeholder="Masukkan hasil konseling..."
                  required
                />
              </div>

              {/* Rekomendasi */}
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Rekomendasi</label>
                <textarea
                  value={formData.rekomendasi}
                  onChange={(e) => setFormData({ ...formData, rekomendasi: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800 resize-none"
                  placeholder="Masukkan rekomendasi..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/20">
                <PremiumButton type="button" variant="secondary" onClick={onClose} disabled={loading}>
                  Batal
                </PremiumButton>
                <PremiumButton type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : konseling ? "Update Konseling" : "Simpan Konseling"}
                </PremiumButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
