"use client"

import { CardDescription } from "@/components/ui/card"

import type React from "react"

import { useEffect } from "react"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Users, Activity, Zap } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

interface UserData {
  id: string
  email: string
  name?: string
  role: "admin" | "user"
  phone?: string
  vehicleInfo?: {
    make?: string
    model?: string
    year?: number
    licensePlate?: string
  }
}

interface ChargerData {
  id: string
  name: string
  status: "online" | "offline" | "charging" | "maintenance"
  location: string
  lastActivity: string
  powerOutput: number
}

interface ThreatData {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  status: "active" | "resolved" | "ignored"
  description: string
}

interface AnalyticsData {
  totalChargers: number
  activeChargers: number
  totalUsers: number
  chargingSessionsToday: number
  totalThreats: number
  resolvedThreats: number
  energyConsumed: number // kWh
  averageSessionDuration: number // minutes
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<UserData[]>([])
  const [chargers, setChargers] = useState<ChargerData[]>([])
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for new user creation
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState("")
  const [newUserTermsAccepted, setNewUserTermsAccepted] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [usersRes, chargersRes, threatsRes, analyticsRes] = await Promise.all([
        fetch("/api/auth?userType=user"), // Fetch all users (conceptual)
        fetch("/api/chargers"),
        fetch("/api/threats"),
        fetch("/api/analytics"),
      ])

      const usersData = await usersRes.json()
      const chargersData = await chargersRes.json()
      const threatsData = await threatsRes.json()
      const analyticsData = await analyticsRes.json()

      if (!usersRes.ok) throw new Error(usersData.error || "Failed to fetch users")
      if (!chargersRes.ok) throw new Error(chargersData.error || "Failed to fetch chargers")
      if (!threatsRes.ok) throw new Error(threatsData.error || "Failed to fetch threats")
      if (!analyticsRes.ok) throw new Error(analyticsData.error || "Failed to fetch analytics")

