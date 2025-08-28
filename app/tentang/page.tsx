"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronRight, Users } from "lucide-react";
import Link from "next/link";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/">
            <PremiumButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </PremiumButton>
          </Link>
        </motion.div>
          <GlassCard hover className="p-6 md:p-10 m-4 md:m-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Bimbingan Konseling
              <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                SMK ITXPRO 2026
              </span>
            </h1>
            <p className="text-base md:text-xl text-start font-semibold text-white/90 mb-8 md:mb-12 leading-relaxed">
              Selamat datang di halaman resmi Bimbingan Konseling (BK) SMK Informatika Pesat! <br />
              Kami hadir sebagai bagian penting dari sistem pendidikan di sekolah, dengan tujuan utama membantu siswa mencapai perkembangan optimal — baik secara akademik, pribadi, sosial, maupun karier. Melalui pendekatan yang empatik, profesional, dan terbuka, layanan BK menjadi ruang aman bagi siswa untuk berbagi, bertanya, dan tumbuh bersama.
            </p>
            <div className="text-white md:text-xl text-start font-semibold">
              Layanan kami:
              <ul className="">
                <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          Konseling Individu & Kelompok
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          Bimbingan Belajar
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          Bimbingan Karier
        </li>
              </ul>
            </div>

            
          </GlassCard>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 m-4 md:m-10 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <GlassCard hover className="p-4 md:p-6 text-center h-full w-full">
                
                <h3 className="text-base md:text-xl font-semibold text-gold-400 mb-3">
                  VISI
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  Membentuk peserta didik yang berkarakter positif, mandiri, berprestasi, dan mampu mengambil keputusan bijak dalam kehidupan.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <GlassCard hover className="p-4 md:p-6 text-center h-full w-full">

                <h3 className="text-base md:text-xl font-semibold text-gold-400 mb-3">
                  MISI
                </h3>
                 <ul className="text-xs md:text-sm text-white/70 leading-relaxed space-y-2">
      <li className="flex items-start gap-2">
        <ChevronRight className="w-4 h-4 text-gold-400 mt-0.5" />
        Memberikan layanan konseling yang ramah, profesional, dan rahasia.
      </li>
      <li className="flex items-start gap-2">
        <ChevronRight className="w-4 h-4 text-gold-400 mt-0.5" />
        Membantu siswa mengatasi masalah pribadi, sosial, belajar, dan karier.
      </li>
      <li className="flex items-start gap-2">
        <ChevronRight className="w-4 h-4 text-gold-400 mt-0.5" />
        Menumbuhkan sikap disiplin, tanggung jawab, dan empati pada setiap siswa.
      </li>
      <li className="flex items-start gap-2">
        <ChevronRight className="w-4 h-4 text-gold-400 mt-0.5" />
        Mendukung terciptanya lingkungan sekolah yang harmonis dan kondusif.
      </li>
    </ul>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
        {/* Konten bisa ditambahkan di sini */}
      </div>
    </div>
  );
}
