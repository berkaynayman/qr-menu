"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransparentLoadingOverlayProps {
  isLoading: boolean
  message?: string
  showLogo?: boolean
  className?: string
}

export function TransparentLoadingOverlay({
  isLoading,
  message = "Processing your request...",
  showLogo = true,
  className,
}: TransparentLoadingOverlayProps) {
  const [show, setShow] = useState(false)

  // Add a slight delay before showing the overlay to avoid flashing for quick operations
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isLoading) {
      timeout = setTimeout(() => {
        setShow(true)
      }, 300) // Show after 300ms delay
    } else {
      setShow(false)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  if (!show) return null

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-opacity duration-300",
        className,
      )}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center max-w-xs w-full">
        {showLogo && (
          <div className="relative w-16 h-16 mb-4">
            <Image src="/qr-menu-logo.png" alt="Menulya Logo" fill className="object-contain" priority />
          </div>
        )}
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
        <p className="text-center text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