      // Filter out the hardcoded admin user from the general user list for display
      const filteredUsers = usersData.users.filter((user: UserData) => user.email !== "harshaltapre27@yahoo.com")
      setUsers(filteredUsers)
      setChargers(chargersData.chargers)
      setThreats(threatsData.threats)
      setAnalytics(analyticsData)
    } catch (err: any) {
      console.error("Failed to fetch admin data:", err)
      setError(err.message || "Failed to load data.")
      toast({
        title: "Error",
        description: err.message || "Failed to load admin data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newUserPassword !== newUserConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    if (!newUserTermsAccepted) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          termsAccepted: newUserTermsAccepted,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        toast({
          title: "User Created",
          description: data.message,
          variant: "default",
        })
        setNewUserName("")
        setNewUserEmail("")
        setNewUserPassword("")
        setNewUserConfirmPassword("")
        setNewUserTermsAccepted(false)
        fetchData() // Refresh user list
      } else {
        toast({
          title: "Error Creating User",
          description: data.error || "Failed to create user.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      console.error("Create user error:", err)
      toast({
        title: "Error",
        description: "Could not connect to server to create user.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    setLoading(true)
    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.admin.deleteUser(userId)

      if (error) {
        throw new Error(error.message || "Failed to delete user.")
      }

      toast({
        title: "User Deleted",
        description: "User account has been successfully deleted.",
        variant: "default",
      })
      fetchData() // Refresh user list
    } catch (err: any) {
      console.error("Delete user error:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to delete user.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetUserPassword = async (email: string) => {
    if (!confirm(`Are you sure you want to send a password reset link to ${email}?`)) return

    setLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Password Reset Sent",
          description: data.message,
          variant: "default",
        })
      } else {
        toast({
          title: "Error Sending Reset",
          description: data.error || "Failed to send password reset link.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      console.error("Reset password error:", err)
      toast({
        title: "Error",
        description: "Could not connect to server to send reset link.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gray-50 dark:bg-gray-950">
        <Activity className="h-12 w-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200">
        <Activity className="h-12 w-12" />
        <p className="mt-4 text-lg font-semibold">Error loading data:</p>
        <p className="text-center">{error}</p>
        <Button onClick={fetchData} className="mt-6 bg-red-600 hover:bg-red-700">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">Admin Dashboard</h1>
        <Button onClick={fetchData} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Activity className="h-4 w-4" /> Refresh Data
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <TabsTrigger value="overview" className="py-2 text-base">
            <Activity className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="py-2 text-base">
            <Users className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
          <TabsTrigger value="chargers" className="py-2 text-base">
            <Zap className="h-4 w-4 mr-2" /> Chargers
          </TabsTrigger>
          <TabsTrigger value="threats" className="py-2 text-base">
            <Activity className="h-4 w-4 mr-2" /> Threats
          </TabsTrigger>
          <TabsTrigger value="ml-models" className="py-2 text-base">
            <Zap className="h-4 w-4 mr-2" /> ML Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
                <Zap className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalChargers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{analytics?.activeChargers} active</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Registered accounts</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
                <Activity className="h-6 w-6 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalThreats}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{analytics?.resolvedThreats} resolved</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-400">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Consumed</CardTitle>
                <Zap className="h-6 w-6 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.energyConsumed?.toFixed(2)} kWh</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Avg. session: {analytics?.averageSessionDuration?.toFixed(1)} min
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-500">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of recent system events.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" /> Charger #001 started charging.
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-red-500" /> High severity threat detected on Charger #005.
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" /> New user registered: alice@example.com.
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-500" /> Security patch applied to system.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-600">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current status of core services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Database</Label>
                  <Progress value={90} className="h-2" indicatorClassName="bg-green-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">90% operational</p>
                </div>
                <div>
                  <Label>API Services</Label>
                  <Progress value={95} className="h-2" indicatorClassName="bg-green-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">95% operational</p>
                </div>
                <div>
                  <Label>ML Threat Detection</Label>
                  <Progress value={70} className="h-2" indicatorClassName="bg-yellow-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">70% operational (needs review)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-8 animate-fade-in">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Create New User
              </CardTitle>
              <CardDescription>Register a new user account for the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-user-name">Name</Label>
                  <Input
                    id="new-user-name"
                    type="text"
                    placeholder="User's Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-email">Email</Label>
                  <Input
                    id="new-user-email"
                    type="email"
                    placeholder="user@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-password">Password</Label>
                  <Input
                    id="new-user-password"
                    type="password"
                    placeholder="••••••••"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-confirm-password">Confirm Password</Label>
                  <Input
                    id="new-user-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={newUserConfirmPassword}
                    onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 col-span-full">
                  <Checkbox
                    id="new-user-terms"
                    checked={newUserTermsAccepted}
                    onCheckedChange={(checked) => setNewUserTermsAccepted(!!checked)}
                  />
                  <Label htmlFor="new-user-terms">I agree to the terms and conditions</Label>
                </div>
                <Button type="submit" className="col-span-full" disabled={loading}>
                  <Users className="h-4 w-4 mr-2" /> {loading ? "Creating..." : "Create User"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Existing Users
              </CardTitle>
              <CardDescription>Manage registered user accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-2">{user.name || "N/A"}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2 capitalize">{user.role}</td>
                          <td className="px-4 py-2 flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResetUserPassword(user.email)}
                              disabled={loading}
                            >
                              <Users className="h-4 w-4 mr-1" /> Reset Pass
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={loading}
                            >
                              <Users className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chargers" className="space-y-8 animate-fade-in">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" /> EV Chargers
              </CardTitle>
              <CardDescription>Monitor and manage connected EV charging stations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chargers.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500 py-4">No chargers found.</p>
                ) : (
                  chargers.map((charger) => (
                    <Card key={charger.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{charger.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            charger.status === "online"
                              ? "bg-green-100 text-green-800"
                              : charger.status === "charging"
                                ? "bg-blue-100 text-blue-800"
                                : charger.status === "offline"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {charger.status.charAt(0).toUpperCase() + charger.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location: {charger.location}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Activity: {new Date(charger.lastActivity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Power Output: {charger.powerOutput} kW</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Activity className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-8 animate-fade-in">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" /> Security Threats
              </CardTitle>
              <CardDescription>Review and manage detected security threats.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {threats.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500 py-4">No threats found.</p>
                ) : (
                  threats.map((threat) => (
                    <Card key={threat.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{threat.type}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            threat.severity === "critical"
                              ? "bg-red-100 text-red-800"
                              : threat.severity === "high"
                                ? "bg-orange-100 text-orange-800"
                                : threat.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Timestamp: {new Date(threat.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status: {threat.status}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{threat.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-1" /> Resolve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Activity className="h-4 w-4 mr-1" /> Ignore
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ml-models" className="space-y-8 animate-fade-in">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" /> ML Threat Detection Models
              </CardTitle>
              <CardDescription>Manage and monitor machine learning models for threat detection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-semibold text-lg mb-2">Anomaly Detection Model</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status: Online</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Trained: 2024-07-10</p>
                  <div className="mt-3">
                    <Label>Accuracy</Label>
                    <Progress value={92} className="h-2" indicatorClassName="bg-blue-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">92%</p>
                  </div>
                  <Button size="sm" className="mt-4">
                    <Activity className="h-4 w-4 mr-1" /> Configure
                  </Button>
                </Card>
                <Card className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-semibold text-lg mb-2">Behavioral Analysis Model</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status: Online</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Trained: 2024-07-05</p>
                  <div className="mt-3">
                    <Label>Accuracy</Label>
                    <Progress value={88} className="h-2" indicatorClassName="bg-purple-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">88%</p>
                  </div>
                  <Button size="sm" className="mt-4">
                    <Activity className="h-4 w-4 mr-1" /> Configure
                  </Button>
                </Card>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Model Training & Deployment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Initiate training for new models or deploy updated versions.
                </p>
                <Button>
                  <Activity className="h-4 w-4 mr-2" /> Train New Model
                </Button>
                <Button variant="outline" className="ml-2 bg-transparent">
                  <Activity className="h-4 w-4 mr-2" /> Deploy Model
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
