"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Shield, AlertTriangle, Clock, Battery, MapPin, Play, Square, Pause, DollarSign, Plug } from "lucide-react"
import { ProfileDropdown } from "@/components/profile-dropdown"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface ChargingSession {
  id: string
  chargerId: string
  vehicleId: string
  startTime: string
  endTime?: string
  status: "active" | "completed" | "interrupted" | "error"
  energyDelivered: number
  cost: number
  securityLevel: "secure" | "warning" | "threat"
  threatScore: number
  location: string
  paymentMethod: string
  sessionData: {
    maxPower: number
    avgPower: number
    peakCurrent: number
    voltage: number
    temperature: number
    efficiency: number
  }
}

interface Charger {
  id: string
  location: string
  status: "available" | "occupied" | "maintenance" | "offline"
  maxPower: number
  connectorType: string
  pricePerKwh: number
  securityLevel: "secure" | "warning" | "threat"
  distance: number
}

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeSessions, setActiveSessions] = useState<ChargingSession[]>([])
  const [sessionHistory, setSessionHistory] = useState<ChargingSession[]>([])
  const [nearbyChargers, setNearbyChargers] = useState<Charger[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("charging")

  // New session form state
  const [newSessionForm, setNewSessionForm] = useState({
    chargerId: "",
    vehicleId: "VEHICLE-001",
    paymentMethod: "credit_card",
    maxPower: 50,
  })

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "user") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
    loadUserData()
  }, [router])

  const loadUserData = async () => {
    try {
      // Load active sessions
      const activeResponse = await fetch(`/api/charging-sessions?userId=${user?.id}&status=active`)
      if (activeResponse.ok) {
        const activeData = await activeResponse.json()
        setActiveSessions(activeData.sessions || [])
      }

      // Load session history
      const historyResponse = await fetch(`/api/charging-sessions?userId=${user?.id}`)
      if (historyResponse.ok) {
        const historyData = await historyResponse.json()
        setSessionHistory(historyData.sessions || [])
      }

      // Load nearby chargers
      const chargersResponse = await fetch("/api/chargers")
      if (chargersResponse.ok) {
        const chargersData = await chargersResponse.json()
        // Mock nearby chargers with distance
        const mockNearbyChargers =
          chargersData.chargers?.map((charger: any) => ({
            ...charger,
            maxPower: Math.floor(Math.random() * 100) + 50,
            connectorType: "CCS",
            pricePerKwh: 0.35 + Math.random() * 0.15,
            distance: Math.random() * 5 + 0.5,
          })) || []
        setNearbyChargers(mockNearbyChargers)
      }
    } catch (error) {
      console.error("Failed to load user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartSession = async () => {
    try {
      const response = await fetch("/api/charging-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newSessionForm,
          userId: user?.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setActiveSessions([...activeSessions, data.session])
        setNewSessionForm({
          chargerId: "",
          vehicleId: "VEHICLE-001",
          paymentMethod: "credit_card",
          maxPower: 50,
        })
        // Refresh data
        loadUserData()
      }
    } catch (error) {
      console.error("Failed to start session:", error)
    }
  }

  const handleStopSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/charging-sessions?sessionId=${sessionId}&action=stop`, {
        method: "PUT",
      })

      if (response.ok) {
        loadUserData()
      }
    } catch (error) {
      console.error("Failed to stop session:", error)
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

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case "secure":
        return <Shield className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "threat":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600"
      case "occupied":
        return "text-blue-600"
      case "maintenance":
        return "text-yellow-600"
      case "offline":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">EV-SOAR Charging</h1>
                <p className="text-sm text-gray-500">Secure EV Charging Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">{user && <ProfileDropdown user={user} />}</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Plug className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeSessions.length}</div>
              <p className="text-xs text-muted-foreground">Currently charging</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessionHistory.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Used</CardTitle>
              <Battery className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {sessionHistory.reduce((sum, session) => sum + session.energyDelivered, 0).toFixed(1)} kWh
              </div>
              <p className="text-xs text-muted-foreground">Total consumed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${sessionHistory.reduce((sum, session) => sum + session.cost, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Alert */}
        {activeSessions.some((session) => session.securityLevel === "threat") && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              Security threat detected in one of your active charging sessions. Please review immediately.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="charging">Active Charging</TabsTrigger>
            <TabsTrigger value="start">Start Session</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="chargers">Find Chargers</TabsTrigger>
          </TabsList>

          <TabsContent value="charging" className="space-y-6">
            {activeSessions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Plug className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Sessions</h3>
                  <p className="text-gray-500 text-center mb-4">
                    You don't have any active charging sessions right now.
                  </p>
                  <Button onClick={() => setActiveTab("start")}>Start New Session</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{session.chargerId}</CardTitle>
                        <div className="flex items-center gap-2">
                          {getSecurityIcon(session.securityLevel)}
                          <Badge variant={session.status === "active" ? "default" : "secondary"} className="capitalize">
                            {session.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Security Status */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {getSecurityIcon(session.securityLevel)}
                          <span className="text-sm font-medium">Security Status</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium capitalize">{session.securityLevel}</div>
                          <div className="text-xs text-muted-foreground">Threat Score: {session.threatScore}%</div>
                        </div>
                      </div>

                      {/* Charging Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Energy Delivered</span>
                          <span className="font-medium">{session.energyDelivered.toFixed(1)} kWh</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Current Cost</span>
                          <span className="font-medium">${session.cost.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Session Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Power:</span>
                          <div className="font-medium">{session.sessionData.avgPower.toFixed(1)} kW</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Voltage:</span>
                          <div className="font-medium">{session.sessionData.voltage}V</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current:</span>
                          <div className="font-medium">{session.sessionData.peakCurrent}A</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Efficiency:</span>
                          <div className="font-medium">{(session.sessionData.efficiency * 100).toFixed(1)}%</div>
                        </div>
                      </div>

                      {/* Session Duration */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Started:</span>
                        <span>{new Date(session.startTime).toLocaleString()}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleStopSession(session.id)}
                        >
                          <Square className="h-4 w-4 mr-1" />
                          Stop
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="start" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Start New Charging Session</CardTitle>
                <CardDescription>Select a charger and configure your charging preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="charger">Select Charger</Label>
                      <Select
                        value={newSessionForm.chargerId}
                        onValueChange={(value) => setNewSessionForm((prev) => ({ ...prev, chargerId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a charger" />
                        </SelectTrigger>
                        <SelectContent>
                          {nearbyChargers
                            .filter((c) => c.status === "available")
                            .map((charger) => (
                              <SelectItem key={charger.id} value={charger.id}>
                                {charger.id} - {charger.location} ({charger.distance.toFixed(1)}km)
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Vehicle</Label>
                      <Select
                        value={newSessionForm.vehicleId}
                        onValueChange={(value) => setNewSessionForm((prev) => ({ ...prev, vehicleId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VEHICLE-001">Tesla Model 3 (ABC-123)</SelectItem>
                          <SelectItem value="VEHICLE-002">BMW i4 (XYZ-789)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment">Payment Method</Label>
                      <Select
                        value={newSessionForm.paymentMethod}
                        onValueChange={(value) => setNewSessionForm((prev) => ({ ...prev, paymentMethod: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="mobile_app">Mobile App</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxPower">Max Power (kW)</Label>
                      <Input
                        id="maxPower"
                        type="number"
                        value={newSessionForm.maxPower}
                        onChange={(e) =>
                          setNewSessionForm((prev) => ({ ...prev, maxPower: Number.parseInt(e.target.value) }))
                        }
                        min="1"
                        max="150"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {newSessionForm.chargerId && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Selected Charger</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {(() => {
                            const selectedCharger = nearbyChargers.find((c) => c.id === newSessionForm.chargerId)
                            return selectedCharger ? (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-sm">Location:</span>
                                  <span className="text-sm font-medium">{selectedCharger.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Max Power:</span>
                                  <span className="text-sm font-medium">{selectedCharger.maxPower} kW</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Price:</span>
                                  <span className="text-sm font-medium">
                                    ${selectedCharger.pricePerKwh.toFixed(2)}/kWh
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Distance:</span>
                                  <span className="text-sm font-medium">{selectedCharger.distance.toFixed(1)} km</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Security:</span>
                                  <div className="flex items-center gap-1">
                                    {getSecurityIcon(selectedCharger.securityLevel)}
                                    <span className="text-sm font-medium capitalize">
                                      {selectedCharger.securityLevel}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : null
                          })()}
                        </CardContent>
                      </Card>
                    )}

                    <Button onClick={handleStartSession} disabled={!newSessionForm.chargerId} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Charging Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Charging History</CardTitle>
                <CardDescription>Your past charging sessions and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No charging history yet</p>
                    </div>
                  ) : (
                    sessionHistory.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{session.chargerId}</h4>
                            <Badge
                              variant={session.status === "completed" ? "secondary" : "destructive"}
                              className="capitalize"
                            >
                              {session.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(session.startTime).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Energy:</span>
                            <div className="font-medium">{session.energyDelivered.toFixed(1)} kWh</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost:</span>
                            <div className="font-medium">${session.cost.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <div className="font-medium">
                              {session.endTime
                                ? Math.round(
                                    (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) /
                                      (1000 * 60),
                                  ) + " min"
                                : "Ongoing"}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Power:</span>
                            <div className="font-medium">{session.sessionData.avgPower.toFixed(1)} kW</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getSecurityIcon(session.securityLevel)}
                            <span className="text-sm capitalize">{session.securityLevel}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chargers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Chargers</CardTitle>
                <CardDescription>Find available charging stations near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyChargers.map((charger) => (
                    <Card key={charger.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{charger.id}</CardTitle>
                          <Badge
                            variant={charger.status === "available" ? "secondary" : "outline"}
                            className={`capitalize ${getStatusColor(charger.status)}`}
                          >
                            {charger.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {charger.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Max Power:</span>
                            <div className="font-medium">{charger.maxPower} kW</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Connector:</span>
                            <div className="font-medium">{charger.connectorType}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price:</span>
                            <div className="font-medium">${charger.pricePerKwh.toFixed(2)}/kWh</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Distance:</span>
                            <div className="font-medium">{charger.distance.toFixed(1)} km</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getSecurityIcon(charger.securityLevel)}
                            <span className="text-sm capitalize">{charger.securityLevel}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="w-full"
                          disabled={charger.status !== "available"}
                          onClick={() => {
                            setNewSessionForm((prev) => ({ ...prev, chargerId: charger.id }))
                            setActiveTab("start")
                          }}
                        >
                          {charger.status === "available" ? "Select Charger" : "Unavailable"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
