"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, User, Calendar, Star, FileText, Target } from "lucide-react"
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

  const isEdit = !!konseling

  useEffect(() => {
    if (isOpen) {
      fetchStudents()
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {isEdit ? "Edit Hasil Konseling" : "Tambah Hasil Konseling"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nisSiswa" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Siswa
              </Label>
              <Select
                value={formData.nisSiswa}
                onValueChange={(value) => setFormData({ ...formData, nisSiswa: value })}
                disabled={isEdit || loadingStudents}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingStudents ? "Loading..." : "Pilih siswa"} />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.nis} value={student.nis}>
                      {student.nama} - {student.nis} ({student.kelasSaatIni})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStudent && (
                <p className="text-sm text-gray-500">
                  {selectedStudent.nama} - {selectedStudent.kelasSaatIni}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggalKonseling" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tanggal Konseling
              </Label>
              <Input
                id="tanggalKonseling"
                type="date"
                value={formData.tanggalKonseling}
                onChange={(e) => setFormData({ ...formData, tanggalKonseling: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori Konseling</Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) => setFormData({ ...formData, kategori: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="karir">Karir</SelectItem>
                  <SelectItem value="pribadi">Pribadi</SelectItem>
                  <SelectItem value="sosial">Sosial</SelectItem>
                  <SelectItem value="belajar">Belajar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Rating (1-5)
              </Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Sangat Kurang</SelectItem>
                  <SelectItem value="2">2 - Kurang</SelectItem>
                  <SelectItem value="3">3 - Cukup</SelectItem>
                  <SelectItem value="4">4 - Baik</SelectItem>
                  <SelectItem value="5">5 - Sangat Baik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hasilText" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Hasil Konseling
            </Label>
            <Textarea
              id="hasilText"
              value={formData.hasilText}
              onChange={(e) => setFormData({ ...formData, hasilText: e.target.value })}
              placeholder="Tuliskan hasil konseling secara detail..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rekomendasi" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Rekomendasi
            </Label>
            <Textarea
              id="rekomendasi"
              value={formData.rekomendasi}
              onChange={(e) => setFormData({ ...formData, rekomendasi: e.target.value })}
              placeholder="Tuliskan rekomendasi untuk siswa..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || !formData.nisSiswa} className="bg-gold-600 hover:bg-gold-700">
              {loading ? "Menyimpan..." : isEdit ? "Update Konseling" : "Tambah Konseling"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
