"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export function RouteLoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Reset loading state when component mounts
  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Handle route changes
  useEffect(() => {
    let isMounted = true

    // Show loading screen when route changes
    setIsLoading(true)

    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false)
      }
    }, 800)

    // Safety timeout - force hide after 3 seconds
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false)
      }
    }, 3000)

    return () => {
      isMounted = false
      clearTimeout(timer)
      clearTimeout(safetyTimer)
    }
  }, [pathname, searchParams])

  return <>{isLoading ? <LoadingScreen /> : children}</>
}
