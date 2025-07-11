"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
  Cpu,
  Network,
  Lock,
  Eye,
  TrendingUp,
  Server,
  Wifi,
} from "lucide-react"

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              EV-SOAR Security Center
            </h1>
            <p className="text-gray-600 mt-1">Secure EV-Charger Communication Overlay</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalChargers}</div>
              <p className="text-xs text-muted-foreground">Monitored stations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Secure Chargers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStats.secureChargers}</div>
              <p className="text-xs text-muted-foreground">
                {((systemStats.secureChargers / systemStats.totalChargers) * 100).toFixed(1)}% secure
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.threatsBlocked}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.uptime}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
            <TabsTrigger value="threats">Threat Detection</TabsTrigger>
            <TabsTrigger value="hardware">Hardware Status</TabsTrigger>
            <TabsTrigger value="architecture">System Architecture</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            {/* Active Threats Alert */}
            {threats.filter((t) => t.status === "active").length > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Active Security Threats Detected</AlertTitle>
                <AlertDescription className="text-red-700">
                  {threats.filter((t) => t.status === "active").length} active threat(s) require immediate attention.
                </AlertDescription>
              </Alert>
            )}

            {/* Charger Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chargers.map((charger) => (
                <Card key={charger.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{charger.id}</CardTitle>
                      {getStatusIcon(charger.status)}
                    </div>
                    <CardDescription>{charger.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
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

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Detection & Response</CardTitle>
                <CardDescription>AI-powered security monitoring and incident management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityBadge(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                          <Badge variant="outline">{threat.type.replace("_", " ").toUpperCase()}</Badge>
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
                          {threat.status === "active" && <Button size="sm">Respond</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Hardware Security Modules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>TPM 2.0 Chips</span>
                      <Badge className="bg-green-100 text-green-800">247 Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Secure Elements</span>
                      <Badge className="bg-green-100 text-green-800">247 Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Edge AI Processors</span>
                      <Badge className="bg-green-100 text-green-800">247 Running</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Network Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>VPN Tunnels</span>
                      <Badge className="bg-green-100 text-green-800">247 Secure</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>TLS 1.3 Connections</span>
                      <Badge className="bg-green-100 text-green-800">100% Encrypted</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificate Status</span>
                      <Badge className="bg-green-100 text-green-800">All Valid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hardware Component Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Server className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">Edge Gateways</h3>
                    <p className="text-2xl font-bold text-green-600">247</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-medium">Crypto Modules</h3>
                    <p className="text-2xl font-bold text-green-600">247</p>
                    <p className="text-sm text-muted-foreground">Operational</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Wifi className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">5G Modules</h3>
                    <p className="text-2xl font-bold text-green-600">247</p>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>EV-SOAR System Architecture</CardTitle>
                <CardDescription>Comprehensive security overlay for EV charging infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Hardware Components</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-blue-600 mb-2">Security Hardware</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• TPM 2.0 Trusted Platform Module</li>
                          <li>• Hardware Security Module (HSM)</li>
                          <li>• Secure Element (SE) chips</li>
                          <li>• Hardware-based random number generator</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Processing & Connectivity</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• ARM Cortex-A78 Edge AI processor</li>
                          <li>• 5G/LTE-M cellular module</li>
                          <li>• Wi-Fi 6E with WPA3 security</li>
                          <li>• Ethernet with IEEE 802.1X</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Software Stack</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-purple-600 mb-2">AI Security Engine</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Real-time anomaly detection</li>
                          <li>• Machine learning threat classification</li>
                          <li>• Behavioral analysis algorithms</li>
                          <li>• Predictive threat modeling</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-600 mb-2">Protocol Security</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• OCPP 2.0.1 with security extensions</li>
                          <li>• TLS 1.3 with mutual authentication</li>
                          <li>• Certificate-based device identity</li>
                          <li>• End-to-end message encryption</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold mb-4 text-blue-800">Key Security Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-medium">Deep Packet Inspection</h4>
                        <p className="text-sm text-muted-foreground">Real-time OCPP traffic analysis</p>
                      </div>
                      <div className="text-center">
                        <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-medium">Zero Trust Architecture</h4>
                        <p className="text-sm text-muted-foreground">Continuous verification</p>
                      </div>
                      <div className="text-center">
                        <Activity className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h4 className="font-medium">AI Threat Detection</h4>
                        <p className="text-sm text-muted-foreground">ML-powered security</p>
                      </div>
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
