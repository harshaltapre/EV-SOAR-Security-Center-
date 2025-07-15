"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShieldAlert, BarChart, Settings, Bell, HardHat, Crown } from "lucide-react"
import { Users } from "lucide-react" // Declaring the Users variable
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuBadge } from "@/components/ui/sidebar"

interface NavProps {
  isAdmin: boolean
}

export function Navigation({ isAdmin }: NavProps) {
  const pathname = usePathname()

  const userNavItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      href: "/threats",
      icon: ShieldAlert,
      label: "Threats",
      isActive: pathname === "/threats",
      badge: 5, // Example badge
    },
    {
      href: "/analytics",
      icon: BarChart,
      label: "Analytics",
      isActive: pathname === "/analytics",
    },
    {
      href: "/hardware",
      icon: HardHat,
      label: "Hardware",
      isActive: pathname === "/hardware",
    },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
      isActive: pathname === "/notifications",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
      isActive: pathname === "/settings",
    },
  ]

  const adminNavItems = [
    {
      href: "/admin",
      icon: Crown,
      label: "Admin Dashboard",
      isActive: pathname === "/admin",
    },
    {
      href: "/users", // Assuming an admin users page
      icon: Users,
      label: "Manage Users",
      isActive: pathname === "/users",
    },
    {
      href: "/chargers", // Assuming an admin chargers page
      icon: HardHat,
      label: "Manage Chargers",
      isActive: pathname === "/chargers",
    },
    {
      href: "/threat-management", // Assuming an admin threat management page
      icon: ShieldAlert,
      label: "Threat Management",
      isActive: pathname === "/threat-management",
    },
    {
      href: "/admin-settings", // Assuming admin specific settings
      icon: Settings,
      label: "Admin Settings",
      isActive: pathname === "/admin-settings",
    },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
          {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
