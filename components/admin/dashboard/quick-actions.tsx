"use client"

import { UserPlus, Plus, UsersIcon, UploadCloud } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { StudentModal } from "@/components/admin/student-modal"
import { KonselingModal } from "@/components/admin/konseling-modal"
import { KonselingBatchModal } from "@/components/admin/konseling-batch-modal"
import { ImportStudentModal } from "@/components/admin/import-student-modal-component" // Import new modal
import { useState } from "react"

interface QuickActionsProps {
  fetchDashboardData: () => void
}

export function QuickActions({ fetchDashboardData }: QuickActionsProps) {
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showKonselingModal, setShowKonselingModal] = useState(false)
  const [showKonselingBatchModal, setShowKonselingBatchModal] = useState(false)
  const [showImportStudentModal, setShowImportStudentModal] = useState(false) // New state - set to false by default

  return (
    <>
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
        <div className="space-y-4">

          <button
            onClick={() => setShowStudentModal(true)}
            className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg border-l-4 border-emerald-500"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-700">Tambah Siswa</span>
          </button>

          <button
            onClick={() => setShowImportStudentModal(true)} // Button to open import modal
            className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg border-l-4 border-blue-500" // Use blue for import
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <UploadCloud className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-700">Import Siswa (CSV)</span>
          </button>

          <button
            onClick={() => setShowKonselingModal(true)}
            className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg border-l-4 border-orange-500"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-700">Tambah Konseling</span>
          </button>

          <button
            onClick={() => setShowKonselingBatchModal(true)}
            className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-lg border-l-4 border-purple-500"
          >
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-700">Konseling Batch</span>
          </button>
        </div>
      </GlassCard>


      <StudentModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        onSuccess={fetchDashboardData}
        student={null} // QuickActions doesn't select a student, always null
      />

      <KonselingModal
        isOpen={showKonselingModal}
        onClose={() => setShowKonselingModal(false)}
        onSuccess={fetchDashboardData}
        konseling={null} // QuickActions doesn't select a konseling, always null
      />

      <KonselingBatchModal
        isOpen={showKonselingBatchModal}
        onClose={() => setShowKonselingBatchModal(false)}
        onSuccess={fetchDashboardData}
      />

      {/* New Import Student Modal */}
      <ImportStudentModal
        isOpen={showImportStudentModal}
        onClose={() => setShowImportStudentModal(false)}
        onSuccess={fetchDashboardData}
      />
    </>
  )
}