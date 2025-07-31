"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function StudentRegister() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [siswaData, setSiswaData] = useState<any>(null)
  const [formData, setFormData] = useState({
    nis: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleNISValidation = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/validate-nis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nis: formData.nis }),
      })

      const data = await response.json()

      if (data.success) {
        setSiswaData(data.siswa)
        setStep(2)
        toast.success("NIS valid! Silakan lengkapi data registrasi.")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama.")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password minimal 6 karakter.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nis: formData.nis,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStep(3)
        toast.success("Registrasi berhasil!")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden flex items-center justify-center">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold-400/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/">
            <PremiumButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </PremiumButton>
          </Link>
        </motion.div>

        {/* Registration Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <GlassCard className="p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= i ? "bg-gradient-button text-white shadow-lg" : "bg-white/20 text-nude-600"
                    }`}
                  >
                    {step > i ? <CheckCircle className="w-4 h-4" /> : i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded transition-all duration-300 ${
                        step > i ? "bg-gradient-button" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-nude-800 mb-2">
                {step === 1 && "Validasi NIS"}
                {step === 2 && "Lengkapi Data"}
                {step === 3 && "Registrasi Berhasil"}
              </h1>
              <p className="text-nude-600">
                {step === 1 && "Masukkan NIS untuk memulai registrasi"}
                {step === 2 && "Buat akun untuk mengakses sistem"}
                {step === 3 && "Akun Anda telah berhasil dibuat"}
              </p>
            </div>

            {/* Step 1: NIS Validation */}
            {step === 1 && (
              <form onSubmit={handleNISValidation} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">Nomor Induk Siswa (NIS)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nude-500" />
                    <input
                      type="text"
                      value={formData.nis}
                      onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                      placeholder="252610001"
                      maxLength={9}
                      pattern="[0-9]{9}"
                      required
                    />
                  </div>
                  <p className="text-xs text-nude-500 mt-1">NIS harus 9 digit angka</p>
                </div>

                <PremiumButton type="submit" className="w-full" loading={loading} disabled={formData.nis.length !== 9}>
                  {loading ? "Memvalidasi..." : "Validasi NIS"}
                </PremiumButton>
              </form>
            )}

            {/* Step 2: Registration Form */}
            {step === 2 && (
              <form onSubmit={handleRegistration} className="space-y-6">
                {/* Siswa Info */}
                <GlassCard className="p-4 bg-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-nude-800">Data Siswa Ditemukan</span>
                  </div>
                  <div className="text-sm text-nude-600 space-y-1">
                    <p>
                      <strong>Nama:</strong> {siswaData?.nama}
                    </p>
                    <p>
                      <strong>NIS:</strong> {siswaData?.nis}
                    </p>
                    <p>
                      <strong>Kelas:</strong> {siswaData?.kelasSaatIni}
                    </p>
                    <p>
                      <strong>Angkatan:</strong> {siswaData?.angkatan}
                    </p>
                  </div>
                </GlassCard>

                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nude-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nude-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-500 hover:text-nude-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nude-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                      placeholder="Ulangi password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-500 hover:text-nude-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <PremiumButton type="submit" className="w-full" loading={loading}>
                  {loading ? "Mendaftar..." : "Daftar"}
                </PremiumButton>
              </form>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-nude-800 mb-2">Selamat!</h3>
                  <p className="text-nude-600 mb-6">
                    Akun Anda telah berhasil dibuat. Sekarang Anda dapat masuk ke sistem.
                  </p>
                </div>

                <Link href="/auth/student">
                  <PremiumButton className="w-full">Masuk ke Sistem</PremiumButton>
                </Link>
              </div>
            )}

            {step < 3 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-nude-600">
                  Sudah punya akun?{" "}
                  <Link
                    href="/auth/student"
                    className="text-gold-600 hover:text-gold-700 font-medium transition-colors"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
