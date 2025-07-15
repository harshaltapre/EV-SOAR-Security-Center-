"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Example breakpoint for mobile
    }

    checkMobile() // Check on initial render
    window.addEventListener("resize", checkMobile) // Add event listener for window resize

    return () => window.removeEventListener("resize", checkMobile) // Clean up on component unmount
  }, [])

  return isMobile
}
