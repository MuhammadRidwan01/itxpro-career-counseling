"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  UserPlus,
  MessageSquare,
  BarChart3,
  UsersIcon,
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { ImportExcelModal } from "@/components/admin/import-excel-modal"
import { StudentModal } from "@/components/admin/student-modal"
import { KonselingModal } from "@/components/admin/konseling-modal"
import { KonselingBatchModal } from "@/components/admin/konseling-batch-modal"

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
}

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
  rekomendasi: string
  rating: number
  kategori: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalKonseling: 0,
    totalTujuanKarir: 0,
    siswaAktif: 0,
  })
  const [students, setStudents] = useState<Student[]>([])
  const [konseling, setKonseling] = useState<Konseling[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Modal states
  const [showImportModal, setShowImportModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showKonselingModal, setShowKonselingModal] = useState(false)
  const [showKonselingBatchModal, setShowKonselingBatchModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedKonseling, setSelectedKonseling] = useState<Konseling | null>(null)

  useEffect(() => {
    if (status === "loading") return
    if (!session || session.user.role !== "ADMIN") {
      redirect("/auth/admin")
    }
    fetchDashboardData()
  }, [session, status])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [statsRes, studentsRes, konselingRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/siswa"),
        fetch("/api/admin/konseling"),
      ])

      const [statsData, studentsData, konselingData] = await Promise.all([
        statsRes.json(),
        studentsRes.json(),
        konselingRes.json(),
      ])

      if (statsData.success) setStats(statsData.data)
      if (studentsData.success) setStudents(studentsData.data.siswa)
      if (konselingData.success) setKonseling(konselingData.data.konseling)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStudent = async (nis: string) => {
    if (!confirm("Yakin ingin menghapus siswa ini?")) return

    try {
      const response = await fetch(`/api/admin/siswa/${nis}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.success) {
        fetchDashboardData()
      } else {
        alert(data.message || "Gagal menghapus siswa")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
      alert("Terjadi kesalahan")
    }
  }

  const handleDeleteKonseling = async (id: string) => {
    if (!confirm("Yakin ingin menghapus konseling ini?")) return

    try {
      const response = await fetch(`/api/admin/konseling/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (data.success) {
        fetchDashboardData()
      } else {
        alert(data.message || "Gagal menghapus konseling")
      }
    } catch (error) {
      console.error("Error deleting konseling:", error)
      alert("Terjadi kesalahan")
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || student.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const filteredKonseling = konseling.filter(
    (item) =>
      item.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisSiswa.includes(searchTerm) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nude-50 via-gold-50 to-nude-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-nude-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nude-50 via-gold-50 to-nude-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nude-800 mb-2">Admin Dashboard</h1>
          <p className="text-nude-600">Kelola sistem konseling karir SMK ITXPRO</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nude-600">Total Siswa</p>
                  <p className="text-2xl font-bold text-nude-800">{stats.totalSiswa}</p>
                </div>
                <Users className="w-8 h-8 text-gold-600" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nude-600">Total Konseling</p>
                  <p className="text-2xl font-bold text-nude-800">{stats.totalKonseling}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-gold-600" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nude-600">Tujuan Karir</p>
                  <p className="text-2xl font-bold text-nude-800">{stats.totalTujuanKarir}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gold-600" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nude-600">Siswa Aktif</p>
                  <p className="text-2xl font-bold text-nude-800">{stats.siswaAktif}</p>
                </div>
                <BookOpen className="w-8 h-8 text-gold-600" />
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/30 backdrop-blur-sm rounded-lg p-1">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "students", label: "Siswa", icon: Users },
              { id: "konseling", label: "Konseling", icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id ? "bg-white shadow-sm text-nude-800" : "text-nude-600 hover:text-nude-800"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-nude-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <PremiumButton onClick={() => setShowImportModal(true)} className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Import Data Siswa
                </PremiumButton>
                <PremiumButton onClick={() => setShowStudentModal(true)} className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Tambah Siswa
                </PremiumButton>
                <PremiumButton onClick={() => setShowKonselingModal(true)} className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Konseling
                </PremiumButton>
                <PremiumButton onClick={() => setShowKonselingBatchModal(true)} className="w-full justify-start">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Konseling Batch
                </PremiumButton>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-nude-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {konseling.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                    <div>
                      <p className="font-medium text-nude-800">{item.siswa.nama}</p>
                      <p className="text-sm text-nude-600">
                        {item.kategori} - {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < item.rating ? "bg-gold-500" : "bg-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "students" && (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-nude-800">Data Siswa</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                  <input
                    type="text"
                    placeholder="Cari siswa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="alumni">Alumni</option>
                  <option value="pindah">Pindah</option>
                </select>
                <PremiumButton onClick={() => setShowStudentModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Siswa
                </PremiumButton>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-medium text-nude-700">NIS</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Nama</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Kelas</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Jurusan</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Tujuan Karir</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.nis} className="border-b border-white/10 hover:bg-white/10">
                      <td className="py-3 px-4 text-nude-800">{student.nis}</td>
                      <td className="py-3 px-4 text-nude-800">{student.nama}</td>
                      <td className="py-3 px-4 text-nude-800">{student.kelasSaatIni}</td>
                      <td className="py-3 px-4 text-nude-800">{student.jurusan}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            student.status === "AKTIF"
                              ? "bg-green-100 text-green-800"
                              : student.status === "ALUMNI"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            student.tujuanKarirSubmitted
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.tujuanKarirSubmitted ? "Sudah" : "Belum"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student)
                              setShowStudentModal(true)
                            }}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4 text-nude-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.nis)}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {activeTab === "konseling" && (
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-nude-800">Data Konseling</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500" />
                  <input
                    type="text"
                    placeholder="Cari konseling..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <PremiumButton onClick={() => setShowKonselingModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Konseling
                </PremiumButton>
                <PremiumButton onClick={() => setShowKonselingBatchModal(true)}>
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Konseling Batch
                </PremiumButton>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Siswa</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Hasil</th>
                    <th className="text-left py-3 px-4 font-medium text-nude-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKonseling.map((item) => (
                    <tr key={item.id} className="border-b border-white/10 hover:bg-white/10">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-nude-800">{item.siswa.nama}</p>
                          <p className="text-sm text-nude-600">
                            {item.nisSiswa} - {item.siswa.kelasSaatIni}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-nude-800">
                        {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full text-xs capitalize">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${i < item.rating ? "bg-gold-500" : "bg-gray-300"}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-nude-800 max-w-xs truncate">{item.hasilText}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedKonseling(item)
                              setShowKonselingModal(true)
                            }}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4 text-nude-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteKonseling(item.id)}
                            className="p-1 hover:bg-white/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* Modals */}
        <ImportExcelModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onSuccess={fetchDashboardData}
        />

        <StudentModal
          isOpen={showStudentModal}
          onClose={() => {
            setShowStudentModal(false)
            setSelectedStudent(null)
          }}
          onSuccess={fetchDashboardData}
          student={selectedStudent}
        />

        <KonselingModal
          isOpen={showKonselingModal}
          onClose={() => {
            setShowKonselingModal(false)
            setSelectedKonseling(null)
          }}
          onSuccess={fetchDashboardData}
          konseling={selectedKonseling}
        />

        <KonselingBatchModal
          isOpen={showKonselingBatchModal}
          onClose={() => setShowKonselingBatchModal(false)}
          onSuccess={fetchDashboardData}
        />
      </div>
    </div>
  )
}
