"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

interface Student {
  nis: string
  nama: string
  email: string
  kelasSaatIni: string
  angkatan: number
  jurusan: string
  status: string
  tujuanKarirSubmitted: boolean
  createdAt: string
}

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi: string
  tindakLanjut: string
  status: "SUDAH" | "BELUM"
  kategori: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

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

type DataType = "siswa" | "konseling" | "tujuanKarir"

interface DetailListModalProps {
  isOpen: boolean
  onClose: () => void
  dataType: DataType
  filterParams: { [key: string]: string | undefined }
}

export function DetailListModal({ isOpen, onClose, dataType, filterParams }: DetailListModalProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({ type: dataType, ...filterParams }).toString()
        const response = await fetch(`/api/admin/data?${params}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.message || `Failed to fetch ${dataType} data`)
        }
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isOpen, dataType, filterParams])

  const renderTableHeaders = () => {
    switch (dataType) {
      case "siswa":
        return (
          <TableRow>
            <TableHead>NIS</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tujuan Karir</TableHead>
          </TableRow>
        )
      case "konseling":
        return (
          <TableRow>
            <TableHead>Siswa</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hasil</TableHead>
          </TableRow>
        )
      case "tujuanKarir":
        return (
          <TableRow>
            <TableHead>Siswa</TableHead>
            <TableHead>Kategori Utama</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        )
      default:
        return null
    }
  }

  const renderTableRows = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4">Loading data...</TableCell>
        </TableRow>
      )
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4 text-red-500">Error: {error}</TableCell>
        </TableRow>
      )
    }
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-4">No data found.</TableCell>
        </TableRow>
      )
    }

    switch (dataType) {
      case "siswa":
        return (data as Student[]).map((item) => (
          <TableRow key={item.nis}>
            <TableCell>{item.nis}</TableCell>
            <TableCell>{item.nama}</TableCell>
            <TableCell>{item.kelasSaatIni}</TableCell>
            <TableCell>
              <Badge variant={item.status === "AKTIF" ? "default" : "secondary"}>{item.status}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={item.tujuanKarirSubmitted ? "default" : "destructive"}>
                {item.tujuanKarirSubmitted ? "Sudah" : "Belum"}
              </Badge>
            </TableCell>
          </TableRow>
        ))
      case "konseling":
        return (data as Konseling[]).map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.siswa.nama} ({item.siswa.kelasSaatIni})</TableCell>
            <TableCell>{format(new Date(item.tanggalKonseling), "dd MMM yyyy", { locale: id })}</TableCell>
            <TableCell><Badge>{item.kategori}</Badge></TableCell>
            <TableCell>
              <Badge variant={item.status === "SUDAH" ? "default" : "secondary"}>
                {item.status === "SUDAH" ? "Selesai" : "Belum"}
              </Badge>
            </TableCell>
            <TableCell className="max-w-xs truncate">{item.hasilText}</TableCell>
          </TableRow>
        ))
      case "tujuanKarir":
        return (data as TujuanKarir[]).map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.siswa.nama} ({item.siswa.kelasSaatIni})</TableCell>
            <TableCell><Badge>{item.kategoriUtama}</Badge></TableCell>
            <TableCell className="max-w-xs truncate">
              {item.kategoriUtama === "melanjutkan" && (item.ptn1 || item.jurusan1)}
              {item.kategoriUtama === "bekerja" && item.detailBekerja}
              {item.kategoriUtama === "wirausaha" && item.detailWirausaha}
            </TableCell>
          </TableRow>
        ))
      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (dataType) {
      case "siswa":
        return "Daftar Siswa"
      case "konseling":
        return "Daftar Konseling"
      case "tujuanKarir":
        return "Daftar Tujuan Karir"
      default:
        return "Detail Data"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>{renderTableHeaders()}</TableHeader>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}