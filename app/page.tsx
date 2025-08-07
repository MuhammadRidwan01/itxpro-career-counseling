"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { BookOpen, Users, TrendingUp, Award, ChevronRight, Sparkles } from "lucide-react"
import Link from 'next/link';


export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"admin" | "student">("student")

  const features = [
    {
      icon: BookOpen,
      title: "Konseling Personal",
      description: "Bimbingan karir individual dengan pendekatan modern",
    },
    {
      icon: Users,
      title: "Manajemen Siswa",
      description: "Kelola data siswa dengan sistem terintegrasi",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Visualisasi data dan progress siswa real-time",
    },
    {
      icon: Award,
      title: "Tracking Tujuan",
      description: "Monitor pencapaian tujuan karir siswa",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold-400/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-nude-300/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ITXPRO</h1>
                <p className="text-sm text-white/80">Career Counseling</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link href="/tentang">
                <PremiumButton variant="ghost" size="sm">
                  Tentang
                </PremiumButton>
              </Link>
              <Link href="/kontak">
                <PremiumButton variant="ghost" size="sm">
                  Kontak
                </PremiumButton>
              </Link>
            </motion.div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Sistem Konseling Karir
                <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  SMK ITXPRO 2026
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Platform modern untuk mengelola konseling karir siswa dengan teknologi terdepan. Wujudkan masa depan
                cemerlang bersama sistem yang dirancang khusus untuk SMK Informatika.
              </p>
            </motion.div>

            {/* Login Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20"
            >
              <GlassCard hover className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-nude-800 mb-4">Portal Siswa</h3>
                <p className="text-nude-600 mb-6">Akses profil, input tujuan karir, dan lihat histori konseling</p>
                <PremiumButton className="w-full" onClick={() => (window.location.href = "/auth/student")}>
                  Masuk Sebagai Siswa
                  <ChevronRight className="w-4 h-4" />
                </PremiumButton>
              </GlassCard>

              <GlassCard hover className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-nude-600 to-nude-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-nude-800 mb-4">Portal Guru BK</h3>
                <p className="text-nude-600 mb-6">Kelola data siswa, input konseling, dan analisis progress</p>
                <PremiumButton
                  variant="secondary"
                  className="w-full"
                  onClick={() => (window.location.href = "/auth/admin")}
                >
                  Masuk Sebagai Admin
                  <ChevronRight className="w-4 h-4" />
                </PremiumButton>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Fitur Unggulan</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Sistem lengkap yang dirancang khusus untuk kebutuhan konseling karir SMK modern
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard hover className="p-6 text-center h-full">
                  <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-nude-800 mb-3">{feature.title}</h3>
                  <p className="text-nude-600 text-sm leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center">
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60">© 2024 SMK Informatika Pesat ITXPRO. Sistem Konseling Karir Modern.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
