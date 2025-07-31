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
  X,
  Filter,
  Menu,
  Star,
  StarOff,
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
  const [showMobileFilters, setShowMobileFilters] = useState(false)

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

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          i < rating ? (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarOff key={i} className="w-3 h-3 text-gray-300" />
          )
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600 text-sm">Kelola sistem konseling karir SMK ITXPRO</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Total Siswa</p>
                  <p className="text-xl font-bold text-slate-800">{stats.totalSiswa}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Total Konseling</p>
                  <p className="text-xl font-bold text-slate-800">{stats.totalKonseling}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Tujuan Karir</p>
                  <p className="text-xl font-bold text-slate-800">{stats.totalTujuanKarir}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1">Siswa Aktif</p>
                  <p className="text-xl font-bold text-slate-800">{stats.siswaAktif}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-1 shadow-sm">
            <div className="flex">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "students", label: "Siswa", icon: Users },
                { id: "konseling", label: "Konseling", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    activeTab === tab.id 
                      ? "bg-white shadow-sm text-slate-800 border border-white/80" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Import Data Siswa</span>
                </button>
                
                <button
                  onClick={() => setShowStudentModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-all"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Tambah Siswa</span>
                </button>
                
                <button
                  onClick={() => setShowKonselingModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Tambah Konseling</span>
                </button>
                
                <button
                  onClick={() => setShowKonselingBatchModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all"
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">Konseling Batch</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Aktivitas Terbaru
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {konseling.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 border border-white/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{item.siswa.nama}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-600">
                          {item.kategori}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600">
                          {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      {renderStarRating(item.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl shadow-sm overflow-hidden">
            {/* Header & Search */}
            <div className="p-6 border-b border-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Data Siswa ({filteredStudents.length})
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="sm:hidden flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button
                    onClick={() => setShowStudentModal(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Siswa
                  </button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className={`mt-4 space-y-3 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Cari siswa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="alumni">Alumni</option>
                    <option value="pindah">Pindah</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden">
              {filteredStudents.map((student) => (
                <div key={student.nis} className="p-4 border-b border-white/30 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 truncate">{student.nama}</h4>
                      <p className="text-sm text-slate-600">{student.nis}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        onClick={() => {
                          setSelectedStudent(student)
                          setShowStudentModal(true)
                        }}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.nis)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Kelas:</span>
                      <span className="ml-1 text-slate-700">{student.kelasSaatIni}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Jurusan:</span>
                      <span className="ml-1 text-slate-700">{student.jurusan}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === "AKTIF"
                          ? "bg-green-100 text-green-700"
                          : student.status === "ALUMNI"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {student.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.tujuanKarirSubmitted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.tujuanKarirSubmitted ? "Sudah Karir" : "Belum Karir"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    {["NIS", "Nama", "Kelas", "Jurusan", "Status", "Tujuan Karir", "Aksi"].map((header) => (
                      <th key={header} className="text-left py-3 px-4 font-medium text-slate-700 text-sm">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.nis} className="border-b border-white/30 hover:bg-white/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-slate-800 font-mono">{student.nis}</td>
                      <td className="py-3 px-4 text-sm text-slate-800 font-medium">{student.nama}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{student.kelasSaatIni}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{student.jurusan}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === "AKTIF"
                              ? "bg-green-100 text-green-700"
                              : student.status === "ALUMNI"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.tujuanKarirSubmitted
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {student.tujuanKarirSubmitted ? "Sudah" : "Belum"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedStudent(student)
                              setShowStudentModal(true)
                            }}
                            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.nis)}
                            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
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
          </div>
        )}

        {activeTab === "konseling" && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl shadow-sm overflow-hidden">
            {/* Header & Search */}
            <div className="p-6 border-b border-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Data Konseling ({filteredKonseling.length})
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="sm:hidden flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowKonselingModal(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Tambah</span>
                    </button>
                    <button
                      onClick={() => setShowKonselingBatchModal(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      <UsersIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Batch</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Search */}
              <div className={`mt-4 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari konseling..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden">
              {filteredKonseling.map((item) => (
                <div key={item.id} className="p-4 border-b border-white/30 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 truncate">{item.siswa.nama}</h4>
                      <p className="text-sm text-slate-600">{item.nisSiswa} • {item.siswa.kelasSaatIni}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        onClick={() => {
                          setSelectedKonseling(item)
                          setShowKonselingModal(true)
                        }}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteKonseling(item.id)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                        {item.kategori}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Rating:</span>
                        {renderStarRating(item.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.hasilText}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    {["Siswa", "Tanggal", "Kategori", "Rating", "Hasil", "Aksi"].map((header) => (
                      <th key={header} className="text-left py-3 px-4 font-medium text-slate-700 text-sm">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredKonseling.map((item) => (
                    <tr key={item.id} className="border-b border-white/30 hover:bg-white/30 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{item.siswa.nama}</p>
                          <p className="text-xs text-slate-600">{item.nisSiswa} • {item.siswa.kelasSaatIni}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {renderStarRating(item.rating)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 max-w-xs">
                        <p className="truncate">{item.hasilText}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedKonseling(item)
                              setShowKonselingModal(true)
                            }}
                            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteKonseling(item.id)}
                            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
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
          </div>
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