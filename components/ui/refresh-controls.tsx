"use client"

import { useState, memo, useMemo, useEffect } from "react"
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface RefreshControlsProps {
  onRefresh: () => void
  isRefreshing?: boolean
  lastUpdated?: Date
}

export const RefreshControls = memo(function RefreshControls({
  onRefresh,
  isRefreshing = false,
  lastUpdated,
}: RefreshControlsProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Memoize time calculations to prevent re-renders
  const getTimeAgo = useMemo(() => {
    return (date: Date) => {
      const diff = currentTime.getTime() - date.getTime()
      const seconds = Math.floor(diff / 1000)
      
      if (seconds < 60) return `${seconds} detik yang lalu`
      if (seconds < 3600) return `${Math.floor(seconds / 60)} menit yang lalu`
      return `${Math.floor(seconds / 3600)} jam yang lalu`
    }
  }, [currentTime])

  return (
    <motion.div 
      className="relative overflow-hidden cursor-pointer select-none group"
      onClick={onRefresh}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background with gradient */}
      <motion.div
        className="relative p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 ease-out w-full lg:w-56 h-full flex items-center justify-center"
        animate={{
          backgroundColor: isHovered || isRefreshing 
            ? "rgba(59, 130, 246, 0.1)" 
            : "rgba(255, 255, 255, 0.7)",
          borderColor: isHovered || isRefreshing
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(255, 255, 255, 0.3)",
          boxShadow: isHovered || isRefreshing
            ? "0 10px 40px rgba(59, 130, 246, 0.15)"
            : "0 4px 20px rgba(0, 0, 0, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Normal State - Status Display */}
        <motion.div
          className="relative flex items-center gap-3 w-full justify-center"
          animate={{
            opacity: (isHovered && !isRefreshing) ? 0 : 1,
            scale: (isHovered && !isRefreshing) ? 0.98 : 1,
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {isRefreshing ? (
            // Loading display for normal state
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
              >
                <RefreshCw className="w-5 h-5 text-indigo-600" />
              </motion.div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">
                  Memperbarui...
                </span>
                <span className="text-xs text-slate-500 truncate">
                  Sedang mengambil data
                </span>
              </div>
            </>
          ) : lastUpdated ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">
                  Data Terbaru
                </span>
                <span className="text-xs text-slate-500 truncate">
                  {getTimeAgo(lastUpdated)}
                </span>
              </div>
            </>
          ) : (
            <>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              >
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </motion.div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">
                  Belum Ada Data
                </span>
                <span className="text-xs text-slate-500 truncate">
                  Klik untuk refresh
                </span>
              </div>
            </>
          )}
        </motion.div>

        {/* Hover State - Simplified Interface */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-4"
          animate={{
            opacity: isHovered && !isRefreshing ? 1 : 0,
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center gap-2 w-full">
            {/* Simplified Refresh Button */}
            <motion.div
              className="relative w-8 h-8 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border border-indigo-200 shadow-sm"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(99, 102, 241, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <RefreshCw className="w-4 h-4 text-indigo-600" />
            </motion.div>

            {/* Simplified text */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-indigo-600 block truncate">
                Refresh Data
              </span>
              <p className="text-xs text-slate-600 truncate">
                Click to update
              </p>
            </div>
          </div>
        </motion.div>

        {/* Loading bar */}
        {isRefreshing && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
})