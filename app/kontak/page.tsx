"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
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
            <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h3 className="text-5xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Sistem Konseling Karir
                <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  SMK ITXPRO 2026
                </span>
              </h3>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Platform modern untuk mengelola konseling karir siswa dengan teknologi terdepan. Wujudkan masa depan
                cemerlang bersama sistem yang dirancang khusus untuk SMK Informatika.
              </p>
            </motion.div>
            </div>
          <div className="flex gap-10 justify-center">
            <GlassCard
              hover
              className="p-8  text-center items-center w-[500px]"
            >
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-nude-800 mb-4">
                Bu Shildi Andriani (Guru BK)
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
              className="p-8  text-center items-center w-[500px]"
            >
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-nude-800 mb-4">
                Pak Dede Jamaludin (Guru BK)
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
