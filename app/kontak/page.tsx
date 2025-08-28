"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const konselors = [
  {
    name: "Bu Shildi Andriani (Konselor)",
    whatsapp: "6281234567890", // ganti nomor asli
  },
  {
    name: "Pak Dede Jamaludin (Konselor)",
    whatsapp: "6289876543210", // ganti nomor asli
  },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Tombol Kembali */}
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

        {/* Judul */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-5xl md:text-4xl font-bold text-white/70 mb-6 leading-tight">
              Kontak Bimbingan Konseling
              <span className="block text-nude-700 bg-clip-text">
                SMK ITXPRO 2026
              </span>
            </h3>
            <p className="text-lg text-white/70 mb-12 leading-relaxed">
              Platform modern untuk mengelola konseling karir siswa dengan
              teknologi terdepan. Wujudkan masa depan cemerlang bersama sistem
              yang dirancang khusus untuk SMK Informatika.
            </p>
          </motion.div>
        </div>

        {/* Daftar Konselor */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
          {konselors.map((k, i) => (
            <GlassCard
              key={i}
              hover
              className="flex flex-col justify-between p-6 md:p-6 text-center items-center 
                         w-full max-w-sm shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-nude-600 to-nude-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white/80 mb-4">{k.name}</h3>
              <PremiumButton
                aria-label={`Hubungi ${k.name} via WhatsApp`}
                className="w-full flex items-center justify-center gap-2 bg-nude-700 hover:bg-nude-800 text-white"
                onClick={() => window.open(`https://wa.me/${k.whatsapp}`, "_blank")}
              >
                <FaWhatsapp className="w-4 h-4" />
                Hubungi
              </PremiumButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
