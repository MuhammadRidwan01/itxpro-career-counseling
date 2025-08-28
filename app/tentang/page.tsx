"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TentangPage() {
  const konselorList = [
    {
      id: 1,
      nama: "Bapak Dede Jamaludin, S.Pd.",
      spesialisasi: "Karier",
      foto: "/IMG_1227.jpg",
    },
    {
      id: 2,
      nama: "Ibu Shildi Andriani, S.Pd.",
      spesialisasi: "Karier",
      foto: "/IMG_1224.jpg",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Tombol kembali */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <PremiumButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </PremiumButton>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
        
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center m-4 md:m-10"
        >
          {/* Text */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Bimbingan Konseling
              <span className="block bg-gradient-to-r from-nude-400 to-nude-600 bg-clip-text text-transparent">
                SMK ITXPRO 2026
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Kami hadir sebagai bagian penting dari sistem pendidikan dengan tujuan utama 
              membantu siswa mencapai perkembangan optimal — baik secara akademik, pribadi, 
              sosial, maupun karier.  
              <br />
              Melalui pendekatan empatik dan profesional, layanan BK menjadi ruang aman bagi 
              siswa untuk berbagi, bertanya, dan tumbuh bersama.
            </p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Image
              src="/IMG_1329.jpg"
              alt="Ilustrasi Bimbingan Konseling"
              width={450}
              height={450}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Layanan */}
        <GlassCard hover className="p-6 md:p-10 m-4 md:m-10 text-start">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Layanan Kami
          </h2>
          <ul className="space-y-4 text-white/90 text-base md:text-lg">
            {[
              "Konseling Individu & Kelompok",
              "Bimbingan Belajar",
              "Bimbingan Karier",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-gold-400" />
                {item}
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-6 m-4 md:m-10">
          {/* VISI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard hover className="p-6 text-center h-full">
              <h3 className="text-xl font-semibold text-white mb-4">VISI</h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Membentuk peserta didik yang berkarakter positif, mandiri, berprestasi, 
                dan mampu mengambil keputusan bijak dalam kehidupan.
              </p>
            </GlassCard>
          </motion.div>

          {/* MISI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard hover className="p-6 h-full">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                MISI
              </h3>
              <ul className="text-sm md:text-base text-white/70 leading-relaxed space-y-3">
                {[
                  "Memberikan layanan konseling yang ramah, profesional, dan rahasia.",
                  "Membantu siswa mengatasi masalah pribadi, sosial, belajar, dan karier.",
                  "Menumbuhkan sikap disiplin, tanggung jawab, dan empati.",
                  "Mendukung terciptanya lingkungan sekolah yang harmonis dan kondusif.",
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-gold-500 mt-1" />
                    {misi}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

{/* Tim Konselor (opsional) */}
<div className="m-4 md:m-10">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
    Tim Konselor
  </h2>

      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {konselorList.map((konselor, i) => (
            <motion.div
              key={konselor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <GlassCard hover className="p-6 text-center flex flex-col items-center">
                {/* Foto persegi panjang (lebih besar lagi) */}
                <div className="mb-4 relative w-80 h-44">
                  <Image
                    src={konselor.foto}
                    alt={`Foto ${konselor.nama}`}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="text-lg font-semibold text-white">
                    {konselor.nama}
                  </h4>
                </div>
                {/* <p className="text-sm text-white/70">
                  Spesialisasi: {konselor.spesialisasi}
                </p> */}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
</div>

      </div>
    </div>
  );
} 