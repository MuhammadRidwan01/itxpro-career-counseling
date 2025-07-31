"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import {
  Users,
  GraduationCap,
  TrendingUp,
  FileText,
  Plus,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      const data = await response.json()
      if (data.success) {
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") return <div>Loading...</div>
  if (!session || session.user.role !== "ADMIN") redirect("/auth/admin")

  // Mock data - replace with real API calls
  const stats = dashboardData?.stats || {
    totalSiswa: 0,
    siswaAktif: 0,
    konseling: 0,
    tujuanKarir: 0,
  }

  const chartData = dashboardData?.charts || {
    tujuanKarir: [],
    konselingBulanan: [],
    distribusiAngkatan: [],
  }

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
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
            <p className="text-white/80">Selamat datang, {session.user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <PremiumButton variant="secondary" size="sm">
              <Download className="w-4 h-4" />
              Export Data
            </PremiumButton>
            <PremiumButton size="sm">
              <Plus className="w-4 h-4" />
              Tambah Siswa
            </PremiumButton>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: "Total Siswa", value: stats.totalSiswa, icon: Users, color: "from-blue-500 to-blue-600" },
            {
              title: "Siswa Aktif",
              value: stats.siswaAktif,
              icon: GraduationCap,
              color: "from-green-500 to-green-600",
            },
            { title: "Konseling", value: stats.konseling, icon: FileText, color: "from-purple-500 to-purple-600" },
            { title: "Tujuan Karir", value: stats.tujuanKarir, icon: TrendingUp, color: "from-gold-500 to-gold-600" },
          ].map((stat, index) => (
            <GlassCard key={stat.title} hover className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-nude-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-nude-800 mt-1">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          ))}
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
                { id: "overview", label: "Overview" },
                { id: "siswa", label: "Data Siswa" },
                { id: "konseling", label: "Konseling" },
                { id: "analytics", label: "Analytics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id ? "bg-gradient-button text-white shadow-lg" : "text-nude-700 hover:bg-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart - Tujuan Karir */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-nude-800 mb-4">Distribusi Tujuan Karir</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.tujuanKarir}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.tujuanKarir.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Line Chart - Konseling Bulanan */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-nude-800 mb-4">Konseling per Bulan</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.konselingBulanan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 91, 115, 0.2)" />
                    <XAxis dataKey="bulan" stroke="#6B5B73" />
                    <YAxis stroke="#6B5B73" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line type="monotone" dataKey="jumlah" stroke="#D4AF37" strokeWidth={3} dot={{ fill: "#D4AF37" }} />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </div>
          )}

          {activeTab === "siswa" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nude-500" />
                    <input
                      type="text"
                      placeholder="Cari siswa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <PremiumButton variant="secondary" size="sm">
                      <Filter className="w-4 h-4" />
                      Filter
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="sm">
                      <Upload className="w-4 h-4" />
                      Import Excel
                    </PremiumButton>
                    <PremiumButton size="sm">
                      <Plus className="w-4 h-4" />
                      Tambah Siswa
                    </PremiumButton>
                  </div>
                </div>
              </GlassCard>

              {/* Students Table */}
              <GlassCard className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">NIS</th>
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">Kelas</th>
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">Angkatan</th>
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-nude-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mock data - replace with real data */}
                      {[
                        { nis: "252610001", nama: "Ahmad Rizki", kelas: "XII RPL 1", angkatan: 2025, status: "Aktif" },
                        {
                          nis: "252610002",
                          nama: "Siti Nurhaliza",
                          kelas: "XII DKV 1",
                          angkatan: 2025,
                          status: "Aktif",
                        },
                        {
                          nis: "232410001",
                          nama: "Budi Santoso",
                          kelas: "XII TKJ 1",
                          angkatan: 2023,
                          status: "Alumni",
                        },
                      ].map((siswa, index) => (
                        <tr key={siswa.nis} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-nude-800 font-mono">{siswa.nis}</td>
                          <td className="py-3 px-4 text-nude-800 font-medium">{siswa.nama}</td>
                          <td className="py-3 px-4 text-nude-600">{siswa.kelas}</td>
                          <td className="py-3 px-4 text-nude-600">{siswa.angkatan}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                siswa.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {siswa.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-nude-600" />
                              </button>
                              <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-nude-600" />
                              </button>
                              <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
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
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart - Distribusi Angkatan */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-nude-800 mb-4">Distribusi per Angkatan</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.distribusiAngkatan}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 91, 115, 0.2)" />
                    <XAxis dataKey="angkatan" stroke="#6B5B73" />
                    <YAxis stroke="#6B5B73" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="jumlah" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Additional Analytics Card */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-nude-800 mb-4">Statistik Lainnya</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-nude-700">Tingkat Partisipasi Konseling</span>
                    <span className="font-bold text-nude-800">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-nude-700">Tujuan Karir Terisi</span>
                    <span className="font-bold text-nude-800">64%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-nude-700">Rating Konseling Rata-rata</span>
                    <span className="font-bold text-nude-800">4.2/5</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
