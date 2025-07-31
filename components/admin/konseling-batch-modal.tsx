"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Star, Plus, Trash2, Search } from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import { GlassCard } from "@/components/ui/glass-card"

interface Student {
  nis: string
  nama: string
  kelasSaatIni: string
  angkatan: number
}

interface KonselingBatchModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function KonselingBatchModal({ isOpen, onClose, onSuccess }: KonselingBatchModalProps) {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [availableStudents, setAvailableStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    tanggalKonseling: "",
    kategori: "akademik",
    hasilText: "",
    rekomendasi: "",
    rating: 5,
  })

  useEffect(() => {
    if (isOpen) {
      fetchStudents()
    }
  }, [isOpen])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/admin/siswa")
      const data = await response.json()
      if (data.success) {
        setAvailableStudents(data.data.siswa)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm) ||
      student.kelasSaatIni?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStudentSelect = (student: Student) => {
    if (!selectedStudents.find((s) => s.nis === student.nis)) {
      setSelectedStudents([...selectedStudents, student])
    }
  }

  const handleStudentRemove = (nis: string) => {
    setSelectedStudents(selectedStudents.filter((s) => s.nis !== nis))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStudents.length === 0) {
      alert("Pilih minimal satu siswa")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/konseling/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          students: selectedStudents.map((s) => s.nis),
          ...formData,
        }),
      })

      const data = await response.json()
      if (data.success) {
        onSuccess()
        onClose()
        resetForm()
      } else {
        alert(data.message || "Gagal menambahkan konseling")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedStudents([])
    setSearchTerm("")
    setFormData({
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
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-nude-800">Konseling Batch</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-nude-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Student Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-nude-800">Pilih Siswa</h3>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                    <input
                      type="text"
                      placeholder="Cari siswa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-nude-800"
                    />
                  </div>

                  {/* Available Students */}
                  <div className="bg-white/30 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <h4 className="text-sm font-medium text-nude-700 mb-2">Siswa Tersedia</h4>
                    <div className="space-y-2">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.nis}
                          onClick={() => handleStudentSelect(student)}
                          className="flex items-center justify-between p-2 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-nude-800">{student.nama}</p>
                            <p className="text-sm text-nude-600">
                              {student.nis} - {student.kelasSaatIni}
                            </p>
                          </div>
                          <Plus className="w-4 h-4 text-nude-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Students */}
                  <div className="bg-white/30 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <h4 className="text-sm font-medium text-nude-700 mb-2">
                      Siswa Dipilih ({selectedStudents.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedStudents.map((student) => (
                        <div key={student.nis} className="flex items-center justify-between p-2 bg-gold-100 rounded-lg">
                          <div>
                            <p className="font-medium text-nude-800">{student.nama}</p>
                            <p className="text-sm text-nude-600">
                              {student.nis} - {student.kelasSaatIni}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleStudentRemove(student.nis)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Konseling Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-nude-800">Detail Konseling</h3>

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
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/20">
                <PremiumButton type="button" variant="secondary" onClick={onClose} disabled={loading}>
                  Batal
                </PremiumButton>
                <PremiumButton type="submit" disabled={loading || selectedStudents.length === 0}>
                  {loading ? "Menyimpan..." : `Simpan Konseling (${selectedStudents.length} siswa)`}
                </PremiumButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
