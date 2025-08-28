"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from 'react-icons/fa';


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
            <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h3 className="text-5xl md:text-4xl font-bold text-white/70 mb-6 leading-tight">
                Kontak Bimbingan Konseling
                <span className="block text-white/70 bg-clip-text ">
                  SMK ITXPRO 2026
                </span>
              </h3>
              <p className="text-lg text-white/70 mb-12 leading-relaxed">
                Platform modern untuk mengelola konseling karir siswa dengan teknologi terdepan. Wujudkan masa depan
                cemerlang bersama sistem yang dirancang khusus untuk SMK Informatika.
              </p>
            </motion.div>
            </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-2 justify-center items-stretch w-full px-2 md:px-0">
            <GlassCard
              hover
              className="flex flex-col justify-between p-6 md:p-8 text-center items-center w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Bu Shildi Andriani (Konselor)
              </h3>
              {/* <p className="text-nude-600 mb-6">
                Jika kamu memiliki pertanyaan, butuh konsultasi, atau ingin membuat janji bimbingan konseling, silakan hubungi kami melalui informasi di bawah ini.
              </p> */}
              <PremiumButton
                className="w-full"
                onClick={() => (window.location.href = "/auth/student")}
              >
                Hubungi 
                <FaWhatsapp className="w-4 h-4 mr-2" />
              </PremiumButton>
            </GlassCard>
            <GlassCard
              hover
              className="flex flex-col justify-between p-6 md:p-8 text-center items-center w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white/80 mb-4">
                Pak Dede Jamaludin (Konselor)
              </h3>
              {/* <p className="text-nude-600 mb-6">
                Jika kamu memiliki pertanyaan, butuh konsultasi, atau ingin membuat janji bimbingan konseling, silakan hubungi kami melalui informasi di bawah ini.
              </p> */}
              <PremiumButton
                className="w-full"
                onClick={() => (window.location.href = "/auth/student")}
              >
                Hubungi 
                <FaWhatsapp className="w-4 h-4 mr-2" />
              </PremiumButton>
            </GlassCard>
          </div>
        </motion.div>
        {/* Konten bisa ditambahkan di sini */}
      </div>
    </div>
  );
}
