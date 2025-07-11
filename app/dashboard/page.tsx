"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, TrendingUp, RefreshCw, MapPin } from "lucide-react"

interface ChargerStatus {
  id: string
  location: string
  status: "secure" | "warning" | "threat"
  lastScan: string
  threatLevel: number
  connectedVehicles: number
  coordinates: { lat: number; lng: number }
  powerOutput: number
  manufacturer: string
  model: string
}

interface Analytics {
  totalChargers: number
  secureChargers: number
  threatsBlocked: number
  uptime: number
  dailyStats: Array<{ date: string; threats: number; chargers: number }>
  threatTypes: Array<{ type: string; count: number; percentage: number }>
  networkHealth: {
    latency: number
    packetLoss: number
    bandwidth: number
    encryption: number
  }
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"]

export default function DashboardPage() {
  const [chargers, setChargers] = useState<ChargerStatus[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const fetchData = async () => {
    try {
      const [chargersRes, analyticsRes] = await Promise.all([fetch("/api/chargers"), fetch("/api/analytics")])

      const chargersData = await chargersRes.json()
      const analyticsData = await analyticsRes.json()

      setChargers(chargersData)
      setAnalytics(analyticsData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              EV-SOAR Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Real-time security monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Button onClick={fetchData} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Overview Cards */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{analytics.totalChargers}</div>
                <p className="text-xs text-muted-foreground">Monitored stations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Secure</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-green-600">{analytics.secureChargers}</div>
                <p className="text-xs text-muted-foreground">
                  {((analytics.secureChargers / analytics.totalChargers) * 100).toFixed(1)}% secure
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{analytics.threatsBlocked}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{analytics.uptime}%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Trends</CardTitle>
                <CardDescription>Daily threat detection over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
                <CardDescription>Types of security threats detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.threatTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.threatTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Network Health */}
        {analytics && (
          <Card>
            <CardHeader>
              <CardTitle>Network Health Metrics</CardTitle>
              <CardDescription>Real-time network performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Latency</span>
                    <span>{analytics.networkHealth.latency}ms</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.latency} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Packet Loss</span>
                    <span>{analytics.networkHealth.packetLoss}%</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.packetLoss * 50} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth</span>
                    <span>{analytics.networkHealth.bandwidth}%</span>
                  </div>
                  <Progress value={analytics.networkHealth.bandwidth} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Encryption</span>
                    <span>{analytics.networkHealth.encryption}%</span>
                  </div>
                  <Progress value={analytics.networkHealth.encryption} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charger Status Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Charger Status Overview</CardTitle>
            <CardDescription>Real-time status of all monitored charging stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {chargers.map((charger) => (
                <div key={charger.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{charger.id}</h3>
                    {getStatusIcon(charger.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {charger.location}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Threat Level</span>
                        <span className={getStatusColor(charger.status)}>{charger.threatLevel}%</span>
                      </div>
                      <Progress value={charger.threatLevel} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Connected EVs:</span>
                      <Badge variant="secondary">{charger.connectedVehicles}</Badge>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Power:</span>
                      <span>{charger.powerOutput}kW</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last scan: {new Date(charger.lastScan).toLocaleTimeString()}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={charger.status === "threat" ? "destructive" : "outline"}
                    className="w-full"
                  >
                    {charger.status === "threat" ? "Investigate" : "View Details"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleString()}</div>
      </div>
    </div>
  )
}
