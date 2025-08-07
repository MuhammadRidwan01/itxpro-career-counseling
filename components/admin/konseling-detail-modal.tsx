"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MessageSquare, User, Calendar, Star, FileText, Target } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi?: string
  tindakLanjut?: string
  status: 'SUDAH' | 'BELUM'
  kategori: string
  createdAt: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface KonselingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  konseling: Konseling | null
}

export function KonselingDetailModal({ isOpen, onClose, konseling }: KonselingDetailModalProps) {
  if (!konseling) {
    return null; // Or handle loading state, error, etc.
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95%] overflow-y-auto bg-white/95 backdrop-blur-lg sm:w-full">
        <DialogHeader className="space-y-3 pb-6 border-b">
          <DialogTitle className="flex items-center gap-2 text-2xl text-gold-600">
            <MessageSquare className="w-6 h-6 text-gold-600" />
            Detail Hasil Konseling
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Informasi lengkap mengenai sesi konseling ini.
          </p>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Student Information Section */}
          <div className="bg-nude-50/50 p-6 rounded-lg border border-nude-100 space-y-4">
            <h3 className="font-semibold text-lg text-nude-800 flex items-center gap-2">
              <User className="w-5 h-5 text-gold-600" />
              Informasi Siswa
            </h3>
            <div className="flex items-center gap-4 bg-gold-50 p-4 rounded-lg border border-gold-200">
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <h4 className="font-medium text-gold-600">{konseling.siswa.nama}</h4>
                <p className="text-sm text-gold-400">
                  NIS: {konseling.nisSiswa} • Kelas: {konseling.siswa.kelasSaatIni}
                </p>
              </div>
            </div>
          </div>

          {/* Konseling Details Section */}
          <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 space-y-6">
            <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold-600" />
              Detail Konseling
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label className="text-gray-700">Tanggal Konseling</Label>
                <p className="text-nude-700 font-medium">
                  {konseling.tanggalKonseling ? format(new Date(konseling.tanggalKonseling), "dd MMMM yyyy", { locale: id }) : "-"}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Status Konseling</Label>
                <Badge variant={konseling.status === "SUDAH" ? "default" : "secondary"}>
                  {konseling.status === "SUDAH" ? "Selesai" : "Belum Selesai"}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Kategori Konseling</Label>
                <Badge>{konseling.kategori}</Badge>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50/50 p-6 rounded-lg border border-gray-100 space-y-6">
            <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold-600" />
              Hasil, Deskripsi, dan Tindak Lanjut
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Hasil Konseling</Label>
                <div className="p-3 border rounded-md bg-white text-nude-700 whitespace-pre-wrap">
                  {konseling.hasilText || "Tidak ada hasil konseling."}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Deskripsi</Label>
                <div className="p-3 border rounded-md bg-white text-nude-700 whitespace-pre-wrap">
                  {konseling.deskripsi || "Tidak ada deskripsi."}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Tindak Lanjut</Label>
                <div className="p-3 border rounded-md bg-white text-nude-700 whitespace-pre-wrap">
                  {konseling.tindakLanjut || "Tidak ada tindak lanjut."}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onClose}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}