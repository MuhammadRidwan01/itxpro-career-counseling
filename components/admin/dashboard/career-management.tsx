"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Search, Filter, Trash2, X, Eye } from "lucide-react" // Tambahkan ikon Eye
import { PremiumButton } from "@/components/ui/premium-button"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"
import { CareerDetailModal } from "@/components/admin/career-detail-modal" // Import modal

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

interface CareerManagementProps {
  tujuanKarir: TujuanKarir[]
  fetchDashboardData: () => void
  handleDeleteTujuanKarir: (id: string) => void
}

export function CareerManagement({ tujuanKarir, fetchDashboardData, handleDeleteTujuanKarir }: CareerManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search term
  const [filterKategori, setFilterKategori] = useState("all")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false) // State untuk modal detail
  const [selectedTujuanKarir, setSelectedTujuanKarir] = useState<TujuanKarir | null>(null) // State untuk data yang dipilih

  const filteredTujuanKarir = tujuanKarir.filter(
    (item) => {
      const matchesSearch =
        item.siswa.nama.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.nisSiswa.includes(debouncedSearchTerm) ||
        item.kategoriUtama.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (item.ptn1 && item.ptn1.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        (item.jurusan1 && item.jurusan1.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      
      const matchesKategori = filterKategori === "all" || 
                              (filterKategori === "melanjutkan" && (item.kategoriUtama.toLowerCase() === "melanjutkan" || item.kategoriUtama.toLowerCase() === "kuliah")) ||
                              (item.kategoriUtama.toLowerCase() === filterKategori.toLowerCase())

      return matchesSearch && matchesKategori
    }
  )

  const kategoriOptions = [
    { label: "Semua Kategori", value: "all" },
    { label: "Kuliah", value: "melanjutkan" },
    { label: "Bekerja", value: "bekerja" },
    { label: "Wirausaha", value: "wirausaha" },
  ]

  return (
    <>
      <GlassCard className="shadow-sm overflow-hidden">
        {/* Header & Search */}
        <div className="p-6 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Data Tujuan Karir ({filteredTujuanKarir.length})
            </h3>
            <PremiumButton
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden"
              variant="ghost"
              size="sm"
            >
              <Filter className="w-4 h-4" />
              Filter
            </PremiumButton>
          </div>

          {/* Search and Filters */}
          <div className={`mt-4 space-y-3 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari tujuan karir..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-slate-800"
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
                {kategoriOptions.map((kategoriOption) => (
                  <PremiumButton
                    key={kategoriOption.value}
                    onClick={() => setFilterKategori(kategoriOption.value)}
                    variant={filterKategori === kategoriOption.value ? "primary" : "secondary"}
                    size="sm"
                    className={`${filterKategori === kategoriOption.value ? "bg-purple-500 text-white" : "bg-white/20 text-slate-700 hover:bg-white/30"}`}
                  >
                    {kategoriOption.label}
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
          {filteredTujuanKarir.map((item) => (
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
                      setSelectedTujuanKarir(item)
                      setShowDetailModal(true)
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 text-slate-600" />
                  </PremiumButton>
                  <PremiumButton
                    onClick={() => handleDeleteTujuanKarir(item.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </PremiumButton>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Kategori:</span>
                  <span className="ml-1 text-slate-700 font-medium">{item.kategoriUtama === "melanjutkan" ? "Kuliah" : item.kategoriUtama}</span>
                </div>
                {item.kategoriUtama === "melanjutkan" && (
                  <>
                    {item.ptn1 && (
                      <div>
                        <span className="text-slate-500">PTN 1:</span>
                        <span className="ml-1 text-slate-700">{item.ptn1} - {item.jurusan1}</span>
                      </div>
                    )}
                    {item.ptn2 && (
                      <div>
                        <span className="text-slate-500">PTN 2:</span>
                        <span className="ml-1 text-slate-700">{item.ptn2} - {item.jurusan2}</span>
                      </div>
                    )}
                    {item.ptn3 && (
                      <div>
                        <span className="text-slate-500">PTN 3:</span>
                        <span className="ml-1 text-slate-700">{item.ptn3} - {item.jurusan3}</span>
                      </div>
                    )}
                  </>
                )}
                {item.detailBekerja && (
                  <div>
                    <span className="text-slate-500">Bekerja:</span>
                    <span className="ml-1 text-slate-700 line-clamp-1">{item.detailBekerja}</span>
                  </div>
                )}
                {item.detailWirausaha && (
                  <div>
                    <span className="text-slate-500">Wirausaha:</span>
                    <span className="ml-1 text-slate-700 line-clamp-1">{item.detailWirausaha}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                {["Siswa", "Kategori Utama", "Detail Karir", "Aksi"].map((header) => (
                  <th key={header} className="text-left py-3 px-4 font-medium text-slate-700 text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTujuanKarir.map((item) => (
                <tr key={item.id} className="border-b border-white/20 hover:bg-white/10 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{item.siswa.nama}</p>
                      <p className="text-xs text-slate-600">{item.nisSiswa} • {item.siswa.kelasSaatIni}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      item.kategoriUtama === "melanjutkan" ? "bg-blue-100 text-blue-700" :
                      item.kategoriUtama === "bekerja" ? "bg-green-100 text-green-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.kategoriUtama === "melanjutkan" ? "Kuliah" : item.kategoriUtama}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 max-w-xs">
                    {item.kategoriUtama === "melanjutkan" && (
                      <div className="space-y-0.5">
                        {item.ptn1 && <p className="truncate">{item.ptn1} - {item.jurusan1}</p>}
                        {item.ptn2 && <p className="truncate">{item.ptn2} - {item.jurusan2}</p>}
                        {item.ptn3 && <p className="truncate">{item.ptn3} - {item.jurusan3}</p>}
                      </div>
                    )}
                    {item.kategoriUtama === "bekerja" && (
                      <p className="truncate">{item.detailBekerja || "-"}</p>
                    )}
                    {item.kategoriUtama === "wirausaha" && (
                      <p className="truncate">{item.detailWirausaha || "-"}</p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <PremiumButton
                        onClick={() => {
                          setSelectedTujuanKarir(item)
                          setShowDetailModal(true)
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 text-slate-600" />
                      </PremiumButton>
                      <PremiumButton
                        onClick={() => handleDeleteTujuanKarir(item.id)}
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

      <CareerDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedTujuanKarir(null)
        }}
        tujuanKarir={selectedTujuanKarir}
      />
    </>
  )
}