"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  show?: boolean
  fullScreen?: boolean
  className?: string
  timeout?: number
}

export function LoadingScreen({ show = true, fullScreen = true, className, timeout = 5000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(show)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsVisible(show)

    // Safety timeout - force hide after specified timeout
    const safetyTimer = setTimeout(() => {
      setIsVisible(false)
    }, timeout)

    return () => {
      clearTimeout(safetyTimer)
    }
  }, [show, timeout])

  // Don't render anything on the server
  if (!mounted) return null

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50",
        fullScreen ? "fixed inset-0" : "w-full h-full min-h-[200px]",
        className,
      )}
    >
      <div className="relative w-24 h-24 animate-pulse">
        <Image src="/qr-menu-logo.png" alt="Menulya Logo" fill className="object-contain" priority />
      </div>
      <div className="mt-6 relative">
        <div className="h-1.5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="loading-bar h-full bg-primary"></div>
        </div>
      </div>
    </div>
  )
}
