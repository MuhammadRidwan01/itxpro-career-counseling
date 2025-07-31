"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Users, Calendar, TrendingUp, Star } from "lucide-react"

interface KonselingStats {
  totalKonseling: number
  konselingBulanIni: number
  rataRataRating: number
  kategoriTerpopuler: string
  siswaUnik: number
}

export function KonselingStats() {
  const [stats, setStats] = useState<KonselingStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/konseling/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error("Error fetching konseling stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <GlassCard key={i} className="p-4 animate-pulse">
            <div className="h-16 bg-white/20 rounded"></div>
          </GlassCard>
        ))}
      </div>
    )
  }

  if (!stats) return null

  const statCards = [
    {
      title: "Total Konseling",
      value: stats.totalKonseling,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Bulan Ini",
      value: stats.konselingBulanIni,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Siswa Unik",
      value: stats.siswaUnik,
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Rata-rata Rating",
      value: stats.rataRataRating.toFixed(1),
      icon: Star,
      color: "from-gold-500 to-gold-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <GlassCard key={stat.title} hover className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nude-600 text-sm font-medium">{stat.title}</p>
              <p className="text-xl font-bold text-nude-800 mt-1">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
