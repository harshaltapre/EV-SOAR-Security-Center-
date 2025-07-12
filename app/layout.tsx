import type React from "react"
import type { Metadata } from "next"
import { Navigation } from "@/components/layout/navigation"
import "./globals.css"

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
      <body className="bg-gray-50">
        <Navigation />
        <div className="lg:pl-64">
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  )
}
