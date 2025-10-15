'use client'

import { motion, memo } from 'framer-motion'
import { Users, MessageSquare, TrendingUp, BookOpen } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

interface DashboardStats {
  totalSiswa: number
  totalKonseling: number
  totalTujuanKarir: number
  siswaAktif: number
  totalKonselingBelumSelesai: number
  konselingStatsByClass?: { [key: string]: { totalStudents: number } }
}

interface StatsCardsProps {
  stats: DashboardStats
  totalKonselingBelumSelesai: number
}

export function StatsCards(props: StatsCardsProps) {
  // Check if props exists and has valid stats
  if (!props || !props.stats) {
    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='p-6 bg-white/80 border border-white/50 rounded-xl animate-pulse'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='h-4 bg-slate-200 rounded w-20 mb-2'></div>
                <div className='h-6 bg-slate-200 rounded w-12'></div>
              </div>
              <div className='w-12 h-12 bg-slate-200 rounded-xl'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const { stats, totalKonselingBelumSelesai } = props
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'
    >
      {totalKonselingBelumSelesai > 0 && (
        <motion.div variants={cardVariants} className='lg:col-span-4 col-span-2'>
          <Alert variant='destructive'>
            <Terminal className='h-4 w-4' />
            <AlertTitle>Pemberitahuan Konseling</AlertTitle>
            <AlertDescription>
              Ada {totalKonselingBelumSelesai} konseling yang belum selesai.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      <motion.div variants={cardVariants}>
        <GlassCard hover className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Total Siswa</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>{stats.totalSiswa}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
              <Users className='w-6 h-6 text-white' />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Total Konseling</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>{stats.totalKonseling}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center'>
              <MessageSquare className='w-6 h-6 text-white' />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-slate-600 text-sm font-medium'>Tujuan Karir</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>{stats.totalTujuanKarir}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center'>
              <TrendingUp className='w-6 h-6 text-white' />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={cardVariants}>
        <GlassCard hover className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-1'>
                <p className='text-slate-600 text-sm font-medium'>Siswa Aktif</p>
                <div className='group relative'>
                  <div className='w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center cursor-help'>
                    <span className='text-xs text-blue-600 font-bold'>?</span>
                  </div>
                  <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10'>
                    Siswa yang sudah membuat akun
                  </div>
                </div>
              </div>
              <p className='text-2xl font-bold text-slate-800 mt-1'>{stats.siswaAktif}</p>
            </div>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center'>
              <BookOpen className='w-6 h-6 text-white' />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}