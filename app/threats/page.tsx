"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield, Search, Eye, CheckCircle, Clock, RefreshCw } from "lucide-react"

interface ThreatAlert {
  id: string
  type: "mitm" | "malware" | "protocol_anomaly" | "unauthorized_access"
  severity: "low" | "medium" | "high" | "critical"
  charger: string
  timestamp: string
  description: string
  status: "active" | "investigating" | "resolved"
  details: string
}

export default function ThreatsPage() {
  const [threats, setThreats] = useState<ThreatAlert[]>([])
  const [filteredThreats, setFilteredThreats] = useState<ThreatAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const fetchThreats = async () => {
    try {
      const response = await fetch("/api/threats")
      const data = await response.json()
      setThreats(data)
      setFilteredThreats(data)
    } catch (error) {
      console.error("Failed to fetch threats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreats()
    const interval = setInterval(fetchThreats, 15000) // Update every 15 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = threats

    if (searchTerm) {
      filtered = filtered.filter(
        (threat) =>
          threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          threat.charger.toLowerCase().includes(searchTerm.toLowerCase()) ||
          threat.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((threat) => threat.status === statusFilter)
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((threat) => threat.severity === severityFilter)
    }

    setFilteredThreats(filtered)
  }, [threats, searchTerm, statusFilter, severityFilter])

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    }
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "investigating":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const updateThreatStatus = async (threatId: string, newStatus: string) => {
    try {
      await fetch("/api/threats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: threatId, status: newStatus }),
      })
      fetchThreats()
    } catch (error) {
      console.error("Failed to update threat status:", error)
    }
  }

  const activeThreats = threats.filter((t) => t.status === "active")

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading threats...</p>
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
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
              Threat Detection Center
            </h1>
            <p className="text-gray-600 mt-1">Monitor and respond to security threats</p>
          </div>
          <Button onClick={fetchThreats} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Active Threats Alert */}
        {activeThreats.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Active Security Threats</AlertTitle>
            <AlertDescription className="text-red-700">
              {activeThreats.length} active threat(s) require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search threats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Threats List */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Alerts ({filteredThreats.length})</CardTitle>
            <CardDescription>Security incidents and anomalies detected across the network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredThreats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No threats found matching your criteria</p>
                </div>
              ) : (
                filteredThreats.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getSeverityBadge(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                        <Badge variant="outline">{threat.type.replace("_", " ").toUpperCase()}</Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(threat.status)}
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
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(threat.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">Charger: {threat.charger}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                      <p className="text-xs text-gray-600">{threat.details}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {threat.status === "active" && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => updateThreatStatus(threat.id, "investigating")}
                        >
                          Start Investigation
                        </Button>
                      )}
                      {threat.status === "investigating" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          onClick={() => updateThreatStatus(threat.id, "resolved")}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
