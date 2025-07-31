"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, User, Calendar, Star, FileText, Target, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface Student {
  nis: string
  nama: string
  kelasSaatIni: string
  jurusan: string
  angkatan: number
  status: string
}

export function KonselingModal({ isOpen, onClose, onSuccess, konseling }: KonselingModalProps) {
  const [formData, setFormData] = useState({
    nisSiswa: "",
    tanggalKonseling: "",
    hasilText: "",
    rekomendasi: "",
    rating: 5,
    kategori: "akademik",
  })
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterJurusan, setFilterJurusan] = useState("all")
  const [filterAngkatan, setFilterAngkatan] = useState("all")

  const isEdit = !!konseling

  useEffect(() => {
    if (isOpen) {
      fetchStudents()
      setSearchTerm("")
      setFilterJurusan("all")
      setFilterAngkatan("all")
    }
  }, [isOpen])

  useEffect(() => {
    if (konseling) {
      setFormData({
        nisSiswa: konseling.nisSiswa,
        tanggalKonseling: konseling.tanggalKonseling.split("T")[0],
        hasilText: konseling.hasilText,
        rekomendasi: konseling.rekomendasi || "",
        rating: konseling.rating,
        kategori: konseling.kategori,
      })
    } else {
      setFormData({
        nisSiswa: "",
        tanggalKonseling: new Date().toISOString().split("T")[0],
        hasilText: "",
        rekomendasi: "",
        rating: 5,
        kategori: "akademik",
      })
    }
    setError("")
  }, [konseling, isOpen])

  const fetchStudents = async () => {
    setLoadingStudents(true)
    try {
      const response = await fetch("/api/admin/siswa")
      const data = await response.json()
      if (data.success) {
        setStudents(data.data.siswa)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoadingStudents(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = isEdit ? `/api/admin/konseling/${konseling.id}` : "/api/admin/konseling"
      const method = isEdit ? "PUT" : "POST"

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
      } else {
        setError(data.message || `Gagal ${isEdit ? "mengupdate" : "menambahkan"} konseling`)
      }
    } catch (error) {
      setError(`Terjadi kesalahan saat ${isEdit ? "mengupdate" : "menambahkan"} konseling`)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      nisSiswa: "",
      tanggalKonseling: new Date().toISOString().split("T")[0],
      hasilText: "",
      rekomendasi: "",
      rating: 5,
      kategori: "akademik",
    })
    setError("")
    onClose()
  }

  const selectedStudent = students.find((s) => s.nis === formData.nisSiswa)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95%] overflow-y-auto bg-white/95 backdrop-blur-lg sm:w-full">
        <DialogHeader className="space-y-3 pb-6 border-b">
          <DialogTitle className="flex items-center gap-2 text-2xl text-gold-600">
            <MessageSquare className="w-6 h-6 text-gold-600" />
            {isEdit ? "Edit Hasil Konseling" : "Tambah Hasil Konseling"}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            {isEdit ? "Ubah informasi konseling yang sudah ada" : "Isi form berikut untuk menambahkan hasil konseling baru"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Student Selection Section */}
          <div className="bg-nude-50/50 p-6 rounded-lg border border-nude-100 space-y-6">
            <div className="flex items-center justify-between border-b border-nude-100 pb-4">
              <h3 className="font-semibold text-lg text-nude-800 flex items-center gap-2">
                <User className="w-5 h-5 text-gold-600" />
                Informasi Siswa
              </h3>
              {!isEdit && (
                <div className="text-xs bg-nude-100 text-nude-600 px-3 py-1.5 rounded-full border border-nude-200">
                  {students.length} siswa tersedia
                </div>
              )}
            </div>

            {!isEdit ? (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                  <Input
                    placeholder="Cari berdasarkan nama, NIS, atau kelas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-nude-200 focus:border-gold-500 focus:ring-gold-500 text-black"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                    <SelectTrigger className="bg-white border-nude-200 text-nude-700">
                      <SelectValue placeholder="Semua Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-nude-600">Semua Jurusan</SelectItem>
                      {[...new Set(students.map(s => s.jurusan))]
                        .filter(jurusan => jurusan && jurusan.trim() !== '')
                        .map((jurusan) => (
                          <SelectItem key={jurusan} value={jurusan}>
                            {jurusan}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterAngkatan} onValueChange={setFilterAngkatan}>
                    <SelectTrigger className="bg-white border-nude-200 text-nude-700">
                      <SelectValue placeholder="Semua Angkatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-nude-600">Semua Angkatan</SelectItem>
                      {[...new Set(students.map(s => s.angkatan))]
                        .sort((a, b) => b - a)
                        .map((angkatan) => (
                          <SelectItem key={angkatan} value={angkatan.toString()}>
                            Angkatan {angkatan}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white rounded-lg border border-nude-200 overflow-hidden">
                  <div className="max-h-[200px] overflow-y-auto p-2 space-y-1">
                    {loadingStudents ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-600 mx-auto mb-2"></div>
                        <p className="text-sm text-nude-600">Memuat data siswa...</p>
                      </div>
                    ) : (
                      students
                        .filter((student) => {
                          const matchesSearch = 
                            student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.nis.includes(searchTerm) ||
                            student.kelasSaatIni.toLowerCase().includes(searchTerm.toLowerCase());
                          
                          const matchesJurusan = filterJurusan === "all" || student.jurusan === filterJurusan;
                          const matchesAngkatan = filterAngkatan === "all" || student.angkatan.toString() === filterAngkatan;
                          
                          return matchesSearch && matchesJurusan && matchesAngkatan;
                        })
                        .map((student) => (
                          <button
                            key={student.nis}
                            onClick={() => setFormData({ ...formData, nisSiswa: student.nis })}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              formData.nisSiswa === student.nis
                                ? 'bg-gold-50 text-gold-900 border border-gold-200'
                                : 'hover:bg-nude-50 text-nude-700'
                            }`}
                          >
                            <div className="font-medium text-nude-500">{student.nama}</div>
                            <div className="text-sm text-nude-500">
                              {student.nis} • {student.kelasSaatIni} • {student.jurusan}
                            </div>
                          </button>
                        ))
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {selectedStudent && (
              <div className="flex items-center gap-4 bg-gold-50 p-4 rounded-lg border border-gold-200">
                <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gold-600">{selectedStudent.nama}</h4>
                  <p className="text-sm text-gold-400">
                    NIS: {selectedStudent.nis} • Kelas: {selectedStudent.kelasSaatIni}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Konseling Details Section */}
          <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 space-y-6">
            <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-600" />
              Detail Konseling
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="tanggalKonseling" className="text-gray-700">
                  Tanggal Konseling
                </Label>
                <Input
                  id="tanggalKonseling"
                  type="date"
                  value={formData.tanggalKonseling}
                  onChange={(e) => setFormData({ ...formData, tanggalKonseling: e.target.value })}
                  required
                  className="bg-white border-gray-200 text-nude-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-gray-700">
                  Rating Konseling
                </Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                >
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Pilih rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">⭐ Sangat Kurang</SelectItem>
                    <SelectItem value="2">⭐⭐ Kurang</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Cukup</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Baik</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Sangat Baik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kategori" className="text-gray-700">
                  Kategori Konseling
                </Label>
                <Select
                  value={formData.kategori}
                  onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                >
                  <SelectTrigger className="bg-white border-gray-200 text-nude-500">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="akademik">📚 Akademik</SelectItem>
                    <SelectItem value="karir">💼 Karir</SelectItem>
                    <SelectItem value="pribadi">👤 Pribadi</SelectItem>
                    <SelectItem value="sosial">👥 Sosial</SelectItem>
                    <SelectItem value="belajar">📖 Belajar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 space-y-6">
            <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold-600" />
              Hasil dan Rekomendasi
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hasilText" className="text-gray-700">
                  Hasil Konseling
                </Label>
                <Textarea
                  id="hasilText"
                  value={formData.hasilText}
                  onChange={(e) => setFormData({ ...formData, hasilText: e.target.value })}
                  placeholder="Tuliskan hasil konseling secara detail..."
                  className="bg-white border-gray-200 min-h-[120px] text-nude-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rekomendasi" className="text-gray-700">
                  Rekomendasi
                </Label>
                <Textarea
                  id="rekomendasi"
                  value={formData.rekomendasi}
                  onChange={(e) => setFormData({ ...formData, rekomendasi: e.target.value })}
                  placeholder="Tuliskan rekomendasi untuk siswa..."
                  className="bg-white border-gray-200 min-h-[100px] text-nude-700"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.nisSiswa} 
              className="bg-gold-600 hover:bg-gold-700 text-white px-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </div>
              ) : isEdit ? (
                "Update Konseling"
              ) : (
                "Tambah Konseling"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
