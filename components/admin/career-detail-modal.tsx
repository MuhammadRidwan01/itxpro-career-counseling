"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TujuanKarir {
  id: string
  nisSiswa: string
  kategoriUtama: string
  ptn1: string | null
  jurusan1: string | null
  ptn2: string | null
  jurusan2: string | null
  ptn3: string | null
  jurusan3: string | null
  detailBekerja: string | null
  detailWirausaha: string | null
  createdAt: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface CareerDetailModalProps {
  isOpen: boolean
  onClose: () => void
  tujuanKarir: TujuanKarir | null
}

export function CareerDetailModal({ isOpen, onClose, tujuanKarir }: CareerDetailModalProps) {
  if (!tujuanKarir) return null

  const renderDetailItem = (label: string, value: string | null) => {
    if (!value) return null
    return (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-500">{label}:</span>
        <span className="text-base text-slate-800">{value}</span>
      </div>
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[800px] p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-slate-800">Detail Tujuan Karir</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            Informasi lengkap tujuan karir siswa {tujuanKarir.siswa.nama} ({tujuanKarir.nisSiswa})
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {renderDetailItem("Nama Siswa", tujuanKarir.siswa.nama)}
            {renderDetailItem("NIS Siswa", tujuanKarir.nisSiswa)}
            {renderDetailItem("Kelas", tujuanKarir.siswa.kelasSaatIni)}
            {renderDetailItem("Kategori Utama", tujuanKarir.kategoriUtama === "melanjutkan" ? "Kuliah" : tujuanKarir.kategoriUtama)}
            
            {renderDetailItem("PTN 1", tujuanKarir.ptn1)}
            {renderDetailItem("Jurusan 1", tujuanKarir.jurusan1)}
            {renderDetailItem("PTN 2", tujuanKarir.ptn2)}
            {renderDetailItem("Jurusan 2", tujuanKarir.jurusan2)}
            {renderDetailItem("PTN 3", tujuanKarir.ptn3)}
            {renderDetailItem("Jurusan 3", tujuanKarir.jurusan3)}
            {renderDetailItem("Detail Bekerja", tujuanKarir.detailBekerja)}
            {renderDetailItem("Detail Wirausaha", tujuanKarir.detailWirausaha)}

            {renderDetailItem("Dibuat Pada", new Date(tujuanKarir.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }))}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="px-4 py-2">Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}