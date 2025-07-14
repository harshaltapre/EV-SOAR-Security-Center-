import type React from "react"
import { Navigation } from "@/components/layout/navigation"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <div className="lg:pl-64">
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </>
  )
}
