import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BatteryCharging,
  MapPin,
  Activity,
  RefreshCw,
  Filter,
  Search,
  Settings,
  Power,
  PlusCircle,
  AlertTriangle,
  Trash2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HardwarePage() {
  const mockChargers = [
    {
      id: "C001",
      name: "Main Station A",
      status: "online",
      location: "123 Electric Ave, Cityville",
      lastActivity: "2024-07-15T10:30:00Z",
      powerOutput: 22, // kW
      model: "EVCharge Pro 22",
      firmwareVersion: "1.2.5",
    },
    {
      id: "C002",
      name: "Downtown Hub B",
      status: "charging",
      location: "456 City Center Blvd, Metropolis",
      lastActivity: "2024-07-15T09:45:00Z",
      powerOutput: 50, // kW
      model: "FastCharge X50",
      firmwareVersion: "2.0.1",
    },
    {
      id: "C003",
      name: "Suburban Point C",
      status: "offline",
      location: "789 Oak Street, Suburbia",
      lastActivity: "2024-07-14T23:15:00Z",
      powerOutput: 0, // kW
      model: "HomeCharge Lite",
      firmwareVersion: "1.0.0",
    },
    {
      id: "C004",
      name: "Industrial Park D",
      status: "maintenance",
      location: "101 Factory Rd, Industrial Zone",
      lastActivity: "2024-07-14T18:00:00Z",
      powerOutput: 0, // kW
      model: "MegaCharge 100",
      firmwareVersion: "1.5.0",
    },
    {
      id: "C005",
      name: "University Campus E",
      status: "online",
      location: "Campus Drive, University City",
      lastActivity: "2024-07-15T08:00:00Z",
      powerOutput: 22, // kW
      model: "EVCharge Pro 22",
      firmwareVersion: "1.2.5",
    },
    {
      id: "C006",
      name: "Shopping Mall F",
      status: "online",
      location: "Mall Plaza, Retail Town",
      lastActivity: "2024-07-15T07:30:00Z",
      powerOutput: 50, // kW
      model: "FastCharge X50",
      firmwareVersion: "2.0.1",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "bg-green-100 text-green-800"
      case "charging":
        return "bg-blue-100 text-blue-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 p-4 md:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">Hardware Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto bg-transparent">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" /> Add Charger
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chargers</CardTitle>
            <BatteryCharging className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Currently managed</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Chargers</CardTitle>
            <Power className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ready for use</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline / Maintenance</CardTitle>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Requiring attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-400">
        <CardHeader>
          <CardTitle>Charger List</CardTitle>
          <CardDescription>Detailed view and management of all EV charging stations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chargers..." className="pl-9 w-full" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="EVCharge Pro 22">EVCharge Pro 22</SelectItem>
                <SelectItem value="FastCharge X50">FastCharge X50</SelectItem>
                <SelectItem value="HomeCharge Lite">HomeCharge Lite</SelectItem>
                <SelectItem value="MegaCharge 100">MegaCharge 100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockChargers.map((charger) => (
              <Card key={charger.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{charger.name}</h3>
                  <Badge className={getStatusColor(charger.status)}>
                    {charger.status.charAt(0).toUpperCase() + charger.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {charger.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Activity className="h-4 w-4" /> Last Activity: {new Date(charger.lastActivity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Power Output: {charger.powerOutput} kW</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Model: {charger.model}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Firmware: {charger.firmwareVersion}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" /> Manage
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
