"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { ArrowLeft, Target, GraduationCap, Briefcase, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function TujuanKarirForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<TujuanKarirFormData>({
    kategoriUtama: "",
    ptn1: "",
    jurusan1: "",
    ptn2: "",
    jurusan2: "",
    ptn3: "",
    jurusan3: "",
    detailBekerja: "",
    detailWirausaha: "",
  })
  const [isEditMode, setIsEditMode] = useState(false)

  type TujuanKarirFormData = {
    kategoriUtama: string
    ptn1: string
    jurusan1: string
    ptn2: string
    jurusan2: string
    ptn3: string
    jurusan3: string
    detailBekerja: string
    detailWirausaha: string
  }

  if (status === "loading") return <div>Loading...</div>
  if (!session || session.user.role !== "STUDENT") redirect("/auth/student")

  useEffect(() => {
    const fetchTujuanKarir = async () => {
      try {
        const response = await fetch("/api/student/tujuan-karir")
        const result = await response.json()
        if (result.success && result.data) {
          setFormData(result.data)
          setIsEditMode(true)
          toast.info("Tujuan karir Anda sudah ada, Anda dapat mengubahnya.")
        }
      } catch (error) {
        console.error("Failed to fetch tujuan karir:", error)
      }
    }
    fetchTujuanKarir()
  }, [])

  const kategoriOptions = [
    {
      id: "kuliah",
      title: "Melanjutkan Kuliah",
      description: "Ingin melanjutkan pendidikan ke jenjang yang lebih tinggi",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "bekerja",
      title: "Langsung Bekerja",
      description: "Ingin langsung terjun ke dunia kerja setelah lulus",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
    },
    {
      id: "wirausaha",
      title: "Berwirausaha",
      description: "Ingin memulai bisnis atau usaha sendiri",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/student/tujuan-karir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStep(4)
        toast.success(isEditMode ? "Tujuan karir berhasil diperbarui!" : "Tujuan karir berhasil disimpan!")
      } else {
        toast.error(data.message || "Gagal " + (isEditMode ? "memperbarui" : "menyimpan") + " tujuan karir")
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    if (!formData.kategoriUtama) return false
    if (formData.kategoriUtama === "kuliah") {
      return (
        (formData.ptn1 && formData.jurusan1) ||
        (formData.ptn2 && formData.jurusan2) ||
        (formData.ptn3 && formData.jurusan3)
      )
    }
    if (formData.kategoriUtama === "bekerja") {
      return !!formData.detailBekerja
    }
    if (formData.kategoriUtama === "wirausaha") {
      return !!formData.detailWirausaha
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Link href="/student/dashboard">
                <PremiumButton variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </PremiumButton>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Tujuan Karir</h1>
                <p className="text-white/80">Tentukan tujuan Anda setelah lulus</p>
              </div>
            </div>
            {isEditMode && (
              <PremiumButton onClick={() => setStep(1)} className="ml-auto">
                Edit Tujuan Karir
              </PremiumButton>
            )}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step >= i ? "bg-gradient-button text-white shadow-lg" : "bg-white/20 text-nude-600"
                      }`}
                    >
                      {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                    </div>
                    {i < 4 && (
                      <div
                        className={`w-16 h-1 mx-3 rounded transition-all duration-300 ${
                          step > i ? "bg-gradient-button" : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-nude-600">
                <span>Pilih Kategori</span>
                <span>Detail</span>
                <span>Konfirmasi</span>
                <span>Selesai</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Pilih Kategori */}
            {step === 1 && (
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <Target className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-nude-800 mb-2">Pilih Tujuan Utama</h2>
                  <p className="text-nude-600">Apa yang ingin Anda lakukan setelah lulus?</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {kategoriOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.kategoriUtama === option.id
                          ? "border-gold-500 bg-gold-50/50"
                          : "border-white/20 bg-white/10 hover:border-white/40"
                      }`}
                      onClick={() => setFormData({ ...formData, kategoriUtama: option.id })}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-nude-800 mb-2">{option.title}</h3>
                      <p className="text-nude-600 text-sm">{option.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <PremiumButton onClick={() => setStep(2)} disabled={!formData.kategoriUtama}>Lanjutkan</PremiumButton>
                </div>
              </GlassCard>
            )}

            {/* Step 2: Detail berdasarkan kategori */}
            {step === 2 && (
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-nude-800 mb-2">Detail Tujuan</h2>
                  <p className="text-nude-600">
                    {formData.kategoriUtama === "kuliah" && "Pilih universitas dan jurusan yang Anda inginkan"}
                    {formData.kategoriUtama === "bekerja" && "Jelaskan bidang pekerjaan yang Anda minati"}
                    {formData.kategoriUtama === "wirausaha" && "Jelaskan jenis usaha yang ingin Anda jalankan"}
                  </p>
                </div>

                <form className="space-y-6">
                  {formData.kategoriUtama === "kuliah" && (
                    <div className="space-y-6">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-nude-700 mb-2">
                              Pilihan {num} - Universitas/Institut
                            </label>
                            <input
                              type="text"
                              value={formData[`ptn${num}` as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [`ptn${num}`]: e.target.value })}
                              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                              placeholder="Contoh: Universitas Indonesia"
                              required={num === 1}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-nude-700 mb-2">
                              Pilihan {num} - Jurusan
                            </label>
                            <input
                              type="text"
                              value={formData[`jurusan${num}` as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [`jurusan${num}`]: e.target.value })}
                              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500"
                              placeholder="Contoh: Teknik Informatika"
                              required={num === 1}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.kategoriUtama === "bekerja" && (
                    <div>
                      <label className="block text-sm font-medium text-nude-700 mb-2">
                        Detail Pekerjaan yang Diinginkan
                      </label>
                      <textarea
                        value={formData.detailBekerja}
                        onChange={(e) => setFormData({ ...formData, detailBekerja: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500 resize-none"
                        placeholder="Jelaskan bidang pekerjaan, posisi yang diinginkan, perusahaan target, dll."
                        required
                      />
                    </div>
                  )}

                  {formData.kategoriUtama === "wirausaha" && (
                    <div>
                      <label className="block text-sm font-medium text-nude-700 mb-2">Detail Rencana Wirausaha</label>
                      <textarea
                        value={formData.detailWirausaha}
                        onChange={(e) => setFormData({ ...formData, detailWirausaha: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 text-nude-800 placeholder-nude-500 resize-none"
                        placeholder="Jelaskan jenis usaha, target pasar, modal yang dibutuhkan, dll."
                        required
                      />
                    </div>
                  )}
                </form>

                <div className="flex justify-between mt-8">
                  <PremiumButton variant="secondary" onClick={() => setStep(1)}>Kembali</PremiumButton>
                  <PremiumButton onClick={() => setStep(3)} disabled={!isFormValid()}>Lanjutkan</PremiumButton>
                </div>
              </GlassCard>
            )}

            {/* Step 3: Konfirmasi */}
            {step === 3 && (
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-nude-800 mb-2">Konfirmasi Tujuan Karir</h2>
                  <p className="text-nude-600">Periksa kembali data Anda sebelum menyimpan</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-white/10 rounded-xl">
                    <h3 className="font-semibold text-nude-800 mb-4">Tujuan Utama</h3>
                    <p className="text-nude-700 capitalize">{formData.kategoriUtama}</p>
                  </div>

                  {formData.kategoriUtama === "kuliah" && (
                    <div className="p-6 bg-white/10 rounded-xl">
                      <h3 className="font-semibold text-nude-800 mb-4">Pilihan Universitas & Jurusan</h3>
                      <div className="space-y-3">
                        {[1, 2, 3].map((num) => {
                          const ptn = formData[`ptn${num}` as keyof typeof formData]
                          const jurusan = formData[`jurusan${num}` as keyof typeof formData]
                          if (ptn && jurusan) {
                            return (
                              <div key={num} className="flex justify-between">
                                <span className="text-nude-600">Pilihan {num}:</span>
                                <span className="text-nude-800 font-medium">
                                  {ptn} - {jurusan}
                                </span>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  )}

                  {formData.kategoriUtama === "bekerja" && (
                    <div className="p-6 bg-white/10 rounded-xl">
                      <h3 className="font-semibold text-nude-800 mb-4">Detail Pekerjaan</h3>
                      <p className="text-nude-700 leading-relaxed">{formData.detailBekerja}</p>
                    </div>
                  )}

                  {formData.kategoriUtama === "wirausaha" && (
                    <div className="p-6 bg-white/10 rounded-xl">
                      <h3 className="font-semibold text-nude-800 mb-4">Detail Wirausaha</h3>
                      <p className="text-nude-700 leading-relaxed">{formData.detailWirausaha}</p>
                    </div>
                  )}

                </div>

                <div className="flex justify-between mt-8">
                  <PremiumButton variant="secondary" onClick={() => setStep(2)}>Kembali</PremiumButton>
                  <PremiumButton onClick={handleSubmit} loading={loading}>
                    {loading ? (isEditMode ? "Memperbarui..." : "Menyimpan...") : isEditMode ? "Perbarui Tujuan Karir" : "Simpan Tujuan Karir"}
                  </PremiumButton>
                </div>
              </GlassCard>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <GlassCard className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-nude-800 mb-4">Tujuan Karir Tersimpan!</h2>
                <p className="text-nude-600 mb-8">
                  Tujuan karir Anda telah berhasil disimpan. Guru BK akan menggunakan informasi ini untuk memberikan
                  bimbingan yang lebih tepat sasaran.
                </p>

                <Link href="/student/dashboard">
                  <PremiumButton>Kembali ke Dashboard</PremiumButton>
                </Link>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
