"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, TrendingUp, Target, Clock, Filter, X, BarChart3, CheckCircle, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { DetailListModal } from "@/components/admin/detail-list-modal"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"

interface KonselingCategoryStat {
  category: string
  count: number
}

interface TujuanKarirCategoryStat {
  category: string
  count: number
}

interface StudentNotSubmitted {
  nis: string
  nama: string
  kelasSaatIni: string
}

interface StudentsNotSubmittedByClass {
  [key: string]: {
    students: { nis: string; nama: string }[]
    count: number
    percentage: number
  }
}

interface StatsData {
  totalKonseling: number
  konselingByCategory: KonselingCategoryStat[]
  totalTujuanKarir: number
  tujuanKarirByCategory: TujuanKarirCategoryStat[]
  studentsNotSubmittedTujuanKarir: number
  studentsNotSubmittedDetails: StudentNotSubmitted[]
  studentsNotSubmittedByClass: StudentsNotSubmittedByClass
  availableClasses: string[]
  availableKonselingCategories: string[]
  availableTujuanKarirCategories: string[]
  konselingStatsByClass: { [key: string]: { totalStudents: number } } // New
}

interface StatisticsViewProps {
  konselingStatsByClass: { [key: string]: { totalStudents: number } }
}

type DetailModalDataType = "siswa" | "konseling" | "tujuanKarir"

