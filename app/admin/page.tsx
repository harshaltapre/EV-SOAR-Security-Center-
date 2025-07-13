"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, Bell, Settings, BarChart3, MapPin } from "lucide-react"
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
import { ProfileDropdown } from "@/components/profile-dropdown"

interface User {
  id: string
  email: string
  name: string
  role: string
  stationId?: string
  permissions: string[]
}

interface ChargerStatus {
  id: string
  location: string
  status: "secure" | "warning" | "threat"
  lastScan: string
  threatLevel: number
  connectedVehicles: number
  powerOutput: number
  temperature: number
  uptime: number
}

interface ThreatAlert {
  id: string
  type: "mitm" | "malware" | "protocol_anomaly" | "unauthorized_access" | "ddos"
  severity: "low" | "medium" | "high" | "critical"
  charger: string
  timestamp: string
  description: string
  status: "active" | "investigating" | "resolved"
  confidence: number
}

interface SystemMetrics {
  totalChargers: number
  secureChargers: number
  threatsBlocked: number
  uptime: number
  activeSessions: number
  totalEnergy: number
  revenue: number
  mlMetrics: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    totalPredictions: number
    threatsDetected: number
    falsePositives: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [chargers, setChargers] = useState<ChargerStatus[]>([])
  const [threats, setThreats] = useState<ThreatAlert[]>([])
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      // Load chargers
      const chargersResponse = await fetch("/api/chargers")
      if (chargersResponse.ok) {
        const chargersData = await chargersResponse.json()
        setChargers(chargersData.chargers || [])
      }

      // Load threats
      const threatsResponse = await fetch("/api/threats")
      if (threatsResponse.ok) {
        const threatsData = await threatsResponse.json()
        setThreats(threatsData.threats || [])
      }

