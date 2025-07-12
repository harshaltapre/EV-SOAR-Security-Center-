"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, Cpu, Network, Lock, Eye, TrendingUp, Server, Wifi } from 'lucide-react'

interface ChargerStatus {
  id: string
  location: string
  status: "secure" | "warning" | "threat"
  lastScan: string
  threatLevel: number
  connectedVehicles: number
}

interface ThreatAlert {
  id: string
  type: "mitm" | "malware" | "protocol_anomaly" | "unauthorized_access"
  severity: "low" | "medium" | "high" | "critical"
  charger: string
  timestamp: string
  description: string
  status: "active" | "investigating" | "resolved"
}

export default function EVSOARDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push("/login")
  }, [router])

  const [chargers, setChargers] = useState<ChargerStatus[]>([
    {
      id: "CHG-001",
      location: "Downtown Mall",
      status: "secure",
      lastScan: "2 min ago",
      threatLevel: 5,
      connectedVehicles: 3,
    },
    {
      id: "CHG-002",
      location: "Airport Terminal",
      status: "warning",
      lastScan: "1 min ago",
      threatLevel: 35,
      connectedVehicles: 7,
    },
    {
      id: "CHG-003",
      location: "Shopping Center",
      status: "threat",
      lastScan: "30 sec ago",
      threatLevel: 85,
      connectedVehicles: 2,
    },
    {
      id: "CHG-004",
      location: "Office Complex",
      status: "secure",
      lastScan: "3 min ago",
      threatLevel: 10,
      connectedVehicles: 5,
    },
  ])

  const [threats, setThreats] = useState<ThreatAlert[]>([
    {
      id: "THR-001",
      type: "mitm",
      severity: "critical",
      charger: "CHG-003",
      timestamp: "2 min ago",
      description: "Potential man-in-the-middle attack detected on OCPP communication",
      status: "active",
    },
    {
      id: "THR-002",
      type: "protocol_anomaly",
      severity: "medium",
      charger: "CHG-002",
      timestamp: "5 min ago",
      description: "Unusual OCPP message patterns detected",
      status: "investigating",
    },
    {
      id: "THR-003",
      type: "malware",
      severity: "high",
      charger: "CHG-001",
      timestamp: "1 hour ago",
      description: "Suspicious firmware modification attempt blocked",
      status: "resolved",
    },
  ])

  const [systemStats, setSystemStats] = useState({
    totalChargers: 247,
    secureChargers: 198,
    threatsBlocked: 1247,
    uptime: 99.7,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "threat":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "threat":
        return <Shield className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    }
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  )
}
