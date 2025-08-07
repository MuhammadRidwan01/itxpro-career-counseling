"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Users } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import Link from "next/link"


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
              <h3 className="text-5xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Kontak BK SMK ITXPRO
               
              </h3>
              <p className="text-lg text-white/90 mb-12 leading-relaxed">
                Jika kamu memiliki pertanyaan, butuh konsultasi, atau ingin membuat janji bimbingan konseling, silakan hubungi kami melalui informasi di bawah ini.
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
                type="button"
                className="w-full flex items-center justify-center"
                onClick={() => {
                    window.open(
                    "https://wa.me/6289611508411?text=Halo%20Bu%20Shildi%2C%20saya%20ingin%20bertanya%20tentang%20konseling%20karir.",
                    "_blank"
                    );
                }}
                >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                Hubungi
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
                type="button"
                className="w-full flex items-center justify-center"
                onClick={() => {
                    window.open(
                    "https://wa.me/6281316251307?text=Halo%20Pak%20Dede%2C%20saya%20ingin%20bertanya%20tentang%20konseling%20karir.",
                    "_blank"
                    );
                }}
                >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                Hubungi
            </PremiumButton>
            </GlassCard>
          </div>
        </motion.div>
        {/* Konten bisa ditambahkan di sini */}
      </div>
    </div>
  );
}