export function StatisticsView({ konselingStatsByClass }: StatisticsViewProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined)
  const [selectedKonselingCategory, setSelectedKonselingCategory] = useState<string | undefined>(undefined)
  const [selectedTujuanKarirCategory, setSelectedTujuanKarirCategory] = useState<string | undefined>(undefined)
  const [dateError, setDateError] = useState<string | null>(null)

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailModalDataType, setDetailModalDataType] = useState<DetailModalDataType>("siswa")
  const [detailModalFilterParams, setDetailModalFilterParams] = useState<{ [key: string]: string | undefined }>({})

  const validateDates = (start: Date | undefined, end: Date | undefined): boolean => {
    if (!start || !end) return true

    const startDateTime = start.getTime()
    const endDateTime = end.getTime()

    if (endDateTime < startDateTime) {
      setDateError("Tanggal akhir tidak boleh kurang dari tanggal mulai")
      return false
    }

    // Validasi rentang maksimal 1 tahun
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000
    if (endDateTime - startDateTime > oneYearInMs) {
      setDateError("Rentang tanggal maksimal 1 tahun")
      return false
    }

    setDateError(null)
    return true
  }

  const isFilterValid = () => {
    if (!startDate || !endDate) return true
    return validateDates(startDate, endDate)
  }

  const fetchStats = async () => {
    // Validasi tanggal sebelum fetch
    if (!isFilterValid()) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()

      // Tambahkan parameter dengan validasi
      if (startDate) {
        const startOfDay = new Date(startDate)
        startOfDay.setHours(0, 0, 0, 0)
        params.append("startDate", startOfDay.toISOString())
      }

      if (endDate) {
        const endOfDay = new Date(endDate)
        endOfDay.setHours(23, 59, 59, 999)
        params.append("endDate", endOfDay.toISOString())
      }

      if (selectedClass && selectedClass !== "all") {
        params.append("kelasSaatIni", selectedClass)
      }

      if (selectedKonselingCategory && selectedKonselingCategory !== "all") {
        params.append("konselingCategory", selectedKonselingCategory)
      }

      if (selectedTujuanKarirCategory && selectedTujuanKarirCategory !== "all") {
        params.append("tujuanKarirCategory", selectedTujuanKarirCategory)
      }

      console.log("Filter params:", params.toString()) // Debug log

      const response = await fetch(`/api/admin/konseling/stats?${params.toString()}`)

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Parameter filter tidak valid")
        } else if (response.status === 404) {
          throw new Error("Data tidak ditemukan dengan filter yang dipilih")
        } else if (response.status === 500) {
          throw new Error("Terjadi kesalahan pada server")
        } else {
          const errorData = await response.json()
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
      }

      const result = await response.json()

      if (!result || typeof result !== 'object') {
        throw new Error("Response tidak valid dari server")
      }

      if (result.success) {
        if (!result.data || typeof result.data !== 'object') {
          throw new Error("Data statistik tidak valid")
        }

        // Validasi struktur data yang diharapkan
        const data = result.data
        if (typeof data.totalKonseling !== 'number' ||
            typeof data.totalTujuanKarir !== 'number' ||
            typeof data.studentsNotSubmittedTujuanKarir !== 'number') {
          throw new Error("Struktur data statistik tidak valid")
        }

        // Validasi array data
        if (!Array.isArray(data.konselingByCategory) ||
            !Array.isArray(data.tujuanKarirByCategory) ||
            !Array.isArray(data.availableClasses)) {
          throw new Error("Data array tidak valid")
        }

        // Validasi object data
        if (typeof data.studentsNotSubmittedByClass !== 'object' ||
            data.studentsNotSubmittedByClass === null) {
          throw new Error("Data siswa tidak valid")
        }

        setStats(result.data)
      } else {
        setError(result.message || "Gagal mengambil data statistik")
      }
    } catch (e: any) {
      console.error("Fetch error:", e)
      setError(e.message || "Terjadi kesalahan saat mengambil data statistik")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Jangan fetch otomatis jika ada error tanggal
    if (dateError) return

    // Tambahkan debounce untuk mencegah multiple fetch saat user mengubah filter
    const timeoutId = setTimeout(() => {
      fetchStats()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [startDate, endDate, selectedClass, selectedKonselingCategory, selectedTujuanKarirCategory, dateError])

  const handleApplyFilters = () => {
    if (!isFilterValid()) {
      return
    }
    fetchStats()
  }

  const handleBarClick = (data: any, dataType: DetailModalDataType, categoryKey: string) => {
    setShowDetailModal(true)
    setDetailModalDataType(dataType)
    setDetailModalFilterParams({ [categoryKey]: data.payload.category })
  }

  const handleClassNotSubmittedClick = (kelas: string) => {
    setShowDetailModal(true)
    setDetailModalDataType("siswa")
    setDetailModalFilterParams({ kelasSaatIni: kelas, tujuanKarirSubmitted: "false" })
  }

  const handleKonselingClassClick = (data: any) => {
    setShowDetailModal(true)
    setDetailModalDataType("konseling") // Change to "konseling"
    setDetailModalFilterParams({ kelasSaatIni: data.kelas }) // Remove hasKonseling filter
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[400px] flex items-center justify-center"
      >
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-slate-600">Memuat statistik...</p>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[400px] flex items-center justify-center"
      >
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 font-medium">Error: {error}</p>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[400px] flex items-center justify-center"
      >
        <GlassCard className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-600">Tidak ada data statistik yang tersedia</p>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  
  const hasActiveFilters = startDate || endDate || selectedClass || selectedKonselingCategory || selectedTujuanKarirCategory

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date)
    if (date && endDate) {
      validateDates(date, endDate)
    } else {
      setDateError(null)
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date)
    if (startDate && date) {
      validateDates(startDate, date)
    } else {
      setDateError(null)
    }
  }

  const clearAllFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setSelectedClass(undefined)
    setSelectedKonselingCategory(undefined)
    setSelectedTujuanKarirCategory(undefined)
    setDateError(null)
  }

  const overviewCards = [
    {
      title: "Total Konseling",
      value: stats?.totalKonseling || 0,
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10"
    },
    {
      title: "Total Tujuan Karir",
      value: stats?.totalTujuanKarir || 0,
      icon: Target,
      color: "from-purple-500 to-pink-600",
      bgGlow: "bg-purple-500/10"
    },
    {
      title: "Siswa Belum Isi",
      value: stats?.studentsNotSubmittedTujuanKarir || 0,
      icon: Users,
      color: "from-orange-500 to-red-600",
      bgGlow: "bg-orange-500/10"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header with Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Statistik Konseling</h2>
                <p className="text-slate-600 text-sm">Analisis data konseling dan tujuan karir</p>
              </div>
            </div>
            {hasActiveFilters && (
              <PremiumButton
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Hapus Filter
              </PremiumButton>
            )}
          </div>

          {/* Error Message */}
          {dateError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-700">
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">{dateError}</span>
              </div>
            </motion.div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-blue-700">Filter Aktif:</span>
                {startDate && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Mulai: {format(startDate, "dd/MM/yyyy")}
                  </Badge>
                )}
                {endDate && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Akhir: {format(endDate, "dd/MM/yyyy")}
                  </Badge>
                )}
                {selectedClass && selectedClass !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Kelas: {selectedClass}
                  </Badge>
                )}
                {selectedKonselingCategory && selectedKonselingCategory !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Konseling: {selectedKonselingCategory}
                  </Badge>
                )}
                {selectedTujuanKarirCategory && selectedTujuanKarirCategory !== "all" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Karir: {selectedTujuanKarirCategory}
                  </Badge>
                )}
              </div>
            </motion.div>
          )}

          {/* Advanced Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tanggal Mulai</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/80 border-white/20 backdrop-blur-sm",
                      !startDate && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                    disabled={(date) => endDate ? date > endDate : false}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tanggal Akhir</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/80 border-white/20 backdrop-blur-sm",
                      !endDate && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                    disabled={(date) => startDate ? date < startDate : false}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Filter Kelas</label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger className="bg-white/80 border-white/20 backdrop-blur-sm">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  {stats?.availableClasses?.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori Konseling</label>
              <Select onValueChange={setSelectedKonselingCategory} value={selectedKonselingCategory}>
                <SelectTrigger className="bg-white/80 border-white/20 backdrop-blur-sm">
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {stats?.availableKonselingCategories?.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kategori Karir</label>
              <Select onValueChange={setSelectedTujuanKarirCategory} value={selectedTujuanKarirCategory}>
                <SelectTrigger className="bg-white/80 border-white/20 backdrop-blur-sm">
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {stats?.availableTujuanKarirCategories?.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <PremiumButton
                onClick={handleApplyFilters}
                className="flex-1"
                size="md"
                disabled={dateError !== null || loading}
              >
                <Filter className="w-4 h-4 mr-2" />
                {loading ? "Memproses..." : "Terapkan Filter"}
              </PremiumButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {overviewCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard
              className={`p-6 hover:scale-105 transition-all duration-300 cursor-pointer ${card.bgGlow}`}
              hover
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className={`w-3 h-3 rounded-full ${card.bgGlow.replace('bg-', 'bg-').replace('/10', '')}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{card.value}</h3>
              <p className="text-slate-600 text-sm">{card.title}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Konseling by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Konseling Berdasarkan Kategori</h3>
                <p className="text-sm text-slate-600">Analisis konseling per kategori</p>
              </div>
            </div>
            <div className="h-80">
              {stats?.konselingByCategory && stats.konselingByCategory.length > 0 ? (
                <ChartContainer config={{}} className="h-full w-full">
                  <BarChart accessibilityLayer data={stats.konselingByCategory || []}>
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <YAxis
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#gradientKonseling)"
                      radius={8}
                      fillOpacity={0.8}
                      className="cursor-pointer"
                      onClick={(data) => handleBarClick(data, "konseling", "category")}
                    >
                      {(stats.konselingByCategory || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 60%)`} />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="gradientKonseling" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                        <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-slate-500 text-center">Tidak ada data konseling berdasarkan kategori</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Tujuan Karir by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Tujuan Karir Berdasarkan Kategori</h3>
                <p className="text-sm text-slate-600">Distribusi tujuan karir siswa</p>
              </div>
            </div>
            <div className="h-80">
              {stats?.tujuanKarirByCategory && stats.tujuanKarirByCategory.length > 0 ? (
                <ChartContainer config={{}} className="h-full w-full">
                  <BarChart accessibilityLayer data={stats.tujuanKarirByCategory || []}>
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <YAxis
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#gradientTujuanKarir)"
                      radius={8}
                      fillOpacity={0.8}
                      className="cursor-pointer"
                      onClick={(data) => handleBarClick(data, "tujuanKarir", "category")}
                    >
                      {(stats.tujuanKarirByCategory || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 60%)`} />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="gradientTujuanKarir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-slate-500 text-center">Tidak ada data tujuan karir berdasarkan kategori</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Konseling per Class */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Total Konseling per Kelas</h3>
                <p className="text-sm text-slate-600">Jumlah konseling per kelas (berdasarkan filter)</p>
              </div>
            </div>
            <div className="h-80">
              {stats?.konselingStatsByClass && Object.keys(stats.konselingStatsByClass).length > 0 ? (
                <ChartContainer config={{}} className="h-full w-full">
                  <BarChart
                    accessibilityLayer
                    data={Object.entries(stats.konselingStatsByClass || {}).map(([kelas, data]) => ({
                      kelas,
                      totalStudents: data?.totalStudents || 0,
                    }))}
                  >
                    <XAxis
                      dataKey="kelas"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <YAxis
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      className="text-xs"
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="totalStudents"
                      fill="url(#gradientClass)"
                      radius={8}
                      fillOpacity={0.8}
                      className="cursor-pointer"
                      onClick={(data) => handleKonselingClassClick(data)}
                    >
                      {Object.entries(stats.konselingStatsByClass || {}).map(([kelas, data], index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 60%)`} />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="gradientClass" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)" />
                        <stop offset="100%" stopColor="rgba(20, 184, 166, 0.8)" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-slate-500 text-center">Tidak ada data konseling per kelas dengan filter yang dipilih</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Students Not Submitted Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Siswa Belum Mengisi Tujuan Karir</h3>
              <p className="text-sm text-slate-600">Daftar siswa yang belum mengisi tujuan karir</p>
            </div>
          </div>

          {stats?.studentsNotSubmittedByClass && Object.keys(stats.studentsNotSubmittedByClass).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.studentsNotSubmittedByClass || {}).map(([kelas, data]) => (
                <motion.div
                  key={kelas}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                  onClick={() => handleClassNotSubmittedClick(kelas)}
                >
                  <GlassCard
                    className={`p-4 hover:scale-105 transition-all duration-300 ${data.percentage > 50 ? 'bg-orange-500/10' : 'bg-blue-500/10'}`}
                    hover
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-800">{kelas}</h4>
                      <Badge variant={data.percentage && data.percentage > 50 ? "destructive" : "secondary"}>
                        {data.percentage || 0}% Belum Mengisi
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total Siswa:</span>
                        <span className="font-medium">{data.count || 0}</span>
                      </div>

                      {data.students && data.students.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-slate-500 mb-2">Siswa terdaftar:</p>
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {(data.students || []).slice(0, 3).map((student) => (
                              <div key={student.nis} className="flex items-center justify-between text-xs">
                                <span className="text-slate-700 truncate">{student.nama}</span>
                                <span className="text-slate-500">({student.nis})</span>
                              </div>
                            ))}
                            {data.students && data.students.length > 3 && (
                              <p className="text-xs text-slate-500">+{data.students.length - 3} lainnya...</p>
                            )}
                          </div>
                        </div>
                      )}

                      {(!data.students || data.students.length === 0) && (
                        <p className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Semua siswa sudah mengisi
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600">Semua siswa sudah mengisi tujuan karir</p>
            </div>
          )}
        </GlassCard>
      </motion.div>

      <DetailListModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        dataType={detailModalDataType}
        filterParams={detailModalFilterParams}
      />
    </div>
  )
}