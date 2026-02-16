"use client";
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with false for SSR safety - prevents hydration mismatches
  // The actual value will be set on the client after mount
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Only check window on client-side during initialization
    if (typeof window === "undefined") {
      return false
    }
    // Get initial value immediately on client
    try {
      return window.innerWidth < MOBILE_BREAKPOINT
    } catch {
      return false
    }
  })

  React.useEffect(() => {
    // Skip if window or matchMedia is not available
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const update = () => {
      try {
        setIsMobile(mql.matches)
      } catch {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }

    // Set initial value
    update()

    // Cross-browser listeners (Safari <=14 uses addListener)
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update)
      return () => mql.removeEventListener("change", update)
    } else if (typeof (mql as any).addListener === "function") {
      ; (mql as any).addListener(update)
      return () => (mql as any).removeListener(update)
    } else {
      // Fallback: listen to window resize
      window.addEventListener("resize", update)
      return () => window.removeEventListener("resize", update)
    }
  }, [])

  return isMobile
}
