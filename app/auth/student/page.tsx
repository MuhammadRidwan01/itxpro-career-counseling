"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { ArrowLeft, User, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nisOrEmail: "",
    password: "",
    remember: false,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("Attempting login with:", formData.nisOrEmail)

      const result = await signIn("credentials", {
        identifier: formData.nisOrEmail,
        password: formData.password,
        redirect: false,
      })

      console.log("Login result:", result)

      if (result?.error) {
        toast.error("Login gagal. Periksa kembali NIS/Email dan password Anda.")
        console.log("Login error:", result.error)
      } else {
        toast.success("Login berhasil!")
        router.push("/student/dashboard")
      }
    } catch (error) {
      console.error("Login exception:", error)
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

        {/* Login Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-nude-800 mb-2">Portal Siswa</h1>
              <p className="text-nude-600">Masuk ke akun siswa Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">NIS atau Email</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nisOrEmail}
                    onChange={(e) => setFormData({ ...formData, nisOrEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                    placeholder="Masukkan NIS atau email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-nude-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                    placeholder="Masukkan password"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="w-4 h-4 text-gold-500 bg-white/50 border-white/20 rounded focus:ring-gold-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-nude-600">Ingat saya</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-gold-600 hover:text-gold-700 transition-colors"
                >
                  Lupa password?
                </Link>
              </div>

              <PremiumButton type="submit" className="w-full" loading={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </PremiumButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-nude-600">
                Belum punya akun?{" "}
                <Link
                  href="/auth/student/register"
                  className="text-gold-600 hover:text-gold-700 font-medium transition-colors"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>

            {/* Debug Info */}
            <div className="mt-4 p-3 bg-white/20 rounded-lg text-xs text-nude-600">
              <p className="font-semibold mb-2">🔧 Testing Login:</p>
              <div className="space-y-1">
                <p>
                  <strong>Admin:</strong> admin@itxpro.sch.id
                </p>
                <p>
                  <strong>Password:</strong> 123456
                </p>
                <hr className="my-2 border-nude-300" />
                <p>
                  <strong>Siswa NIS:</strong> 252610001
                </p>
                <p>
                  <strong>Password:</strong> 123456
                </p>
                <hr className="my-2 border-nude-300" />
                <p>
                  <strong>Siswa Email:</strong> 252610001@temp.itxpro.sch.id
                </p>
                <p>
                  <strong>Password:</strong> 123456
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
