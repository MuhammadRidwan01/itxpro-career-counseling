"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { User, Target, FileText, Calendar, Check, Edit, CheckCircle, Clock, BookOpen, ArrowLeft, LogOut, Eye, EyeOff } from "lucide-react"
import type { StudentDashboardData } from "@/types/api"



export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter() // Inisialisasi useRouter
  const [activeTab, setActiveTab] = useState("profile")
  const [studentData, setStudentData] = useState<StudentDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEditPassword, setShowEditPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

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

  const siswa = studentData?.siswa || {
    nis: "",
    nama: "",
    email: "",
    kelasSaatIni: "",
    angkatan: 0,
    jurusan: "",
    status: "",
    tujuanKarirSubmitted: false
  }
  const stats = studentData?.stats || {
    totalKonseling: 0,
    avgRating: 0,
    tujuanKarirStatus: "Belum"
  }
  const konselingHistory = studentData?.konselingHistory || []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nude-800 via-nude-900 to-nude-950 flex items-center justify-center">
        <div className="text-nude-100 text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nude-800 via-nude-900 to-nude-950 text-nude-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Subtle background pattern/texture */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header/Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <GlassCard variant="tinted" className="p-8 border border-nude-700/50 rounded-2xl shadow-xl bg-nude-800/60">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="hidden md:flex w-16 h-16 bg-gradient-to-br from-nude-600 to-nude-800 rounded-full items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-nude-100" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-nude-100 mb-1">
                      Selamat Datang, <span className="text-nude-200">{siswa.nama}</span>!
                    </h1>
                    <p className="text-nude-300">Dashboard Siswa ITXPRO Career Counseling</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <PremiumButton onClick={() => router.replace('/')} variant="outline-glass" size="sm" className="bg-nude-800/30 hover:bg-nude-800/40 text-nude-100">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </PremiumButton>
                <PremiumButton onClick={() => setShowEditPassword(true)} variant="outline-glass" size="sm" className="bg-nude-800/30 hover:bg-nude-800/40 text-nude-100">
                  <Edit className="w-4 h-4 mr-2" />
                  Ubah Password
                </PremiumButton>
                <PremiumButton onClick={() => signOut({ callbackUrl: "/auth/student" })} variant="outline-glass" size="sm" className="bg-nude-800/30 hover:bg-nude-800/40 text-nude-100">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </PremiumButton>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Modal Edit Password */}
        {showEditPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-nude-900/40 p-4">
                      <div className="bg-nude-50 rounded-lg shadow-lg p-8 w-full max-w-md relative transform transition-all scale-100 opacity-100">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setShowEditPassword(false)
                  setOldPassword("")
                  setNewPassword("")
                  setConfirmPassword("")
                  setPasswordError("")
                  setPasswordSuccess("")
                }}
                aria-label="Tutup"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-nude-800">Ubah Password</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setPasswordError("")
                  setPasswordSuccess("")
                  if (!oldPassword || !newPassword || !confirmPassword) {
                    setPasswordError("Semua field wajib diisi.")
                    return
                  }
                  if (newPassword !== confirmPassword) {
                    setPasswordError("Password baru dan konfirmasi tidak sama.")
                    return
                  }
                  if (newPassword.length < 6) {
                    setPasswordError("Password baru minimal 6 karakter.")
                    return
                  }
                  setPasswordLoading(true)
                  try {
                    const res = await fetch("/api/student/update-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ oldPassword, newPassword })
                    })
                    const data = await res.json()
                    if (data.success) {
                      setPasswordSuccess("Password berhasil diubah.")
                      setOldPassword("")
                      setNewPassword("")
                      setConfirmPassword("")
                    } else {
                      setPasswordError(data.message || "Gagal mengubah password.")
                    }
                  } catch (err) {
                    setPasswordError("Terjadi kesalahan. Coba lagi nanti.")
                  } finally {
                    setPasswordLoading(false)
                  }
                }}
              >
                <div className="mb-4">
                  <label className="block text-nude-700 font-medium mb-2">Password Lama</label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      className="w-full border border-nude-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-nude-500 focus:border-transparent transition-all bg-nude-50"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-400 hover:text-nude-600" onClick={() => setShowOld(v => !v)}>
                      {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-nude-700 font-medium mb-2">Password Baru</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      className="w-full border border-nude-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-nude-500 focus:border-transparent transition-all bg-nude-50"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-400 hover:text-nude-600" onClick={() => setShowNew(v => !v)}>
                      {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-nude-700 font-medium mb-2">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirm(v => !v)}>
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {passwordError && <div className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md">{passwordError}</div>}
                {passwordSuccess && <div className="text-green-600 text-sm mb-4 bg-green-100 p-3 rounded-md">{passwordSuccess}</div>}
                <PremiumButton
                  type="submit"
                  className="w-full"
                  loading={passwordLoading}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </PremiumButton>
              </form>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <GlassCard hover className="p-6 flex items-center space-x-4 bg-nude-900/60">
            <div className="w-16 h-16 bg-gradient-to-br from-nude-700 to-nude-900 rounded-full flex items-center justify-center shadow-lg">
                          <FileText className="w-8 h-8 text-nude-100" />
                        </div>
            <div>
              <p className="text-nude-200 text-sm font-medium">Sesi Konseling</p>
                            <p className="text-3xl font-bold text-nude-100 mt-1">{konselingHistory.length}</p>
            </div>
          </GlassCard>

              <GlassCard hover variant="tinted" className="p-6 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-nude-600 to-nude-800 rounded-full flex items-center justify-center shadow-lg">
                          <Target className="w-8 h-8 text-white" />
                        </div>
            <div>
              <p className="text-nude-100 text-sm font-medium">Tujuan Karir</p>
                            <p className="text-3xl font-bold text-nude-950 mt-1">
                {siswa.tujuanKarirSubmitted ? "Terisi" : "Belum"}
              </p>
            </div>
          </GlassCard>          <GlassCard hover className="p-6 flex items-center space-x-4 bg-nude-800/40">
            <div className="w-16 h-16 bg-gradient-to-br from-nude-600 to-nude-800 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-8 h-8 text-nude-100" />
                        </div>
            <div>
              <p className="text-nude-200 text-sm font-medium">Konseling Selesai</p>
                            <p className="text-3xl font-bold text-nude-100 mt-1">
                {konselingHistory.filter(k => k.status === "SUDAH").length}/{konselingHistory.length}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <GlassCard className="p-3 bg-nude-900/60 border border-nude-700/50">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {[
                { id: "profile", label: "Profil Saya", icon: User },
                { id: "tujuan", label: "Rencana Karir", icon: Target },
                { id: "konseling", label: "Histori Konseling", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-br from-nude-700 to-nude-800 text-nude-100 shadow-lg transform scale-105"
                      : "text-nude-700 hover:bg-nude-700/20 hover:text-nude-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
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
              <GlassCard className="p-8 border border-nude-700/50 rounded-2xl shadow-xl bg-nude-900/60">
                           <div className="text-center mb-8">
                             <div className="w-32 h-32 bg-gradient-to-br from-nude-700 to-nude-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-transform hover:scale-105">
                               <User className="w-16 h-16 text-nude-100" />
                             </div>
                             <Link href={`/student/${siswa.nis}`} className="hover:underline">
                               <h2 className="text-3xl font-bold text-nude-100 mb-2">{siswa.nama}</h2>
                             </Link>
                             <p className="text-nude-200 text-lg">
                               {siswa.kelasSaatIni} • {siswa.jurusan}
                             </p>
                           </div>
           
                           <div className="space-y-4">
                             <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-nude-700/50 rounded-lg">
                               <span className="text-nude-200 font-medium">NIS</span>
                               <span className="text-nude-100 font-mono text-lg">{siswa.nis}</span>
                             </div>
                             <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-nude-700/50 rounded-lg">
                               <span className="text-nude-200 font-medium">Email</span>
                               <span className="text-nude-100 text-lg">{siswa.email}</span>
                             </div>
                             <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-nude-700/50 rounded-lg">
                               <span className="text-nude-200 font-medium">Angkatan</span>
                               <span className="text-nude-100 text-lg">{siswa.angkatan}</span>
                             </div>
                             <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-nude-700/50 rounded-lg">
                               <span className="text-nude-200 font-medium">Status</span>
                               <span className="px-4 py-1 bg-green-500/20 text-green-300 rounded-full text-base font-medium">
                                 {siswa.status}
                               </span>
                             </div>
                           </div>
           </GlassCard>

              {/* Quick Actions */}
              <GlassCard variant="tinted" className="p-8 border border-nude-700/50 rounded-2xl shadow-xl bg-nude-900/60">
                              <h3 className="text-2xl font-bold text-nude-100 mb-6">Aksi Cepat</h3>
                              <div className="space-y-6">
                                <div className="p-5 bg-nude-800/50 rounded-lg border-l-4 border-nude-500 shadow-md">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <h4 className="font-semibold text-nude-100 text-lg">Rencana Karir</h4>
                                      <p className="text-sm text-nude-200">
                                        {siswa.tujuanKarirSubmitted ? "Rencana karir sudah terisi" : "Belum mengisi rencana karir"}
                                      </p>
                                    </div>
                                    {siswa.tujuanKarirSubmitted ? (
                                      <CheckCircle className="w-8 h-8 text-green-400" />
                                    ) : (
                                      <Clock className="w-8 h-8 text-nude-300" />
                                    )}
                                  </div>
                                  <Link href="/student/tujuan-karir">
                                    <PremiumButton size="sm" className="mt-3 w-full" variant="outline-glass">
                                      {siswa.tujuanKarirSubmitted ? "Lihat/Edit Rencana Karir" : "Isi Rencana Karir"}
                                    </PremiumButton>
                                  </Link>
                                </div>
              
                                <div className="p-5 bg-nude-700/50 rounded-lg shadow-md">
                                  <div className="flex items-center gap-4 mb-3">
                                    <BookOpen className="w-6 h-6 text-nude-200" />
                                    <span className="font-semibold text-nude-100 text-lg">Sesi Konseling Terakhir</span>
                                  </div>
                                  {konselingHistory.length > 0 ? (
                                    <p className="text-base text-nude-200">
                                      {new Date(konselingHistory[0].tanggal).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </p>
                                  ) : (
                                    <p className="text-base text-nude-200">Belum ada sesi konseling.</p>
                                  )}
                                </div>
                              </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "tujuan" && (
            <GlassCard className="p-8 border border-stone-200 rounded-2xl shadow-xl">
                          <div className="text-center mb-8">
                            <Target className="w-20 h-20 text-gold-400 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-3">Rencana Karir Anda</h2>
                            <p className="text-white/70 text-lg">
                              {siswa.tujuanKarirSubmitted
                                ? "Rencana karir Anda sudah tersimpan."
                                : "Tentukan rencana karir Anda setelah lulus."}
                            </p>
                          </div>
            
                          {!siswa.tujuanKarirSubmitted ? (
                            <div className="max-w-md mx-auto">
                              <Link href="/student/tujuan-karir">
                                <PremiumButton className="w-full mb-4" variant="primary">
                                  <Target className="w-5 h-5" />
                                  Mulai Isi Rencana Karir
                                </PremiumButton>
                              </Link>
                              <p className="text-sm text-white/70 text-center">
                                Anda hanya dapat mengisi rencana karir sekali. Pastikan pilihan Anda sudah tepat.
                              </p>
                            </div>
                          ) : (
                            <div className="max-w-2xl mx-auto">
                              <div className="space-y-6">
                                <GlassCard variant="tinted" className="p-6 border border-stone-100">
                                  <h3 className="font-semibold text-white mb-4 capitalize text-xl">
                                    Pilihan Utama: {studentData?.tujuanKarir?.kategoriUtama}
                                  </h3>
                                  
                                  {studentData?.tujuanKarir?.kategoriUtama === "kuliah" && (
                                    <div className="space-y-4">
                                      {studentData?.tujuanKarir?.ptn1 && (
                                        <div>
                                          <span className="text-sm text-stone-700">Pilihan 1:</span>
                                          <p className="font-medium text-white text-lg">
                                            {studentData.tujuanKarir.ptn1} - {studentData.tujuanKarir.jurusan1}
                                          </p>
                                        </div>
                                      )}
                                      {studentData?.tujuanKarir?.ptn2 && (
                                        <div>
                                          <span className="text-sm text-stone-700">Pilihan 2:</span>
                                          <p className="font-medium text-white text-lg">
                                            {studentData.tujuanKarir.ptn2} - {studentData.tujuanKarir.jurusan2}
                                          </p>
                                        </div>
                                      )}
                                      {studentData?.tujuanKarir?.ptn3 && (
                                        <div>
                                          <span className="text-sm text-stone-700">Pilihan 3:</span>
                                          <p className="font-medium text-white text-lg">
                                            {studentData.tujuanKarir.ptn3} - {studentData.tujuanKarir.jurusan3}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}
            
                                  {studentData?.tujuanKarir?.kategoriUtama === "bekerja" && (
                                    <div className="space-y-4">
                                      <p className="text-white/70 leading-relaxed text-base">{studentData.tujuanKarir.detailBekerja}</p>
                                    </div>
                                  )}
            
                                  {studentData?.tujuanKarir?.kategoriUtama === "wirausaha" && (
                                    <div className="space-y-4">
                                      <p className="text-white/70 leading-relaxed text-base">{studentData.tujuanKarir.detailWirausaha}</p>
                                    </div>
                                  )}
                                </GlassCard>
                              </div>
                            </div>
                          )}
                        </GlassCard>
          )}

          {activeTab === "konseling" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">Histori Konseling</h2>
                <PremiumButton variant="outline-glass" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filter Tanggal
                </PremiumButton>
              </div>

              {konselingHistory.length > 0 ? (
                <div className="space-y-4">
                  {konselingHistory.map((konseling, index: number) => (
                    <motion.div
                      key={konseling.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="p-6 border border-stone-200 rounded-2xl shadow-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 bg-gold-400/20 text-gold-300 rounded-full text-sm font-medium">
                                {konseling.kategori}
                              </span>
                              <span className="text-stone-700 text-sm">
                                {new Date(konseling.tanggal).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <p className="text-white leading-relaxed text-lg">{konseling.hasil}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-0 sm:ml-4 mt-3 sm:mt-0">
                            <PremiumButton variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Detail
                            </PremiumButton>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <GlassCard variant="tinted" className="p-12 text-center border border-stone-200 rounded-2xl shadow-xl">
                                  <FileText className="w-20 h-20 text-stone-400 mx-auto mb-6" />
                                  <h3 className="text-2xl font-semibold text-white mb-3">Belum Ada Histori Konseling</h3>
                                  <p className="text-white/70 text-lg">
                                    Anda belum memiliki histori konseling. Hubungi Guru BK untuk menjadwalkan sesi konseling.
                                  </p>
                </GlassCard>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
