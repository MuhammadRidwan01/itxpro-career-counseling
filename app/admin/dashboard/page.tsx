"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react" // Tambahkan signOut
import { redirect, useRouter } from "next/navigation" // Tambahkan useRouter
import Link from "next/link"
import { motion } from "framer-motion"
import {
ArrowLeft, // Tambahkan ArrowLeft
LogOut, // Tambahkan LogOut
BarChart3, // Untuk ikon di header
} from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import { StatsCards } from "@/components/admin/dashboard/stats-cards"
import { TabNavigation } from "@/components/admin/dashboard/tab-navigation"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { RecentActivity } from "@/components/admin/dashboard/recent-activity"
import { StudentList } from "@/components/admin/dashboard/student-list"
import { KonselingList } from "@/components/admin/dashboard/konseling-list"
import { CareerManagement } from "@/components/admin/dashboard/career-management"
import { StatisticsView } from "@/components/admin/dashboard/statistics-view"

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
  deskripsi: string
  tindakLanjut: string
  status: "SUDAH" | "BELUM"
  kategori: string
  // kategoriUtama: string; // Hapus ini jika tidak diperlukan di sini
  // rating: number // Hapus ini jika tidak ada di skema
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

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter() // Inisialisasi useRouter
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalKonseling: 0,
    totalTujuanKarir: 0,
    siswaAktif: 0,
  })
  const [students, setStudents] = useState<Student[]>([])
  const [konseling, setKonseling] = useState<Konseling[]>([])
  const [tujuanKarir, setTujuanKarir] = useState<TujuanKarir[]>([]) // New state for career goals
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

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
      const [statsRes, studentsRes, konselingRes, tujuanKarirRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/siswa"),
        fetch("/api/admin/konseling"),
        fetch("/api/admin/tujuan-karir"), // Fetch career goals
      ])

      const [statsData, studentsData, konselingData, tujuanKarirData] = await Promise.all([
        statsRes.json(),
        studentsRes.json(),
        konselingRes.json(),
        tujuanKarirRes.json(), // Parse career goals data
      ])

      if (statsData.success) setStats(statsData.data)
      if (studentsData.success) setStudents(studentsData.data.siswa)
      if (konselingData.success) setKonseling(konselingData.data.konseling)
      if (tujuanKarirData.success) setTujuanKarir(tujuanKarirData.data) // Set career goals state
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStudent = async (nis: string) => {
    if (!confirm("Yakin ingin menghapus siswa ini?")) return;

    try {
      const response = await fetch(`/api/admin/siswa/${nis}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || "Gagal menghapus siswa");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Terjadi kesalahan");
    }
  };

  const handleDeleteKonseling = async (id: string) => {
    if (!confirm("Yakin ingin menghapus konseling ini?")) return;

    try {
      const response = await fetch(`/api/admin/konseling/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || "Gagal menghapus konseling");
      }
    } catch (error) {
      console.error("Error deleting konseling:", error);
      alert("Terjadi kesalahan");
    }
  };

  const handleDeleteTujuanKarir = async (id: string) => {
    if (!confirm("Yakin ingin menghapus tujuan karir ini?")) return;

    try {
      const response = await fetch(`/api/admin/tujuan-karir?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchDashboardData();
      } else {
        alert(data.message || "Gagal menghapus tujuan karir");
      }
    } catch (error) {
      console.error("Error deleting career goal:", error);
      alert("Terjadi kesalahan");
    }
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
            </div>
            <p className="text-slate-600 text-sm">Kelola sistem konseling karir SMK ITXPRO</p>
          </div>
          <div className="flex gap-2">
            <PremiumButton onClick={() => router.push('/')} variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </PremiumButton>
            <PremiumButton onClick={() => signOut({ callbackUrl: "/auth/admin" })} variant="secondary" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </PremiumButton>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <QuickActions fetchDashboardData={fetchDashboardData} />

            {/* Recent Activity */}
            <RecentActivity konseling={konseling} />
          </div>
        )}

        {activeTab === "students" && (
          <StudentList
            students={students}
            fetchDashboardData={fetchDashboardData}
            handleDeleteStudent={handleDeleteStudent}
          />
        )}

        {activeTab === "konseling" && (
          <KonselingList
            konseling={konseling}
            fetchDashboardData={fetchDashboardData}
            handleDeleteKonseling={handleDeleteKonseling}
          />
        )}

        {activeTab === "career" && (
          <CareerManagement
            tujuanKarir={tujuanKarir}
            fetchDashboardData={fetchDashboardData}
            handleDeleteTujuanKarir={handleDeleteTujuanKarir}
          />
        )}

        {activeTab === "statistics" && (
          <StatisticsView />
        )}
      </div>
    </div>
  )
}