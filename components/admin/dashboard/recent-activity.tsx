"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Star, StarOff } from "lucide-react"
import { motion } from "framer-motion"

interface Konseling {
  id: string
  nisSiswa: string
  tanggalKonseling: string
  hasilText: string
  deskripsi?: string // Make optional
  tindakLanjut?: string // Make optional
  status: "SUDAH" | "BELUM"
  kategori: string
  createdAt: string // Add createdAt
  siswa: {
    nama: string
    kelasSaatIni: string
  }
}

interface RecentActivityProps {
  recentKonseling: Konseling[]
  recentTujuanKarir: TujuanKarir[]
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

export function RecentActivity({ recentKonseling, recentTujuanKarir }: RecentActivityProps) {
  const allActivities = [...recentKonseling, ...recentTujuanKarir].sort((a, b) => {
    const dateA = new Date('tanggalKonseling' in a ? a.tanggalKonseling : a.createdAt);
    const dateB = new Date('tanggalKonseling' in b ? b.tanggalKonseling : b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

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
        {allActivities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">
                {activity.siswa.nama} -{" "}
                {"hasilText" in activity ? "Konseling" : "Tujuan Karir"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                  {"kategori" in activity ? activity.kategori : activity.kategoriUtama}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date('tanggalKonseling' in activity ? activity.tanggalKonseling : activity.createdAt).toLocaleDateString("id-ID")}
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