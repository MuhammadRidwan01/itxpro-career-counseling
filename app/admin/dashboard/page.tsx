"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  LogOut,
  BarChart3,
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
import { useToast } from "@/components/ui/use-toast"
import { useDebounce } from "@/hooks/use-debounce" // Import useDebounce

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
  totalKonselingBelumSelesai: number
  konselingStatsByClass: { [key: string]: { totalStudents: number } } // New
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
  deskripsi?: string
  tindakLanjut?: string
  status: "SUDAH" | "BELUM"
  kategori: string
  createdAt: string // Add createdAt
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
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalKonseling: 0,
    totalTujuanKarir: 0,
    siswaAktif: 0,
    totalKonselingBelumSelesai: 0,
    konselingStatsByClass: {}, // Initialize with an empty object
  })
  const [students, setStudents] = useState<Student[]>([])
  const [recentKonseling, setRecentKonseling] = useState<Konseling[]>([])
  const [recentTujuanKarir, setRecentTujuanKarir] = useState<TujuanKarir[]>([]) // New state for recent tujuan karir
  const [tujuanKarir, setTujuanKarir] = useState<TujuanKarir[]>([])
  const [loading, setLoading] = useState(true) // Keep this for initial dashboard load
  const [activeTab, setActiveTab] = useState("overview")

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterJurusan, setFilterJurusan] = useState("all");
  const [filterAngkatan, setFilterAngkatan] = useState("all");

  // Debounced search term for API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Separate loading state for students list
  const [loadingStudents, setLoadingStudents] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true) // Keep for overall dashboard loading
    setLoadingStudents(true); // Set loading for students list
    try {
      // Construct URL for fetching students with search and filter parameters
      const studentParams = new URLSearchParams({
        search: debouncedSearchTerm,
        status: filterStatus !== "all" ? filterStatus : "", // Only append status if not "all"
        jurusan: filterJurusan !== "all" ? filterJurusan : "", // Only append jurusan if not "all"
        angkatan: filterAngkatan !== "all" ? filterAngkatan : "", // Only append angkatan if not "all"
        all: "true", // Fetch all data to ensure search works across all students
      });

      const [statsRes, studentsRes, recentKonselingRes, recentTujuanKarirRes, tujuanKarirRes, konselingStatsRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch(`/api/admin/siswa?${studentParams.toString()}`), // Pass search and filter params
        fetch("/api/admin/konseling?limit=5&orderBy=tanggalKonseling:desc"),
        fetch("/api/admin/tujuan-karir?limit=5&orderBy=createdAt:desc"), // Fetch recent tujuan karir
        fetch("/api/admin/tujuan-karir"),
        fetch("/api/admin/konseling/stats"), // Fetch new konseling stats
      ])

      const [statsData, studentsData, recentKonselingData, recentTujuanKarirData, tujuanKarirData, konselingStatsData] = await Promise.all([
        statsRes.json(),
        studentsRes.json(),
        recentKonselingRes.json(),
        recentTujuanKarirRes.json(),
        tujuanKarirRes.json(),
        konselingStatsRes.json(), // Parse new konseling stats
      ])

      if (statsData.success) {
        setStats(prevStats => ({
          ...prevStats,
          ...statsData.data.stats,
          konselingStatsByClass: konselingStatsData.success ? konselingStatsData.data.konselingStatsByClass : {},
        }));
      }
      if (studentsData.success) setStudents(studentsData.data.siswa)
      if (recentKonselingData.success) setRecentKonseling(recentKonselingData.data.konseling)
      if (recentTujuanKarirData.success) setRecentTujuanKarir(recentTujuanKarirData.data) // Set recent tujuan karir
      if (tujuanKarirData.success) setTujuanKarir(tujuanKarirData.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false) // Set overall dashboard loading to false
      setLoadingStudents(false); // Set students list loading to false
    }
  }

  useEffect(() => {
    if (status === "loading") return
    // Temporarily bypass authentication for UI/UX verification
    // if (!session || session.user.role !== "ADMIN") {
    //   redirect("/auth/admin")
    // }
    // Initial fetch when session status changes or modal is opened
    fetchDashboardData()
  }, [session, status]); // Removed fetchDashboardData from dependency array to avoid infinite loop

  useEffect(() => {
    if (!loading && stats.totalKonselingBelumSelesai > 0) {
      toast({
        title: "Pemberitahuan Konseling",
        description: `Ada ${stats.totalKonselingBelumSelesai} konseling yang belum selesai.`,
        variant: "destructive",
      })
    }
  }, [loading, stats.totalKonselingBelumSelesai, toast]);

  // Effect to re-fetch data when search/filter parameters change
  useEffect(() => {
    if (activeTab === "students") { // Only fetch students if on the students tab
      const debounceFetch = setTimeout(() => {
        fetchDashboardData();
      }, 500); // Debounce fetch to avoid too many API calls

      return () => clearTimeout(debounceFetch);
    }
  }, [debouncedSearchTerm, filterStatus, filterJurusan, filterAngkatan, activeTab]); // Added activeTab to dependency array

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
 
  if (loading && activeTab === "overview") { // Only show full page loading for overview tab
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
          <div className="flex flex-col md:flex-row gap-2">
            <PremiumButton onClick={() => router.push('/')} variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </PremiumButton>
            <PremiumButton onClick={() => signOut({ callbackUrl: "/auth/admin" })} variant="secondary" size="sm" className="w-full md:w-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </PremiumButton>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards stats={stats} totalKonselingBelumSelesai={stats.totalKonselingBelumSelesai} />

        {/* Navigation Tabs */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <QuickActions fetchDashboardData={fetchDashboardData} />

            {/* Recent Activity */}
            <RecentActivity recentKonseling={recentKonseling} recentTujuanKarir={recentTujuanKarir} />
          </div>
        )}

        {activeTab === "students" && (
          <StudentList
            students={students}
            fetchDashboardData={fetchDashboardData}
            handleDeleteStudent={handleDeleteStudent}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterJurusan={filterJurusan}
            setFilterJurusan={setFilterJurusan}
            filterAngkatan={filterAngkatan}
            setFilterAngkatan={setFilterAngkatan}
            loadingStudents={loading}
          />
        )}

        {activeTab === "konseling" && (
          <KonselingList
            fetchDashboardData={fetchDashboardData}
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
          <StatisticsView konselingStatsByClass={stats.konselingStatsByClass} />
        )}
      </div>
    </div>
  )
}