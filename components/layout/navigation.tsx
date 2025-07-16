"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield, Home, Zap, BarChart, Settings, Bell, HardHatIcon as Hat } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/threats", label: "Threats", icon: Shield },
    { href: "/analytics", label: "Analytics", icon: BarChart },
    { href: "/hardware", label: "Hardware", icon: Hat },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
        <Zap className="h-6 w-6" />
        <span className="sr-only">EV-SOAR</span>
      </Link>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
            pathname === item.href && "text-gray-900 dark:text-gray-50",
          )}
          prefetch={false}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
