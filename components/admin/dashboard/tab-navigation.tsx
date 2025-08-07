"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { BarChart3, Users, MessageSquare, Briefcase } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="mb-6">
      <GlassCard className="p-2">
        <div className="flex space-x-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "students", label: "Siswa", icon: Users },
            { id: "konseling", label: "Konseling", icon: MessageSquare },
            { id: "career", label: "Karir", icon: Briefcase },
            { id: "statistics", label: "Statistik", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id ? "bg-gradient-button text-white shadow-lg" : "text-slate-700 hover:bg-white/20"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}