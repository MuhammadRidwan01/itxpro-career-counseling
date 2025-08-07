import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-[hsl(var(--glass-white))] border border-white/20 rounded-2xl shadow-xl",
        hover && "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[hsl(var(--glass-nude))]",
        className,
      )}
    >
      {children}
    </div>
  )
}
