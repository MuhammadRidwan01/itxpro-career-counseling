import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility untuk extract angkatan dari NIS
export function extractAngkatanFromNIS(nis: string): number {
  // Format NIS: 252610002 -> angkatan 2025
  // Format NIS: 232410005 -> angkatan 2023
  const yearPrefix = nis.substring(0, 4)
  return Number.parseInt(yearPrefix.substring(0, 2)) + 2000
}

// Utility untuk validasi NIS
export function validateNIS(nis: string): boolean {
  return /^\d{9}$/.test(nis)
}

// Utility untuk format nama kelas
export function formatKelas(kelas: string): string {
  return kelas.replace(/\s+/g, " ").trim()
}
