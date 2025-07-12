"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, TrendingUp, MapPin, Wifi, Server } from "lucide-react"

interface ChargerData {
  id: string
  location: string
  status: "secure" | "warning" | "threat"
  lastScan: string
  threatLevel: number
  connectedVehicles: number
  coordinates: { lat: number; lng: number }
  model: string
  firmware: string
  uptime: number
}

interface AnalyticsData {
  totalChargers: number
  secureChargers: number
  threatsBlocked: number
  uptime: number
  dailyStats: Array<{
    date: string
    threats: number
    blocked: number
    uptime: number
  }>
  threatTypes: Array<{
    type: string
    count: number
    percentage: number
  }>
  networkHealth: {
    latency: number
    packetLoss: number
    bandwidth: number
    connections: number
  }
}

export default function DashboardPage() {
  const [chargers, setChargers] = useState<ChargerData[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [chargersRes, analyticsRes] = await Promise.all([fetch("/api/chargers"), fetch("/api/analytics")])

      const chargersData = await chargersRes.json()
      const analyticsData = await analyticsRes.json()

      setChargers(chargersData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              EV-SOAR Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Real-time security monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalChargers}</div>
                <p className="text-xs text-muted-foreground">Monitored stations</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Secure Chargers</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analytics.secureChargers}</div>
                <p className="text-xs text-muted-foreground">
                  {((analytics.secureChargers / analytics.totalChargers) * 100).toFixed(1)}% secure
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.threatsBlocked}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.uptime}%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Network Health */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Latency</span>
                    <span className="text-green-600">{analytics.networkHealth.latency}ms</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.latency} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth Usage</span>
                    <span className="text-blue-600">{analytics.networkHealth.bandwidth}%</span>
                  </div>
                  <Progress value={analytics.networkHealth.bandwidth} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Packet Loss</span>
                    <span className="text-green-600">{analytics.networkHealth.packetLoss}%</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.packetLoss * 50} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Threat Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.threatTypes.map((threat) => (
                    <div key={threat.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium">{threat.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{threat.count}</span>
                        <Badge variant="secondary">{threat.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charger Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Charger Status Overview</CardTitle>
            <CardDescription>Real-time status of all monitored charging stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {chargers.map((charger) => (
                <Card key={charger.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{charger.id}</CardTitle>
                      {getStatusIcon(charger.status)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {charger.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Threat Level</span>
                        <span className={getStatusColor(charger.status)}>{charger.threatLevel}%</span>
                      </div>
                      <Progress value={charger.threatLevel} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">EVs:</span>
                        <Badge variant="secondary" className="ml-1">
                          {charger.connectedVehicles}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="ml-1 text-green-600">{charger.uptime}%</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div>Model: {charger.model}</div>
                      <div>Firmware: {charger.firmware}</div>
                      <div>Last scan: {new Date(charger.lastScan).toLocaleTimeString()}</div>
                    </div>

                    <Button
                      size="sm"
                      variant={charger.status === "threat" ? "destructive" : "outline"}
                      className="w-full"
                    >
                      {charger.status === "threat" ? "Investigate" : "View Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
