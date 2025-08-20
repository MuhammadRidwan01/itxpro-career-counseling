"use client"

import React, { useState, useEffect } from "react"
import { User, Calendar, Star, FileText, Target, Search, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useIsMobile } from "@/hooks/use-mobile"

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi?: string // Make optional
  tindakLanjut?: string // Make optional
  status: 'SUDAH' | 'BELUM'
  kategori: string
  createdAt: string // Add createdAt
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
  const isMobile = useIsMobile()
  const [formData, setFormData] = useState<{
    nisSiswa: string
    tanggalKonseling: string
    hasilText: string
    deskripsi: string
    tindakLanjut: string
    status: "SUDAH" | "BELUM"
    kategori: string
  }>({
    nisSiswa: "",
    tanggalKonseling: "",
    hasilText: "",
    deskripsi: "",
    tindakLanjut: "",
    status: "BELUM" as const,
    kategori: "akademik",
  })
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterJurusan, setFilterJurusan] = useState("all")
  const [filterAngkatan, setFilterAngkatan] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const studentListRef = React.useRef<HTMLDivElement>(null)
  const [showStudentList, setShowStudentList] = useState(false) // New state for visibility
  const [availableJurusan, setAvailableJurusan] = useState<string[]>([]);
  const [availableAngkatan, setAvailableAngkatan] = useState<number[]>([]);

  const isEdit = !!konseling

  const fetchStudents = async (page: number, append: boolean = false) => {
    setLoadingStudents(true)
    try {
      const queryParams = new URLSearchParams()
      queryParams.append("page", page.toString())
      queryParams.append("limit", "20") // Fetch 20 students at a time
      queryParams.append("all", "true") // Fetch all data to ensure search works across all students

      if (searchTerm) queryParams.append("search", searchTerm)
      if (filterJurusan !== "all") queryParams.append("jurusan", filterJurusan)
      if (filterAngkatan !== "all") queryParams.append("angkatan", filterAngkatan)

      const response = await fetch(`/api/admin/siswa?${queryParams.toString()}`)
      const data = await response.json()
      if (data.success) {
        if (append) {
          setStudents((prevStudents) => [...prevStudents, ...data.data.siswa])
        } else {
          setStudents(data.data.siswa)
        }
        setHasMore(data.data.pagination ? data.data.pagination.page < data.data.pagination.totalPages : false)
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      setError("Gagal memuat data siswa.")
    } finally {
      setLoadingStudents(false)
    }
  }

  // Fetch unique jurusan and angkatan
  const fetchFilterOptions = async () => {
    try {
      const [jurusanRes, angkatanRes] = await Promise.all([
        fetch("/api/admin/data?type=jurusan"),
        fetch("/api/admin/data?type=angkatan"),
      ]);
      const jurusanData = await jurusanRes.json();
      const angkatanData = await angkatanRes.json();

      if (jurusanData.success) {
        setAvailableJurusan(jurusanData.data);
      }
      if (angkatanData.success) {
        setAvailableAngkatan(angkatanData.data);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Initial fetch and reset on modal open
  useEffect(() => {
    if (isOpen) {
      setStudents([]) // Clear students on open
      setCurrentPage(1)
      setHasMore(true)
      fetchStudents(1)
      fetchFilterOptions() // Fetch filter options on modal open
      setSearchTerm("")
      setFilterJurusan("all")
      setFilterAngkatan("all")
      if (!konseling) { // Only show student list for new entries
        setShowStudentList(true)
      } else { // For editing, if student is already selected, hide the list
        setShowStudentList(false)
      }
    }
  }, [isOpen])

  // Refetch when filters or search term change
  useEffect(() => {
    if (isOpen) { // Only refetch if modal is open
      setStudents([]) // Clear students on filter/search change
      setCurrentPage(1)
      setHasMore(true)
      fetchStudents(1) // Fetch immediately on filter/search change
    }
  }, [searchTerm, filterJurusan, filterAngkatan])

  useEffect(() => {
    if (konseling) {
      setFormData({
        nisSiswa: konseling.nisSiswa,
        tanggalKonseling: konseling.tanggalKonseling.split("T")[0],
        hasilText: konseling.hasilText,
        deskripsi: konseling.deskripsi || "",
        tindakLanjut: konseling.tindakLanjut || "",
        status: konseling.status,
        kategori: konseling.kategori,
      })
      setShowStudentList(false) // Hide student list on edit if student is already selected
    } else {
      setFormData({
        nisSiswa: "",
        tanggalKonseling: new Date().toISOString().split("T")[0],
        hasilText: "",
        deskripsi: "",
        tindakLanjut: "",
        status: "BELUM",
        kategori: "akademik",
      })
      setShowStudentList(true) // Show student list for new entries
    }
    setError("")
  }, [konseling, isOpen])

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingStudents) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1.0 },
    )

    if (studentListRef.current) {
      observer.observe(studentListRef.current)
    }

    return () => {
      if (studentListRef.current) {
        observer.unobserve(studentListRef.current)
      }
    }
  }, [hasMore, loadingStudents])

  useEffect(() => {
    if (currentPage > 1) {
      fetchStudents(currentPage, true)
    }
  }, [currentPage])

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
      deskripsi: "",
      tindakLanjut: "",
      status: "BELUM",
      kategori: "akademik",
    })
    setError("")
    setShowStudentList(false) // Reset visibility on close
    onClose()
  }

  const handleSelectStudent = (nis: string) => {
    setFormData({ ...formData, nisSiswa: nis })
    setShowStudentList(false) // Hide list after selection
  }

  const handleClearStudent = () => {
    setFormData({ ...formData, nisSiswa: "" })
    setShowStudentList(true) // Show list to select new student
  }

  const selectedStudent = students.find((s) => s.nis === formData.nisSiswa)
  const shouldShowSelectionInterface = (!isEdit && !formData.nisSiswa) || showStudentList;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] w-[95%] sm:max-w-xl md:max-w-4xl overflow-y-auto bg-white/95 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {isEdit ? "Edit Hasil Konseling" : "Tambah Hasil Konseling"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Student Selection Section */}
          {shouldShowSelectionInterface ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informasi Siswa
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Cari siswa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Jurusan</SelectItem>
                      {availableJurusan
                        .filter((jurusan) => jurusan && jurusan.trim() !== "")
                        .map((jurusan) => (
                          <SelectItem key={jurusan} value={jurusan}>
                            {jurusan}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterAngkatan} onValueChange={setFilterAngkatan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Angkatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Angkatan</SelectItem>
                      {availableAngkatan.map((angkatan) => (
                        <SelectItem key={angkatan} value={angkatan.toString()}>
                          {angkatan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg overflow-x-auto">
                  <div ref={studentListRef} className="max-h-96 overflow-y-auto">
                    {loadingStudents && currentPage === 1 ? (
                      <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-600 mx-auto mb-2"></div>
                        <p>Memuat data siswa...</p>
                      </div>
                    ) : isMobile ? (
                      <div className="p-2 space-y-1">
                        {students.map((student) => (
                            <div
                              key={student.nis}
                              className={`p-3 rounded-md border cursor-pointer ${
                                formData.nisSiswa === student.nis
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-white border-gray-200"
                              }`}
                              onClick={() => handleSelectStudent(student.nis)}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-800">{student.nama}</h4>
                                <input
                                  type="radio"
                                  name="selectedStudent"
                                  checked={formData.nisSiswa === student.nis}
                                  onChange={() => handleSelectStudent(student.nis)}
                                  className="form-radio h-4 w-4 text-blue-600"
                                />
                              </div>
                              <p className="text-sm text-gray-600">
                                {student.nis} • {student.kelasSaatIni} • {student.jurusan} • Angkatan {student.angkatan}
                              </p>
                            </div>
                          ))}
                        {loadingStudents && currentPage > 1 && (
                          <div className="p-4 text-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-600 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-2">Memuat lebih banyak siswa...</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">NIS</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kelas</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Jurusan</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Angkatan</th>
                              <th className="px-4 py-2"></th> {/* Empty header for radio button column */}
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student) => (
                              <tr key={student.nis} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectStudent(student.nis)}>
                                <td className="px-4 py-2 text-sm">{student.nis}</td>
                                <td className="px-4 py-2 text-sm font-medium">{student.nama}</td>
                                <td className="px-4 py-2 text-sm">{student.kelasSaatIni}</td>
                                <td className="px-4 py-2 text-sm">{student.jurusan}</td>
                                <td className="px-4 py-2 text-sm">{student.angkatan}</td>
                                <td className="px-4 py-2">
                                  <input
                                    type="radio"
                                    name="selectedStudent"
                                    checked={formData.nisSiswa === student.nis}
                                    onChange={() => handleSelectStudent(student.nis)}
                                    className="form-radio h-4 w-4 text-blue-600"
                                  />
                                </td>
                              </tr>
                            ))}
                            {loadingStudents && currentPage > 1 && (
                              <tr>
                                <td colSpan={6} className="p-4 text-center">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-600 mx-auto"></div>
                                  <p className="text-sm text-gray-500 mt-2">Memuat lebih banyak siswa...</p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            selectedStudent && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Siswa
                </h3>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gold-600">{selectedStudent.nama}</h4>
                    <p className="text-sm text-gold-400">
                      NIS: {selectedStudent.nis} • Kelas: {selectedStudent.kelasSaatIni}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClearStudent}>
                    Ganti Siswa
                  </Button>
                </div>
              </div>
            )
          )}

          {/* Konseling Details Section */}
          <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 space-y-4">
            <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-600" />
              Detail Konseling
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Tuliskan hasil konseling yang akan diterapkan untuk semua siswa yang dipilih..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Tuliskan deskripsi konseling (opsional)..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tindakLanjut" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Tindak Lanjut
              </Label>
              <Textarea
                id="tindakLanjut"
                value={formData.tindakLanjut}
                onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value })}
                placeholder="Tuliskan tindak lanjut konseling (opsional)..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading || !formData.nisSiswa} className="bg-green-600 hover:bg-green-700">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </div>
                ) : isEdit && formData.status === "SUDAH" ? (
                  "Selesaikan Konseling"
                ) : isEdit ? (
                  "Update Konseling"
                ) : (
                  "Tambah Konseling"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