      // Load analytics
      const analyticsResponse = await fetch("/api/analytics")
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setSystemMetrics(analyticsData)
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      localStorage.removeItem("user")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
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

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    }
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  // Mock data for charts
  const dailyThreatData = [
    { date: "Jan 10", threats: 12, blocked: 11 },
    { date: "Jan 11", threats: 8, blocked: 8 },
    { date: "Jan 12", threats: 15, blocked: 14 },
    { date: "Jan 13", threats: 6, blocked: 6 },
    { date: "Jan 14", threats: 9, blocked: 9 },
    { date: "Jan 15", threats: 11, blocked: 10 },
    { date: "Jan 16", threats: 7, blocked: 7 },
  ]

  const threatTypeData = [
    { name: "MITM", value: 35, color: "#ef4444" },
    { name: "Malware", value: 25, color: "#f97316" },
    { name: "Protocol", value: 22, color: "#eab308" },
    { name: "Access", value: 18, color: "#3b82f6" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">EV-SOAR Admin</h1>
                <p className="text-sm text-gray-500">Security Command Center</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              {user && <ProfileDropdown user={user} />}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics?.totalChargers || 0}</div>
              <p className="text-xs text-muted-foreground">Monitored stations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {threats.filter((t) => t.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemMetrics?.threatsBlocked || 0}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ML Accuracy</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {systemMetrics?.mlMetrics ? `${(systemMetrics.mlMetrics.accuracy * 100).toFixed(1)}%` : "0%"}
              </div>
              <p className="text-xs text-muted-foreground">Model performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Threats Alert */}
        {threats.filter((t) => t.status === "active").length > 0 && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Critical Security Alert</AlertTitle>
            <AlertDescription className="text-red-700">
              {threats.filter((t) => t.status === "active").length} active threat(s) detected. Immediate action
              required.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="chargers">Chargers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ml-models">ML Models</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threat Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Threat Detection Trends</CardTitle>
                  <CardDescription>Daily threat detection and blocking statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyThreatData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="threats" stroke="#ef4444" name="Detected" />
                      <Line type="monotone" dataKey="blocked" stroke="#22c55e" name="Blocked" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Threat Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Threat Types Distribution</CardTitle>
                  <CardDescription>Breakdown of detected threat categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={threatTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {threatTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Network Latency</span>
                      <span className="text-sm text-green-600">12ms</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">System Uptime</span>
                      <span className="text-sm text-green-600">99.7%</span>
                    </div>
                    <Progress value={99.7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Bandwidth Usage</span>
                      <span className="text-sm text-yellow-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Threat Monitoring</CardTitle>
                <CardDescription>Real-time security threat detection and response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityBadge(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                          <Badge variant="outline">{threat.type.replace("_", " ").toUpperCase()}</Badge>
                          <Badge variant="secondary">{Math.round(threat.confidence * 100)}% confidence</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{threat.timestamp}</span>
                      </div>

                      <div>
                        <p className="font-medium">Charger: {threat.charger}</p>
                        <p className="text-sm text-muted-foreground mt-1">{threat.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            threat.status === "active"
                              ? "destructive"
                              : threat.status === "investigating"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {threat.status.toUpperCase()}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {threat.status === "active" && (
                            <Button size="sm" variant="destructive">
                              Isolate Charger
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chargers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chargers.map((charger) => (
                <Card key={charger.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{charger.id}</CardTitle>
                      {getStatusIcon(charger.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {charger.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Threat Level</span>
                        <span className={getStatusColor(charger.status)}>{charger.threatLevel}%</span>
                      </div>
                      <Progress value={charger.threatLevel} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Connected EVs:</span>
                        <div className="font-medium">{charger.connectedVehicles}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Power Output:</span>
                        <div className="font-medium">{charger.powerOutput}kW</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Temperature:</span>
                        <div className="font-medium">{charger.temperature}°C</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>
                        <div className="font-medium">{charger.uptime}%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Last Scan:</span>
                      <span>{charger.lastScan}</span>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span className="text-green-600">12ms avg</span>
                    </div>
                    <Progress value={88} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Throughput</span>
                      <span className="text-blue-600">1,250 req/s</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Error Rate</span>
                      <span className="text-green-600">0.02%</span>
                    </div>
                    <Progress value={2} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      ${systemMetrics?.revenue?.toLocaleString() || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-semibold">{systemMetrics?.activeSessions || 0}</div>
                      <p className="text-muted-foreground">Active Sessions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">
                        {systemMetrics?.totalEnergy?.toLocaleString() || 0} kWh
                      </div>
                      <p className="text-muted-foreground">Energy Delivered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ml-models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>AI threat detection model metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemMetrics?.mlMetrics && (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Accuracy</span>
                          <span className="font-medium">{(systemMetrics.mlMetrics.accuracy * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={systemMetrics.mlMetrics.accuracy * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Precision</span>
                          <span className="font-medium">{(systemMetrics.mlMetrics.precision * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={systemMetrics.mlMetrics.precision * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Recall</span>
                          <span className="font-medium">{(systemMetrics.mlMetrics.recall * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={systemMetrics.mlMetrics.recall * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>F1 Score</span>
                          <span className="font-medium">{(systemMetrics.mlMetrics.f1Score * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={systemMetrics.mlMetrics.f1Score * 100} />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemMetrics?.mlMetrics && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {systemMetrics.mlMetrics.totalPredictions.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Predictions</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {systemMetrics.mlMetrics.threatsDetected.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Threats Detected</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {systemMetrics.mlMetrics.falsePositives}
                        </div>
                        <p className="text-sm text-muted-foreground">False Positives</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {(
                            (systemMetrics.mlMetrics.threatsDetected / systemMetrics.mlMetrics.totalPredictions) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                        <p className="text-sm text-muted-foreground">Detection Rate</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Model Training History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Threat Detection Model v1.2.3</h4>
                        <p className="text-sm text-muted-foreground">Deployed: Jan 15, 2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Enhanced ensemble model with improved MITM detection capabilities</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 opacity-75">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Threat Detection Model v1.1.8</h4>
                        <p className="text-sm text-muted-foreground">Deployed: Dec 20, 2023</p>
                      </div>
                      <Badge variant="secondary">Archived</Badge>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Previous version with 91.2% accuracy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
