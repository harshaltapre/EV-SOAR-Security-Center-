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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Shield, Zap, RefreshCw, Download, BarChart3 } from "lucide-react"

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

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics")
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Generate additional mock data for charts
  const weeklyTrends = [
    { week: "Week 1", threats: 45, incidents: 12, resolved: 43 },
    { week: "Week 2", threats: 38, incidents: 8, resolved: 36 },
    { week: "Week 3", threats: 52, incidents: 15, resolved: 48 },
    { week: "Week 4", threats: 41, incidents: 9, resolved: 39 },
  ]

  const hourlyActivity = [
    { hour: "00:00", activity: 12 },
    { hour: "04:00", activity: 8 },
    { hour: "08:00", activity: 25 },
    { hour: "12:00", activity: 35 },
    { hour: "16:00", activity: 42 },
    { hour: "20:00", activity: 28 },
  ]

  const securityMetrics = [
    { metric: "Encryption Strength", value: 98, status: "excellent" },
    { metric: "Authentication Success", value: 99.2, status: "excellent" },
    { metric: "Intrusion Detection", value: 95, status: "good" },
    { metric: "Vulnerability Scan", value: 87, status: "good" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading analytics...</p>
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
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
              Security Analytics
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive security insights and trends</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchAnalytics} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Chargers</p>
                    <p className="text-2xl font-bold">{analytics.totalChargers}</p>
                    <p className="text-xs text-green-600">+2.5% from last week</p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Security Score</p>
                    <p className="text-2xl font-bold text-green-600">98.2%</p>
                    <p className="text-xs text-green-600">+0.8% improvement</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Threats Blocked</p>
                    <p className="text-2xl font-bold">{analytics.threatsBlocked}</p>
                    <p className="text-xs text-red-600">+12% this month</p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                    <p className="text-2xl font-bold">{analytics.uptime}%</p>
                    <p className="text-xs text-green-600">Above target</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Trends */}
          {analytics && (
            <Card>
              <CardHeader>
                <CardTitle>Daily Threat Detection</CardTitle>
                <CardDescription>Security incidents over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="threats" stroke="#ef4444" fill="#ef444420" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Threat Distribution */}
          {analytics && (
            <Card>
              <CardHeader>
                <CardTitle>Threat Type Distribution</CardTitle>
                <CardDescription>Breakdown of security threat categories</CardDescription>
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
          )}

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Security Trends</CardTitle>
              <CardDescription>Threats detected vs resolved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="threats" fill="#ef4444" />
                    <Bar dataKey="resolved" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Activity */}
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Activity Pattern</CardTitle>
              <CardDescription>Security events throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="activity" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Security Performance Metrics</CardTitle>
            <CardDescription>Key security indicators and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <Badge variant={metric.status === "excellent" ? "default" : "secondary"}>{metric.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Network Health */}
        {analytics && (
          <Card>
            <CardHeader>
              <CardTitle>Network Health Status</CardTitle>
              <CardDescription>Real-time network performance and security metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Latency</span>
                    <span className="font-medium">{analytics.networkHealth.latency}ms</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.latency} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: &lt;20ms</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Packet Loss</span>
                    <span className="font-medium">{analytics.networkHealth.packetLoss}%</span>
                  </div>
                  <Progress value={100 - analytics.networkHealth.packetLoss * 50} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: &lt;0.1%</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth Utilization</span>
                    <span className="font-medium">{analytics.networkHealth.bandwidth}%</span>
                  </div>
                  <Progress value={analytics.networkHealth.bandwidth} className="h-2" />
                  <p className="text-xs text-muted-foreground">Optimal range</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Encryption Coverage</span>
                    <span className="font-medium">{analytics.networkHealth.encryption}%</span>
                  </div>
                  <Progress value={analytics.networkHealth.encryption} className="h-2" />
                  <p className="text-xs text-muted-foreground">All traffic encrypted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
