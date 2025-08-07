"use client"

import { motion } from "framer-motion"

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Tentang</h1>
          <p className="text-white/80">Halaman ini masih kosong.</p>
        </motion.div>
        {/* Konten bisa ditambahkan di sini */}
      </div>
    </div>
  )
}
