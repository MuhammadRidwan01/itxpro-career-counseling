"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Users } from "lucide-react";
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
         
          <Link href="/">
            <PremiumButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </PremiumButton>
          </Link>
          <GlassCard hover className="p-10 m-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Bimbingan Konseling Karir
                <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  SMK ITXPRO 
                </span>
              </h1>
              <p className="text-xl font-semibold flex text-start  text-white/90 mb-12 leading-relaxed"
                
              >
                Selamat datang di halaman Bimbingan Konseling Karir SMK Pesat! <br/><br/>
                Kami hadir sebagai wadah pendampingan bagi siswa dalam
                merencanakan masa depan karier mereka secara matang dan terarah.
                Layanan Bimbingan Konseling Karir di SMK Pesat bertujuan untuk
                membantu siswa mengenali potensi diri, minat, dan bakat mereka,
                serta mengarahkan pada pilihan karier yang sesuai dengan
                perkembangan dunia kerja dan kebutuhan industri.  <br/><br/>
                Melalui berbagai program seperti konseling individu, workshop karir,
                seminar pengembangan diri, dan pelatihan keterampilan kerja,
                kami berkomitmen untuk membekali siswa dengan wawasan dan
                kesiapan menghadapi dunia kerja atau melanjutkan studi ke
                jenjang yang lebih tinggi. <br/><br/> Kami percaya bahwa setiap siswa
                memiliki potensi untuk sukses di bidangnya masing-masing. Dengan
                dukungan yang tepat, mereka akan mampu mengambil keputusan karir
                yang bijak dan membangun masa depan yang cerah. Mari
                bersama-sama merancang masa depan yang lebih baik!
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>
        {/* Konten bisa ditambahkan di sini */}
      </div>
    </div>
  );
}
