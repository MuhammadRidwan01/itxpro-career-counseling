"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Star, StarOff } from "lucide-react"
import { motion } from "framer-motion"

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi: string
  tindakLanjut: string
  status: "SUDAH" | "BELUM"
  kategori: string
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface RecentActivityProps {
  konseling: Konseling[]
}

export function RecentActivity({ konseling }: RecentActivityProps) {
  // renderStarRating dihapus karena rating tidak ada di DB
  // const renderStarRating = (rating: number) => {
  //   const stars = []
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       i <= rating ? (
  //         <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
  //       ) : (
  //         <StarOff key={i} className="w-4 h-4 text-gray-300" />
  //       ),
  //     )
  //   }
  //   return <div className="flex">{stars}</div>
  // }

  return (
    <GlassCard className="p-8">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
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
        className="space-y-4 max-h-80 overflow-y-auto"
      >
        {konseling.slice(0, 5).map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{item.siswa.nama}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                  {item.kategori}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(item.tanggalKonseling).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
            <div className="ml-3">
              {/* Rating dihapus karena tidak ada di DB */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </GlassCard>
  )
}