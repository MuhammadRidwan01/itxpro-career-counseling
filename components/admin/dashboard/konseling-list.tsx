"use client"

import { Search, Filter, Plus, UsersIcon, Edit, Trash2, X } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { KonselingModal } from "@/components/admin/konseling-modal"
import { KonselingBatchModal } from "@/components/admin/konseling-batch-modal"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"

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

interface KonselingListProps {
  fetchDashboardData: () => void
}

export function KonselingList({ fetchDashboardData }: KonselingListProps) {
  const [konseling, setKonseling] = useState<Konseling[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [filterKategori, setFilterKategori] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showKonselingModal, setShowKonselingModal] = useState(false)
  const [showKonselingBatchModal, setShowKonselingBatchModal] = useState(false)
  const [selectedKonseling, setSelectedKonseling] = useState<Konseling | null>(null)

  const fetchKonseling = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (debouncedSearchTerm) queryParams.append("search", debouncedSearchTerm)
      if (filterKategori !== "all") queryParams.append("kategori", filterKategori)
      if (filterStatus !== "all") queryParams.append("status", filterStatus)

      const response = await fetch(`/api/admin/konseling?${queryParams.toString()}`)
      const data = await response.json()
      if (data.success) {
        setKonseling(data.data.konseling)
      } else {
        setError(data.message || "Gagal memuat data konseling.")
      }
    } catch (err) {
      console.error("Error fetching konseling:", err)
      setError("Terjadi kesalahan saat memuat data konseling.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKonseling()
  }, [debouncedSearchTerm, filterKategori, filterStatus])

  const handleDeleteKonseling = async (id: string) => {
    if (!confirm("Yakin ingin menghapus konseling ini?")) return;

    try {
      const response = await fetch(`/api/admin/konseling/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchKonseling(); // Re-fetch konseling after deletion
        fetchDashboardData(); // Update dashboard stats if needed
      } else {
        alert(data.message || "Gagal menghapus konseling");
      }
    } catch (error) {
      console.error("Error deleting konseling:", error);
      alert("Terjadi kesalahan");
    }
  };

  const konselingKategoris = [
    { label: "Semua Kategori", value: "all" },
    { label: "Akademik", value: "akademik" },
    { label: "Pribadi", value: "pribadi" },
    { label: "Sosial", value: "sosial" },
    { label: "Karir", value: "karir" },
  ]

  const konselingStatuses = [
    { label: "Semua Status", value: "all" },
    { label: "Selesai", value: "SUDAH" },
    { label: "Belum Selesai", value: "BELUM" },
  ]

  const renderStatusBadge = (status: "SUDAH" | "BELUM") => {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          status === "SUDAH"
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
        }`}
      >
        {status === "SUDAH" ? "✓ Selesai" : "⏳ Belum Selesai"}
      </div>
    )
  }

  return (
    <>
      <GlassCard className="shadow-sm overflow-hidden">
        {/* Header & Search */}
        <div className="p-6 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Data Konseling ({konseling.length})
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <PremiumButton
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden"
                variant="ghost"
                size="sm"
              >
                <Filter className="w-4 h-4" />
                Filter
              </PremiumButton>
              <div className="flex gap-2">
                <PremiumButton
                  onClick={() => {
                    setSelectedKonseling(null)
                    setShowKonselingModal(true)
                  }}
                  variant="primary"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Tambah</span>
                </PremiumButton>
                <PremiumButton
                  onClick={() => setShowKonselingBatchModal(true)}
                  variant="primary"
                  size="sm"
                >
                  <UsersIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Batch</span>
                </PremiumButton>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`mt-4 space-y-3 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari konseling..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-800"
                />
                {searchTerm && (
                  <PremiumButton
                    onClick={() => setSearchTerm("")}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </PremiumButton>
                )}
              </div>
              <div className="flex gap-2">
                {konselingKategoris.map((kategoriOption) => (
                  <PremiumButton
                    key={kategoriOption.value}
                    onClick={() => setFilterKategori(kategoriOption.value)}
                    variant={filterKategori === kategoriOption.value ? "primary" : "secondary"}
                    size="sm"
                    className={`${filterKategori === kategoriOption.value ? "bg-emerald-500 text-white" : "bg-white/20 text-slate-700 hover:bg-white/30"}`}
                  >
                    {kategoriOption.label}
                  </PremiumButton>
                ))}
              </div>
              <div className="flex gap-2">
                {konselingStatuses.map((statusOption) => (
                  <PremiumButton
                    key={statusOption.value}
                    onClick={() => setFilterStatus(statusOption.value)}
                    variant={filterStatus === statusOption.value ? "primary" : "secondary"}
                    size="sm"
                    className={`${filterStatus === statusOption.value ? "bg-emerald-500 text-white" : "bg-white/20 text-slate-700 hover:bg-white/30"}`}
                  >
                    {statusOption.label}
                  </PremiumButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="sm:hidden"
        >
          {konseling.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-4 border-b border-white/20 last:border-b-0 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-800 truncate">{item.siswa.nama}</h4>
                  <p className="text-sm text-slate-600">{item.nisSiswa} • {item.siswa.kelasSaatIni}</p>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <PremiumButton
                    onClick={() => {
                      setSelectedKonseling(item)
                      setShowKonselingModal(true)
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </PremiumButton>
                  <PremiumButton
                    onClick={() => handleDeleteKonseling(item.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </PremiumButton>
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
                    <span className="text-xs text-slate-500">Status:</span>
                    {renderStatusBadge(item.status)}
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{item.hasilText}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                {["Siswa", "Tanggal", "Kategori", "Status", "Hasil", "Aksi"].map((header) => (
                  <th key={header} className="text-left py-3 px-4 font-medium text-slate-700 text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {konseling.map((item) => (
                <tr key={item.id} className="border-b border-white/20 hover:bg-white/10 transition-colors">
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
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 max-w-xs">
                    <p className="truncate">{item.hasilText}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <PremiumButton
                        onClick={() => {
                          setSelectedKonseling(item)
                          setShowKonselingModal(true)
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 text-slate-600" />
                      </PremiumButton>
                      <PremiumButton
                        onClick={() => handleDeleteKonseling(item.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </PremiumButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

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
    </>
  )
}