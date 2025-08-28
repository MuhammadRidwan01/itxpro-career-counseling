import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: "default" | "tinted"
}

export function GlassCard({ children, className, hover = false, variant = "default" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-md rounded-2xl shadow-xl",
        variant === "default" && "bg-[hsl(var(--glass-white))] border border-white/20",
        variant === "tinted" && "bg-[hsl(var(--glass-nude-dark))] border border-nude-600/20",
        hover && "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[hsl(var(--glass-nude))]",
        className,
      )}
    >
      {children}
    </div>
  )
}
