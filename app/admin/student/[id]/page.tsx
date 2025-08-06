"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect, useParams } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { User, Target, FileText, Calendar, Check, Edit, BookOpen } from "lucide-react"
import { StudentDashboardData } from "@/types/api"

export default function AdminStudentDetailPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const studentId = params.id as string

  const [studentData, setStudentData] = useState<StudentDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails(studentId)
    }
  }, [studentId])

  const fetchStudentDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/student/${id}`) // Use the new admin API endpoint
      const data = await response.json()
      if (data.success) {
        setStudentData(data.data)
      }
    } catch (error) {
      console.error("Error fetching student details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") return <div>Loading...</div>
  if (!session || session.user.role !== "ADMIN") redirect("/auth/admin") // Restrict to ADMIN only

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading student details...</div>
      </div>
    )
  }

  if (!studentData || !studentData.siswa) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-xl">Student not found.</div>
      </div>
    )
  }

  const { siswa, konselingHistory, tujuanKarir } = studentData

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Detail Siswa (Admin View)</h1>
            <p className="text-white/80">Informasi lengkap tentang {siswa.nama}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <GlassCard className="p-8 col-span-1 lg:col-span-1">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-nude-800 mb-2">{siswa.nama}</h2>
              <p className="text-nude-600">
                {siswa.kelasSaatIni} • {siswa.jurusan}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <span className="text-nude-700 font-medium">NIS</span>
                <span className="text-nude-800 font-mono">{siswa.nis}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <span className="text-nude-700 font-medium">Email</span>
                <span className="text-nude-800">{siswa.email}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <span className="text-nude-700 font-medium">Angkatan</span>
                <span className="text-nude-800">{siswa.angkatan}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <span className="text-nude-700 font-medium">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {siswa.status}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Career Goal and Counseling History */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            {/* Career Goal */}
            <GlassCard className="p-8">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-nude-800 mb-2">Tujuan Karir</h2>
                <p className="text-nude-600">
                  {siswa.tujuanKarirSubmitted
                    ? "Tujuan karir siswa sudah tersimpan"
                    : "Siswa belum mengisi tujuan karir"}
                </p>
              </div>

              {siswa.tujuanKarirSubmitted && tujuanKarir && (
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <GlassCard className="p-6 bg-white/10">
                      <h3 className="font-semibold text-nude-800 mb-4 capitalize">
                        Pilihan Utama: {tujuanKarir.kategoriUtama}
                      </h3>
                      
                      {tujuanKarir.kategoriUtama === "kuliah" && (
                        <div className="space-y-3">
                          {tujuanKarir.ptn1 && (
                            <div>
                              <span className="text-sm text-nude-600">Pilihan 1:</span>
                              <p className="font-medium text-nude-800">
                                {tujuanKarir.ptn1} - {tujuanKarir.jurusan1}
                              </p>
                            </div>
                          )}
                          {tujuanKarir.ptn2 && (
                            <div>
                              <span className="text-sm text-nude-600">Pilihan 2:</span>
                              <p className="font-medium text-nude-800">
                                {tujuanKarir.ptn2} - {tujuanKarir.jurusan2}
                              </p>
                            </div>
                          )}
                          {tujuanKarir.ptn3 && (
                            <div>
                              <span className="text-sm text-nude-600">Pilihan 3:</span>
                              <p className="font-medium text-nude-800">
                                {tujuanKarir.ptn3} - {tujuanKarir.jurusan3}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {tujuanKarir.kategoriUtama === "bekerja" && (
                        <div className="space-y-3">
                          <p className="text-nude-700 leading-relaxed">{tujuanKarir.detailBekerja}</p>
                        </div>
                      )}

                      {tujuanKarir.kategoriUtama === "wirausaha" && (
                        <div className="space-y-3">
                          <p className="text-nude-700 leading-relaxed">{tujuanKarir.detailWirausaha}</p>
                        </div>
                      )}
                    </GlassCard>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Counseling History */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Histori Konseling</h2>
              </div>

              {konselingHistory.length > 0 ? (
                <div className="space-y-4">
                  {konselingHistory.map((konseling, index: number) => (
                    <motion.div
                      key={konseling.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium">
                                {konseling.kategori}
                              </span>
                              <span className="text-nude-600 text-sm">
                                {new Date(konseling.tanggal).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <p className="text-nude-800 leading-relaxed">{konseling.hasil}</p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <GlassCard className="p-12 text-center">
                  <FileText className="w-16 h-16 text-nude-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-nude-800 mb-2">Belum Ada Konseling</h3>
                  <p className="text-nude-600">
                    Siswa ini belum memiliki histori konseling.
                  </p>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}