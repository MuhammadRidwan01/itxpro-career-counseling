"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function TentangPage() {
  const konselors = [
    {
      nama: "Bu Shildi Andriani",
      role: "Konselor",
      wa: "6289611508411", // ganti dengan nomor asli
    },
    {
      nama: "Pak Dede Jamaludin",
      role: "Konselor",
      wa: "6281316251307", // ganti dengan nomor asli
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        
        {/* Tombol Kembali */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <PremiumButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </PremiumButton>
          </Link>
        </motion.div>

        {/* Judul & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white/80 mb-6 leading-tight">
            Kontak Bimbingan Konseling
            <span className="block text-white/70">SMK ITXPRO 2026</span>
          </h3>
          <p className="text-lg text-white/70 mb-12 leading-relaxed">
            Platform modern untuk mengelola konseling karir siswa dengan
            teknologi terdepan. Wujudkan masa depan cemerlang bersama sistem
            yang dirancang khusus untuk SMK Informatika.
          </p>
        </motion.div>

        {/* Kartu Kontak */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-full px-2 md:px-0">
          {konselors.map((k, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto"
            >
              <GlassCard
                hover
                className="flex flex-col justify-between p-6 md:p-8 text-center items-center shadow-lg h-full"
              >
                <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white/80 mb-6">
                  {k.nama} <br />
                  <span className="text-sm font-medium text-white/60">
                    ({k.role})
                  </span>
                </h3>
                <a
                  href={`https://wa.me/${k.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <PremiumButton className="w-full flex items-center justify-center gap-2">
                    <FaWhatsapp className="w-4 h-4" />
                    Hubungi via WhatsApp
                  </PremiumButton>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
