"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Users, Search, X, Calendar, Star, FileText, Target, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

interface Student {
  nis: string
  nama: string
  kelasSaatIni: string
  jurusan: string
  angkatan: number
  status: string
}

interface KonselingBatchModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function KonselingBatchModal({ isOpen, onClose, onSuccess }: KonselingBatchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("all");
  const [filterAngkatan, setFilterAngkatan] = useState("all");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    tanggalKonseling: new Date().toISOString().split("T")[0],
    hasilText: "",
    deskripsi: "",
    tindakLanjut: "",
    kategori: "akademik",
  });

  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"select" | "form" | "processing">("select");

  // Fetch students based on filters
  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        status: "AKTIF", // Always fetch active students
        all: "true" // Fetch all data to ensure search works across all students
      });

      if (filterJurusan !== "all") {
        params.append("jurusan", filterJurusan);
      }
      if (filterAngkatan !== "all") {
        params.append("angkatan", filterAngkatan);
      }

      const response = await fetch(`/api/admin/siswa?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.data.siswa);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Gagal memuat data siswa");
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
      setStep("select");
      setSelectedStudents([]);
      setSearchTerm("");
      setFilterJurusan("all");
      setFilterAngkatan("all");
      setFormData({
        tanggalKonseling: new Date().toISOString().split("T")[0],
        hasilText: "",
        deskripsi: "",
        tindakLanjut: "",
        kategori: "akademik",
      });
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    // Re-fetch students when search term or filters change
    const debounceFetch = setTimeout(() => {
      if (isOpen) { // Only fetch if modal is open
        fetchStudents();
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceFetch);
  }, [searchTerm, filterJurusan, filterAngkatan, isOpen]); // Added isOpen to the dependency array

  const handleStudentToggle = (nis: string) => {
    setSelectedStudents((prev) =>
      prev.includes(nis) ? prev.filter((id) => id !== nis) : [...prev, nis]
    );
  };

  // Filtered students are now directly from the `students` state, as backend handles filtering
  const filteredStudents = students;

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.nis))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStudents.length === 0) {
      setError("Pilih minimal satu siswa")
      return
    }

    setLoading(true)
    setError("")
    setStep("processing")

    try {
      const response = await fetch("/api/admin/konseling/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siswaList: selectedStudents,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 2000)
      } else {
        setError(data.message || "Gagal menambahkan konseling batch")
        setStep("form")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat menambahkan konseling batch")
      setStep("form")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep("select")
    setSelectedStudents([])
    setError("")
    onClose()
  }

  const selectedStudentDetails = students.filter((s) => selectedStudents.includes(s.nis))
  const uniqueJurusan = [...new Set(students.map((s) => s.jurusan))]
  const uniqueAngkatan = [...new Set(students.map((s) => s.angkatan))].sort((a, b) => b - a)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95%] overflow-y-auto bg-white/95 backdrop-blur-lg sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Konseling Batch - {step === "select" ? "Pilih Siswa" : step === "form" ? "Form Konseling" : "Memproses"}
          </DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Cari siswa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Jurusan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jurusan</SelectItem>
                  {uniqueJurusan
                    .filter(jurusan => jurusan && jurusan.trim() !== '')
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
                  {uniqueAngkatan.map((angkatan) => (
                    <SelectItem key={angkatan} value={angkatan.toString()}>
                      {angkatan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleSelectAll} disabled={filteredStudents.length === 0}>
                {selectedStudents.length === filteredStudents.length ? "Batal Pilih Semua" : "Pilih Semua"}
              </Button>
            </div>

            {/* Selected Students Summary */}
            {selectedStudents.length > 0 && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>{selectedStudents.length} siswa dipilih untuk konseling batch</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Students List */}
            <div className="border rounded-lg">
              <div className="max-h-96 overflow-y-auto">
                {loadingStudents ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-600 mx-auto mb-2"></div>
                    <p>Memuat data siswa...</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left">
                          <Checkbox
                            checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">NIS</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kelas</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Jurusan</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Angkatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.nis} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <Checkbox
                              checked={selectedStudents.includes(student.nis)}
                              onCheckedChange={() => handleStudentToggle(student.nis)}
                            />
                          </td>
                          <td className="px-4 py-2 text-sm">{student.nis}</td>
                          <td className="px-4 py-2 text-sm font-medium">{student.nama}</td>
                          <td className="px-4 py-2 text-sm">{student.kelasSaatIni}</td>
                          <td className="px-4 py-2 text-sm">{student.jurusan}</td>
                          <td className="px-4 py-2 text-sm">{student.angkatan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button
                onClick={() => setStep("form")}
                disabled={selectedStudents.length === 0}
                className="bg-gold-600 hover:bg-gold-700"
              >
                Lanjut ke Form ({selectedStudents.length} siswa)
              </Button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Students Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Siswa yang dipilih ({selectedStudentDetails.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudentDetails.map((student) => (
                  <span key={student.nis} className="bg-gold-100 text-gold-800 px-2 py-1 rounded text-sm">
                    {student.nama} ({student.nis})
                    <button
                      type="button"
                      onClick={() => handleStudentToggle(student.nis)}
                      className="ml-2 text-gold-600 hover:text-gold-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
              <Button type="button" variant="outline" onClick={() => setStep("select")}>
                Kembali
              </Button>
              <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? "Memproses..." : `Buat Konseling untuk ${selectedStudents.length} Siswa`}
              </Button>
            </div>
          </form>
        )}

        {step === "processing" && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Membuat konseling batch...</p>
            <p className="text-sm text-gray-500">Sedang memproses {selectedStudents.length} siswa</p>

            {!loading && (
              <Alert className="mt-4">
                <Check className="h-4 w-4" />
                <AlertDescription>Berhasil membuat konseling untuk {selectedStudents.length} siswa!</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
