import type { ReactNode } from "react"
import { Navigation } from "@/components/layout/navigation"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Toaster } from "@/components/ui/toaster"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-900 md:px-6">
        <Navigation />
        <ProfileDropdown />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
      <Toaster />
    </div>
  )
}
