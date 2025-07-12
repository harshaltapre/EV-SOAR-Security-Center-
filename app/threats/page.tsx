"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield, Search, Filter, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ThreatData {
  id: string
  type: "mitm" | "malware" | "protocol_anomaly" | "unauthorized_access"
  severity: "low" | "medium" | "high" | "critical"
  charger: string
  timestamp: string
  description: string
  status: "active" | "investigating" | "resolved"
  details: {
    [key: string]: any
  }
}

export default function ThreatsPage() {
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [filteredThreats, setFilteredThreats] = useState<ThreatData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  useEffect(() => {
    fetchThreats()
    const interval = setInterval(fetchThreats, 15000) // Refresh every 15 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterThreats()
  }, [threats, searchTerm, statusFilter, severityFilter])

  const fetchThreats = async () => {
    try {
      const response = await fetch("/api/threats")
      const data = await response.json()
      setThreats(data)
    } catch (error) {
      console.error("Failed to fetch threats:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterThreats = () => {
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
  }

  const updateThreatStatus = async (threatId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/threats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: threatId, status: newStatus }),
      })

      if (response.ok) {
        fetchThreats()
      }
    } catch (error) {
      console.error("Failed to update threat status:", error)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "investigating":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const activeThreats = threats.filter((t) => t.status === "active")

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
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
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              Threat Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor and respond to security threats</p>
          </div>
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
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search threats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
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
                <SelectTrigger>
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

              <div className="text-sm text-muted-foreground flex items-center">
                Showing {filteredThreats.length} of {threats.length} threats
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Threats List */}
        <div className="space-y-4">
          {filteredThreats.map((threat) => (
            <Card key={threat.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(threat.status)}
                      <div>
                        <h3 className="font-semibold text-lg">{threat.id}</h3>
                        <p className="text-sm text-muted-foreground">{new Date(threat.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getSeverityBadge(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                      <Badge variant="outline">{threat.type.replace("_", " ").toUpperCase()}</Badge>
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

                  {/* Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Description</h4>
                        <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">Affected Charger</h4>
                        <p className="text-sm text-gray-600 mt-1">{threat.charger}</p>
                      </div>

                      {/* Technical Details */}
                      <div>
                        <h4 className="font-medium text-gray-900">Technical Details</h4>
                        <div className="mt-2 space-y-1">
                          {Object.entries(threat.details).map(([key, value]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-sm">
                              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                              <span className="text-gray-600 sm:text-right">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Actions</h4>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>

                        {threat.status === "active" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="w-full"
                            onClick={() => updateThreatStatus(threat.id, "investigating")}
                          >
                            Start Investigation
                          </Button>
                        )}

                        {threat.status === "investigating" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="w-full"
                            onClick={() => updateThreatStatus(threat.id, "resolved")}
                          >
                            Mark Resolved
                          </Button>
                        )}

                        {threat.status === "resolved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => updateThreatStatus(threat.id, "active")}
                          >
                            Reopen
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredThreats.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No threats found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" || severityFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "Your system is secure. No threats detected."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
