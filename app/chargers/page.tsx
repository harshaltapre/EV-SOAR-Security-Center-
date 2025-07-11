"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Zap, MapPin, Search, Plus, Settings, CheckCircle, AlertTriangle, Shield, RefreshCw, Eye } from "lucide-react"

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

export default function ChargersPage() {
  const [chargers, setChargers] = useState<ChargerStatus[]>([])
  const [filteredChargers, setFilteredChargers] = useState<ChargerStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCharger, setSelectedCharger] = useState<ChargerStatus | null>(null)

  const fetchChargers = async () => {
    try {
      const response = await fetch("/api/chargers")
      const data = await response.json()
      setChargers(data)
      setFilteredChargers(data)
    } catch (error) {
      console.error("Failed to fetch chargers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChargers()
    const interval = setInterval(fetchChargers, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = chargers

    if (searchTerm) {
      filtered = filtered.filter(
        (charger) =>
          charger.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          charger.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          charger.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((charger) => charger.status === statusFilter)
    }

    setFilteredChargers(filtered)
  }, [chargers, searchTerm, statusFilter])

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
        return <Zap className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "secure":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "threat":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading chargers...</p>
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
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              Charger Management
            </h1>
            <p className="text-gray-600 mt-1">Monitor and manage EV charging stations</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchChargers} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Charger
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{chargers.length}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Secure</p>
                  <p className="text-2xl font-bold text-green-600">
                    {chargers.filter((c) => c.status === "secure").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {chargers.filter((c) => c.status === "warning").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Threats</p>
                  <p className="text-2xl font-bold text-red-600">
                    {chargers.filter((c) => c.status === "threat").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search chargers..."
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
                  <SelectItem value="secure">Secure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="threat">Threat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Chargers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChargers.map((charger) => (
            <Card key={charger.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{charger.id}</CardTitle>
                  {getStatusIcon(charger.status)}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {charger.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Security Status</span>
                    <Badge className={getStatusBadge(charger.status)}>{charger.status.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Threat Level</span>
                    <span className={getStatusColor(charger.status)}>{charger.threatLevel}%</span>
                  </div>
                  <Progress value={charger.threatLevel} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connected EVs:</span>
                    <Badge variant="secondary">{charger.connectedVehicles}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power Output:</span>
                    <span>{charger.powerOutput}kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span>{charger.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>{charger.model}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last scan: {new Date(charger.lastScan).toLocaleString()}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedCharger(charger)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Charger Details - {selectedCharger?.id}</DialogTitle>
                        <DialogDescription>Detailed information and security status</DialogDescription>
                      </DialogHeader>
                      {selectedCharger && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Basic Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>ID:</span>
                                  <span>{selectedCharger.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Location:</span>
                                  <span>{selectedCharger.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Manufacturer:</span>
                                  <span>{selectedCharger.manufacturer}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Model:</span>
                                  <span>{selectedCharger.model}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Security Status</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Status:</span>
                                  <Badge className={getStatusBadge(selectedCharger.status)}>
                                    {selectedCharger.status.toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span>Threat Level:</span>
                                  <span className={getStatusColor(selectedCharger.status)}>
                                    {selectedCharger.threatLevel}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Last Scan:</span>
                                  <span>{new Date(selectedCharger.lastScan).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Operational Data</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span>Power Output:</span>
                                <span>{selectedCharger.powerOutput}kW</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Connected Vehicles:</span>
                                <span>{selectedCharger.connectedVehicles}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Coordinates:</span>
                                <span>
                                  {selectedCharger.coordinates.lat}, {selectedCharger.coordinates.lng}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChargers.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No chargers found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
