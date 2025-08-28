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
    <div className="min-h-screen bg-gradient-to-br from-nude-800 via-nude-900 to-nude-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-nude-400/20 to-nude-500/20 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-nude-500/10 to-nude-600/10 rounded-full filter blur-[120px] transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-nude-700/10 to-nude-800/10 rounded-full filter blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 bg-nude-800/20 backdrop-blur-sm rounded-2xl p-6 border border-nude-200/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <Link href="/student/dashboard">
                <PremiumButton variant="outline-glass" size="sm" className="bg-nude-800/30 hover:bg-nude-800/40 text-nude-100">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Kembali</span>
                </PremiumButton>
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-nude-100 mb-2 leading-tight">Tujuan Karir</h1>
                <p className="text-nude-200 text-sm sm:text-base">Tentukan tujuan Anda setelah lulus</p>
              </div>
            </div>
            {isEditMode && (
              <PremiumButton 
                onClick={() => setStep(1)} 
                className="w-full sm:w-auto bg-nude-700/50 hover:bg-nude-700/60 text-nude-100 border border-nude-600/30"
              >
                Edit Tujuan Karir
              </PremiumButton>
            )}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <GlassCard className="p-4 sm:p-6 md:p-8 bg-nude-800/30 border border-nude-300/20">
              {/* Desktop Progress Indicator - Hidden on Mobile */}
              <div className="hidden sm:flex items-center justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          step >= i 
                            ? "bg-gradient-to-br from-nude-600 to-nude-700 text-nude-100 shadow-lg transform scale-105" 
                            : "bg-nude-700/30 text-nude-300 border border-nude-600/20"
                        }`}
                      >
                        {step > i ? <CheckCircle className="w-6 h-6" /> : i}
                      </div>
                      <div className="mt-3 text-center">
                        <span className={`block font-medium transition-all duration-300 ${
                          step >= i ? "text-nude-100" : "text-nude-400"
                        }`}>
                          {i === 1 ? "Pilih Kategori" : 
                           i === 2 ? "Detail" :
                           i === 3 ? "Konfirmasi" : "Selesai"}
                        </span>
                      </div>
                    </div>
                    {i < 4 && (
                      <div className="flex-1 mx-4">
                        <div className="h-1 relative">
                          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                            step > i ? "bg-nude-600" : "bg-nude-700/30"
                          }`} />
                          <div
                            className={`absolute inset-0 rounded-full transition-all duration-300 bg-gradient-to-r from-nude-500 to-nude-600
                              ${step > i ? "w-full" : "w-0"}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Progress Indicator */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-nude-100 font-medium">Langkah {step} dari 4</span>
                  <span className="text-nude-200">
                    {step === 1 ? "Pilih Kategori" : 
                     step === 2 ? "Detail" :
                     step === 3 ? "Konfirmasi" : "Selesai"}
                  </span>
                </div>
                <div className="h-2 bg-nude-700/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-nude-500 to-nude-600 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        step >= i ? "bg-nude-500" : "bg-nude-700/30"
                      }`}
                    />
                  ))}
                </div>
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
              <GlassCard className="p-4 sm:p-6 md:p-8 bg-nude-800/30 border border-nude-300/20">
                <div className="text-center mb-12">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-nude-500/20 blur-2xl rounded-full"></div>
                    <Target className="w-20 h-20 text-nude-100 mx-auto mb-4 relative z-10 transform hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-nude-100 mb-3">Pilih Tujuan Utama</h2>
                  <p className="text-nude-200 text-lg">Apa yang ingin Anda lakukan setelah lulus?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {kategoriOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden group backdrop-blur-md ${
                        formData.kategoriUtama === option.id
                          ? "bg-nude-500/20 border-2 border-nude-400"
                          : "bg-nude-800/10 border border-nude-700/30 hover:bg-nude-700/20"
                      }`}
                      onClick={() => setFormData({ ...formData, kategoriUtama: option.id })}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-nude-400/20 to-nude-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -right-16 -top-16 w-32 h-32 bg-nude-400/10 rounded-full blur-2xl transform group-hover:translate-x-8 transition-transform duration-500" />
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-nude-400 to-nude-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}
                      >
                        <option.icon className="w-8 h-8 text-nude-100" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-nude-100 mb-3">{option.title}</h3>
                        <p className="text-nude-200 text-base leading-relaxed">{option.description}</p>
                      </div>
                      {formData.kategoriUtama === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-8 h-8 bg-nude-400/30 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-nude-100" />
                        </motion.div>
                      )}
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
                  <h2 className="text-2xl font-bold text-nude-100 dark:text-nude-100 mb-2">Detail Tujuan</h2>
                  <p className="text-nude-400 dark:text-nude-200">
                    {formData.kategoriUtama === "kuliah" && "Pilih universitas dan jurusan yang Anda inginkan"}
                    {formData.kategoriUtama === "bekerja" && "Jelaskan bidang pekerjaan yang Anda minati"}
                    {formData.kategoriUtama === "wirausaha" && "Jelaskan jenis usaha yang ingin Anda jalankan"}
                  </p>
                </div>

                <form className="space-y-6">
                  {formData.kategoriUtama === "kuliah" && (
                    <div className="space-y-6">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-nude-100 dark:text-nude-200 mb-2">
                              Pilihan {num} - Universitas/Institut
                            </label>
                            <input
                              type="text"
                              value={formData[`ptn${num}` as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [`ptn${num}`]: e.target.value })}
                              className="w-full px-4 py-3 bg-nude-800/20 backdrop-blur-md border border-nude-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-nude-400 focus:border-transparent transition-all duration-300 text-nude-100 dark:text-nude-100 placeholder-nude-500 shadow-inner text-sm sm:text-base"
                              placeholder="Contoh: Universitas Indonesia"
                              required={num === 1}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-nude-100 dark:text-nude-200 mb-2">
                              Pilihan {num} - Jurusan
                            </label>
                            <input
                              type="text"
                              value={formData[`jurusan${num}` as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [`jurusan${num}`]: e.target.value })}
                              className="w-full px-4 py-3 bg-nude-800/20 backdrop-blur-md border border-nude-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-nude-400 focus:border-transparent transition-all duration-300 text-nude-100 dark:text-nude-100 placeholder-nude-500 shadow-inner"
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
                      <label className="block text-sm font-medium text-nude-100 dark:text-nude-200 mb-2">
                        Detail Pekerjaan yang Diinginkan
                      </label>
                      <textarea
                        value={formData.detailBekerja}
                        onChange={(e) => setFormData({ ...formData, detailBekerja: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-nude-800/20 backdrop-blur-md border border-nude-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-nude-400 focus:border-transparent transition-all duration-300 text-nude-100 dark:text-nude-100 placeholder-nude-500 resize-none shadow-inner min-h-[150px]"
                        placeholder="Jelaskan bidang pekerjaan, posisi yang diinginkan, perusahaan target, dll."
                        required
                      />
                    </div>
                  )}

                  {formData.kategoriUtama === "wirausaha" && (
                    <div>
                      <label className="block text-sm font-medium text-nude-100 dark:text-nude-200 mb-2">Detail Rencana Wirausaha</label>
                      <textarea
                        value={formData.detailWirausaha}
                        onChange={(e) => setFormData({ ...formData, detailWirausaha: e.target.value })}
                        rows={6}
                        className="w-full px-4 py-3 bg-nude-800/20 backdrop-blur-md border border-nude-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-nude-400 focus:border-transparent transition-all duration-300 text-nude-100 dark:text-nude-100 placeholder-nude-500 resize-none shadow-inner"
                        placeholder="Jelaskan jenis usaha, target pasar, modal yang dibutuhkan, dll."
                        required
                      />
                    </div>
                  )}
                </form>

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                  <PremiumButton variant="secondary" onClick={() => setStep(1)} className="w-full sm:w-auto order-2 sm:order-1">Kembali</PremiumButton>
                  <PremiumButton onClick={() => setStep(3)} disabled={!isFormValid()} className="w-full sm:w-auto order-1 sm:order-2">Lanjutkan</PremiumButton>
                </div>
              </GlassCard>
            )}

            {/* Step 3: Konfirmasi */}
            {step === 3 && (
              <GlassCard className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-nude-100 dark:text-nude-100 mb-2">Konfirmasi Tujuan Karir</h2>
                  <p className="text-nude-400 dark:text-nude-200">Periksa kembali data Anda sebelum menyimpan</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-nude-800/20 backdrop-blur-md rounded-xl">
                    <h3 className="font-semibold text-nude-100 dark:text-nude-100 mb-4">Tujuan Utama</h3>
                    <p className="text-nude-200 dark:text-nude-200 capitalize">{formData.kategoriUtama}</p>
                  </div>

                  {formData.kategoriUtama === "kuliah" && (
                    <div className="p-6 bg-nude-800/20 backdrop-blur-md rounded-xl">
                      <h3 className="font-semibold text-nude-100 dark:text-nude-100 mb-4">Pilihan Universitas & Jurusan</h3>
                      <div className="space-y-3">
                        {[1, 2, 3].map((num) => {
                          const ptn = formData[`ptn${num}` as keyof typeof formData]
                          const jurusan = formData[`jurusan${num}` as keyof typeof formData]
                          if (ptn && jurusan) {
                            return (
                              <div key={num} className="flex justify-between items-center">
                                <span className="text-nude-300 dark:text-nude-300">Pilihan {num}:</span>
                                <span className="text-nude-100 dark:text-nude-100 font-medium">
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
                    <div className="p-6 bg-nude-800/20 backdrop-blur-md rounded-xl">
                      <h3 className="font-semibold text-nude-100 dark:text-nude-100 mb-4">Detail Pekerjaan</h3>
                      <p className="text-nude-200 dark:text-nude-200 leading-relaxed">{formData.detailBekerja}</p>
                    </div>
                  )}

                  {formData.kategoriUtama === "wirausaha" && (
                    <div className="p-6 bg-nude-800/20 backdrop-blur-md rounded-xl">
                      <h3 className="font-semibold text-nude-100 dark:text-nude-100 mb-4">Detail Wirausaha</h3>
                      <p className="text-nude-200 dark:text-nude-200 leading-relaxed">{formData.detailWirausaha}</p>
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
              <GlassCard className="p-12 text-center bg-nude-800/30 border border-nude-400/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                  className="relative w-32 h-32 mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-nude-400/30 to-nude-500/30 rounded-full blur-2xl" />
                  <div className="relative w-full h-full bg-gradient-to-br from-nude-400 to-nude-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-16 h-16 text-nude-100" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -right-4 -top-4 w-12 h-12 bg-nude-500/30 rounded-full backdrop-blur-md flex items-center justify-center"
                  >
                    <Target className="w-6 h-6 text-nude-100" />
                  </motion.div>
                </motion.div>

                <h2 className="text-3xl font-bold text-nude-100 mb-4">Tujuan Karir Tersimpan!</h2>
                <p className="text-nude-200 text-lg mb-10 max-w-2xl mx-auto">
                  Tujuan karir Anda telah berhasil disimpan. Guru BK akan menggunakan informasi ini untuk memberikan
                  bimbingan yang lebih tepat sasaran.
                </p>

                <Link href="/student/dashboard">
                  <PremiumButton className="bg-nude-500/30 hover:bg-nude-500/40 border border-nude-400/30 text-nude-100">
                    Kembali ke Dashboard
                  </PremiumButton>
                </Link>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
