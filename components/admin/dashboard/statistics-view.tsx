"use client"

import { useState, useEffect } from "react"
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
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
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

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailModalDataType, setDetailModalDataType] = useState<DetailModalDataType>("siswa")
  const [detailModalFilterParams, setDetailModalFilterParams] = useState<{ [key: string]: string | undefined }>({})

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (startDate) params.append("startDate", startDate.toISOString())
      if (endDate) params.append("endDate", endDate.toISOString())
      if (selectedClass && selectedClass !== "all") params.append("kelasSaatIni", selectedClass)
      if (selectedKonselingCategory && selectedKonselingCategory !== "all") params.append("konselingCategory", selectedKonselingCategory)
      if (selectedTujuanKarirCategory && selectedTujuanKarirCategory !== "all") params.append("tujuanKarirCategory", selectedTujuanKarirCategory)

      const response = await fetch(`/api/admin/konseling/stats?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.success) {
        setStats(result.data)
      } else {
        setError(result.message || "Failed to fetch statistics")
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [startDate, endDate, selectedClass, selectedKonselingCategory, selectedTujuanKarirCategory])

  const handleApplyFilters = () => {
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
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Loading statistics...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>No statistics data available.</p>
        </CardContent>
      </Card>
    )
  }

  const chartConfigKonseling = stats.konselingByCategory.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: `hsl(var(--chart-${Math.floor(Math.random() * 12) + 1}))`,
    }
    return acc
  }, {} as any)

  const chartConfigTujuanKarir = stats.tujuanKarirByCategory.reduce((acc, item) => {
    acc[item.category] = {
      label: item.category,
      color: `hsl(var(--chart-${Math.floor(Math.random() * 12) + 1}))`,
    }
    return acc
  }, {} as any)

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Data</CardTitle>
          <CardDescription>Pilih rentang tanggal atau kelas untuk memfilter data statistik.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="grid gap-2">
            <label htmlFor="startDate" className="text-sm font-medium">Tanggal Mulai</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label htmlFor="endDate" className="text-sm font-medium">Tanggal Akhir</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label htmlFor="classFilter" className="text-sm font-medium">Filter Kelas</label>
            <Select onValueChange={setSelectedClass} value={selectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {stats.availableClasses.map((kelas) => (
                  <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="konselingCategoryFilter" className="text-sm font-medium">Filter Kategori Konseling</label>
            <Select onValueChange={setSelectedKonselingCategory} value={selectedKonselingCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {stats.availableKonselingCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="tujuanKarirCategoryFilter" className="text-sm font-medium">Filter Kategori Karir</label>
            <Select onValueChange={setSelectedTujuanKarirCategory} value={selectedTujuanKarirCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {stats.availableTujuanKarirCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleApplyFilters}>Terapkan Filter</Button>
          <Button variant="outline" onClick={() => {
            setStartDate(undefined)
            setEndDate(undefined)
            setSelectedClass(undefined)
            setSelectedKonselingCategory(undefined)
            setSelectedTujuanKarirCategory(undefined)
          }}>Reset Filter</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overview Statistik</CardTitle>
          <CardDescription>Ringkasan data konseling dan tujuan karir.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold">{stats.totalKonseling}</h3>
            <p className="text-sm text-muted-foreground">Total Konseling</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold">{stats.totalTujuanKarir}</h3>
            <p className="text-sm text-muted-foreground">Total Tujuan Karir</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold">{stats.studentsNotSubmittedTujuanKarir}</h3>
            <p className="text-sm text-muted-foreground">Siswa Belum Isi Tujuan Karir</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Konseling Berdasarkan Kategori</CardTitle>
            <CardDescription>Jumlah konseling per kategori.</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.konselingByCategory.length > 0 ? (
              <ChartContainer config={chartConfigKonseling} className="min-h-[300px] w-full">
                <BarChart accessibilityLayer data={stats.konselingByCategory}>
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
                    fill="var(--color-category)"
                    radius={8}
                    fillOpacity={0.6}
                    className="stroke-primary"
                    onClick={(data) => handleBarClick(data, "konseling", "category")}
                  />
                  <ChartLegend content={<ChartLegendContent payload={stats.konselingByCategory.map(item => ({ value: item.category, type: 'square', color: chartConfigKonseling[item.category]?.color }))} />} />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground">Tidak ada data konseling berdasarkan kategori.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tujuan Karir Berdasarkan Kategori</CardTitle>
            <CardDescription>Distribusi tujuan karir siswa.</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.tujuanKarirByCategory.length > 0 ? (
              <ChartContainer config={chartConfigTujuanKarir} className="min-h-[300px] w-full">
                <BarChart accessibilityLayer data={stats.tujuanKarirByCategory}>
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
                    fill="var(--color-category)"
                    radius={8}
                    fillOpacity={0.6}
                    className="stroke-primary"
                    onClick={(data) => handleBarClick(data, "tujuanKarir", "category")}
                  />
                  <ChartLegend content={<ChartLegendContent payload={stats.tujuanKarirByCategory.map(item => ({ value: item.category, type: 'square', color: chartConfigTujuanKarir[item.category]?.color }))} />} />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground">Tidak ada data tujuan karir berdasarkan kategori.</p>
            )}
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Total Konseling per Kelas</CardTitle>
            <CardDescription>Jumlah siswa yang telah melakukan konseling per kelas.</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(konselingStatsByClass).length > 0 ? (
              <ChartContainer config={{}} className="min-h-[300px] w-full">
                <BarChart
                  accessibilityLayer
                  data={Object.entries(konselingStatsByClass).map(([kelas, data]) => ({
                    kelas,
                    totalStudents: data.totalStudents,
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
                    fill="hsl(var(--chart-1))"
                    radius={8}
                    fillOpacity={0.6}
                    className="stroke-primary"
                    onClick={(data) => handleKonselingClassClick(data)}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-center text-muted-foreground">Tidak ada data konseling per kelas.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Siswa Belum Mengisi Tujuan Karir</CardTitle>
          <CardDescription>Daftar siswa yang belum mengisi tujuan karir, dikelompokkan berdasarkan kelas.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(stats.studentsNotSubmittedByClass).length > 0 ? (
            Object.entries(stats.studentsNotSubmittedByClass).map(([kelas, data]) => (
              <div key={kelas} className="mb-4 p-4 border rounded-lg cursor-pointer hover:bg-slate-50" onClick={() => handleClassNotSubmittedClick(kelas)}>
                <h4 className="text-lg font-semibold mb-2">Kelas: {kelas} <Badge variant="secondary">{data.percentage}% Belum Mengisi</Badge></h4>
                {data.students.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.students.map((student) => (
                      <li key={student.nis}>
                        {student.nama} ({student.nis})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Semua siswa di kelas ini sudah mengisi tujuan karir.</p>
                )}
                <Separator className="my-2" />
                <p>Jumlah siswa belum mengisi: {data.count}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">Semua siswa sudah mengisi tujuan karir.</p>
          )}
        </CardContent>
      </Card>

      <DetailListModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        dataType={detailModalDataType}
        filterParams={detailModalFilterParams}
      />
    </div>
  )
}