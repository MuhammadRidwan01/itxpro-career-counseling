"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, GraduationCap, Calendar, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Student {
  nis: string
  nama: string
  kelasSaatIni: string
  angkatan: number
  jurusan: string
  status: string
}

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  student?: Student | null
}

export function StudentModal({ isOpen, onClose, onSuccess, student }: StudentModalProps) {
  const [formData, setFormData] = useState({
    nis: "",
    nama: "",
    kelasSaatIni: "",
    angkatan: new Date().getFullYear(),
    jurusan: "",
    status: "AKTIF",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isEdit = !!student

  useEffect(() => {
    if (student) {
      setFormData({
        nis: student.nis,
        nama: student.nama,
        kelasSaatIni: student.kelasSaatIni,
        angkatan: student.angkatan,
        jurusan: student.jurusan,
        status: student.status,
      })
    } else {
      setFormData({
        nis: "",
        nama: "",
        kelasSaatIni: "",
        angkatan: new Date().getFullYear(),
        jurusan: "",
        status: "AKTIF",
      })
    }
    setError("")
  }, [student, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = isEdit ? `/api/admin/siswa/${student.nis}` : "/api/admin/siswa"
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
        setError(data.message || `Gagal ${isEdit ? "mengupdate" : "menambahkan"} siswa`)
      }
    } catch (error) {
      setError(`Terjadi kesalahan saat ${isEdit ? "mengupdate" : "menambahkan"} siswa`)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      nis: "",
      nama: "",
      kelasSaatIni: "",
      angkatan: new Date().getFullYear(),
      jurusan: "",
      status: "AKTIF",
    })
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95%] overflow-y-auto bg-white/95 backdrop-blur-lg sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {isEdit ? "Edit Siswa" : "Tambah Siswa Baru"}
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
              <Label htmlFor="nis" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                NIS
              </Label>
              <Input
                id="nis"
                value={formData.nis}
                onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                placeholder="Masukkan NIS"
                required
                disabled={isEdit}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="kelasSaatIni" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Kelas Saat Ini
              </Label>
              <Input
                id="kelasSaatIni"
                value={formData.kelasSaatIni}
                onChange={(e) => setFormData({ ...formData, kelasSaatIni: e.target.value })}
                placeholder="Contoh: XII RPL 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="angkatan" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Angkatan
              </Label>
              <Input
                id="angkatan"
                type="number"
                value={formData.angkatan}
                onChange={(e) => setFormData({ ...formData, angkatan: Number.parseInt(e.target.value) })}
                placeholder="Contoh: 2025"
                min="2020"
                max="2030"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jurusan">Jurusan</Label>
              <Select value={formData.jurusan} onValueChange={(value) => setFormData({ ...formData, jurusan: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jurusan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RPL">Rekayasa Perangkat Lunak</SelectItem>
                  <SelectItem value="TKJ">Teknik Komputer dan Jaringan</SelectItem>
                  <SelectItem value="DKV">Desain Komunikasi Visual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AKTIF">Aktif</SelectItem>
                  <SelectItem value="ALUMNI">Alumni</SelectItem>
                  <SelectItem value="PINDAH">Pindah</SelectItem>
                  <SelectItem value="KELUAR">Keluar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading} className="bg-gold-600 hover:bg-gold-700">
              {loading ? "Menyimpan..." : isEdit ? "Update Siswa" : "Tambah Siswa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
