"use client"

import type React from "react"

import { useState } from "react"
import { FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImportExcelModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface PreviewData {
  nis: string
  nama: string
  email: string
  kelasSaatIni: string
  angkatan: number
  jurusan: string
}

export function ImportExcelModal({ isOpen, onClose, onSuccess }: ImportExcelModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<PreviewData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [step, setStep] = useState<"upload" | "preview" | "importing">("upload")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".xlsx") && !selectedFile.name.endsWith(".xls")) {
        setError("File harus berformat Excel (.xlsx atau .xls)")
        return
      }
      setFile(selectedFile)
      setError("")
    }
  }

  const handlePreview = async () => {
    if (!file) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("preview", "true")

      const response = await fetch("/api/admin/import-siswa", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setPreviewData(data.preview)
        setStep("preview")
      } else {
        setError(data.message || "Gagal memproses file")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memproses file")
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setLoading(true)
    setError("")
    setStep("importing")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/import-siswa", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Berhasil mengimpor ${data.imported} siswa`)
        setTimeout(() => {
          onSuccess()
          handleClose()
        }, 2000)
      } else {
        setError(data.message || "Gagal mengimpor data")
        setStep("preview")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat mengimpor data")
      setStep("preview")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setPreviewData([])
    setError("")
    setSuccess("")
    setStep("upload")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Import Data Siswa dari Excel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === "upload" && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="excel-file">Pilih File Excel</Label>
                  <Input id="excel-file" type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="mt-1" />
                  <p className="text-sm text-gray-500 mt-1">Format yang didukung: .xlsx, .xls</p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Format Excel yang diperlukan:</strong>
                    <br />
                    Kolom: NIS, Nama, Email, Kelas Saat Ini, Angkatan, Jurusan
                    <br />
                    Pastikan data dimulai dari baris ke-2 (baris 1 untuk header)
                  </AlertDescription>
                </Alert>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Batal
                </Button>
                <Button onClick={handlePreview} disabled={!file || loading} className="bg-gold-600 hover:bg-gold-700">
                  {loading ? "Memproses..." : "Preview Data"}
                </Button>
              </div>
            </>
          )}

          {step === "preview" && (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Preview Data ({previewData.length} siswa)</h3>
                  <Button variant="outline" onClick={() => setStep("upload")}>
                    Pilih File Lain
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="border rounded-lg overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">NIS</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kelas</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Angkatan</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Jurusan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2 text-sm">{row.nis}</td>
                            <td className="px-4 py-2 text-sm">{row.nama}</td>
                            <td className="px-4 py-2 text-sm">{row.email}</td>
                            <td className="px-4 py-2 text-sm">{row.kelasSaatIni}</td>
                            <td className="px-4 py-2 text-sm">{row.angkatan}</td>
                            <td className="px-4 py-2 text-sm">{row.jurusan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Batal
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={loading || previewData.length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Mengimpor..." : `Import ${previewData.length} Siswa`}
                </Button>
              </div>
            </>
          )}

          {step === "importing" && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium">Mengimpor data siswa...</p>
              <p className="text-sm text-gray-500">Mohon tunggu, proses ini mungkin memakan waktu beberapa saat</p>

              {success && (
                <Alert className="mt-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
