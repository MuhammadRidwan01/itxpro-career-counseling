"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, TrendingUp, BookOpen } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
}

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <motion.div variants={cardVariants}>
        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Siswa</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalSiswa}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Konseling</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalKonseling}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Tujuan Karir</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalTujuanKarir}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Siswa Aktif</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.siswaAktif}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}