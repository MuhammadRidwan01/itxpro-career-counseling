import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "outline-glass"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export function PremiumButton({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-gradient-button text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
    secondary:
      "bg-glass-white backdrop-blur-md border border-white/20 text-nude-800 hover:bg-glass-nude hover:scale-105",
    ghost: "text-nude-700 hover:bg-glass-nude hover:scale-105",
    "outline-glass": "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:scale-105",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}
