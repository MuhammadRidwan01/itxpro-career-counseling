"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { User, Target, FileText, Calendar, Star, Edit, CheckCircle, Clock, BookOpen } from "lucide-react"

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("profile")
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudentData()
  }, [])

  const fetchStudentData = async () => {
    try {
      const response = await fetch("/api/student/dashboard")
      const data = await response.json()
      if (data.success) {
        setStudentData(data.data)
      }
    } catch (error) {
      console.error("Error fetching student data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") return <div>Loading...</div>
  if (!session || session.user.role !== "STUDENT") redirect("/auth/student")

  const siswa = studentData?.siswa || {}
  const stats = studentData?.stats || {}
  const konselingHistory = studentData?.konselingHistory || []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

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
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Siswa</h1>
            <p className="text-white/80">Selamat datang, {siswa.nama}</p>
          </div>
          <div className="flex items-center gap-4">
            <PremiumButton variant="secondary" size="sm">
              <Edit className="w-4 h-4" />
              Edit Profile
            </PremiumButton>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-nude-600 text-sm font-medium">Sesi Konseling</p>
                <p className="text-2xl font-bold text-nude-800 mt-1">{konselingHistory.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>

          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-nude-600 text-sm font-medium">Tujuan Karir</p>
                <p className="text-2xl font-bold text-nude-800 mt-1">
                  {siswa.tujuanKarirSubmitted ? "Terisi" : "Belum"}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>

          <GlassCard hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-nude-600 text-sm font-medium">Rating Rata-rata</p>
                <p className="text-2xl font-bold text-nude-800 mt-1">
                  {konselingHistory.length > 0
                    ? (konselingHistory.reduce((acc, k) => acc + k.rating, 0) / konselingHistory.length).toFixed(1)
                    : "0"}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="p-2">
            <div className="flex space-x-2">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "tujuan", label: "Tujuan Karir", icon: Target },
                { id: "konseling", label: "Histori Konseling", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id ? "bg-gradient-button text-white shadow-lg" : "text-nude-700 hover:bg-white/20"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Card */}
              <GlassCard className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-nude-800 mb-2">{siswa.nama}</h2>
                  <p className="text-nude-600">
                    {siswa.kelas} • {siswa.jurusan}
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

              {/* Quick Actions */}
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-nude-800 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-lg border-l-4 border-gold-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-nude-800">Tujuan Karir</h4>
                        <p className="text-sm text-nude-600">
                          {siswa.tujuanKarirSubmitted ? "Tujuan karir sudah terisi" : "Belum mengisi tujuan karir"}
                        </p>
                      </div>
                      {siswa.tujuanKarirSubmitted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Clock className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                    {!siswa.tujuanKarirSubmitted && (
                      <PremiumButton size="sm" className="mt-3">
                        Isi Tujuan Karir
                      </PremiumButton>
                    )}
                  </div>

                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="w-5 h-5 text-nude-600" />
                      <span className="font-semibold text-nude-800">Konseling Terakhir</span>
                    </div>
                    {konselingHistory.length > 0 ? (
                      <p className="text-sm text-nude-600">
                        {new Date(konselingHistory[0].tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    ) : (
                      <p className="text-sm text-nude-600">Belum ada sesi konseling</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "tujuan" && (
            <GlassCard className="p-8">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-nude-800 mb-2">Tujuan Karir</h2>
                <p className="text-nude-600">
                  {siswa.tujuanKarirSubmitted
                    ? "Tujuan karir Anda sudah tersimpan"
                    : "Tentukan tujuan karir Anda setelah lulus"}
                </p>
              </div>

              {!siswa.tujuanKarirSubmitted ? (
                <div className="max-w-md mx-auto">
                  <PremiumButton className="w-full mb-4">
                    <Target className="w-5 h-5" />
                    Mulai Isi Tujuan Karir
                  </PremiumButton>
                  <p className="text-sm text-nude-600 text-center">
                    Anda hanya dapat mengisi tujuan karir sekali. Pastikan pilihan Anda sudah tepat.
                  </p>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  {/* Display filled career goals */}
                  <div className="space-y-6">
                    <GlassCard className="p-6 bg-white/10">
                      <h3 className="font-semibold text-nude-800 mb-4">Pilihan Utama: Kuliah</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-nude-600">Pilihan 1:</span>
                          <p className="font-medium text-nude-800">Universitas Indonesia - Teknik Informatika</p>
                        </div>
                        <div>
                          <span className="text-sm text-nude-600">Pilihan 2:</span>
                          <p className="font-medium text-nude-800">Institut Teknologi Bandung - Sistem Informasi</p>
                        </div>
                        <div>
                          <span className="text-sm text-nude-600">Pilihan 3:</span>
                          <p className="font-medium text-nude-800">Universitas Gadjah Mada - Ilmu Komputer</p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              )}
            </GlassCard>
          )}

          {activeTab === "konseling" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Histori Konseling</h2>
                <PremiumButton variant="secondary" size="sm">
                  <Calendar className="w-4 h-4" />
                  Filter Tanggal
                </PremiumButton>
              </div>

              {konselingHistory.length > 0 ? (
                <div className="space-y-4">
                  {konselingHistory.map((konseling, index) => (
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
                          <div className="flex items-center gap-1 ml-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < konseling.rating ? "text-gold-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
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
                    Anda belum memiliki histori konseling. Hubungi Guru BK untuk jadwal konseling.
                  </p>
                </GlassCard>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
