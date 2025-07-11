import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"

export const metadata: Metadata = {
  title: "EV-SOAR Security Center",
  description: "Secure EV-Charger Communication Overlay System",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
