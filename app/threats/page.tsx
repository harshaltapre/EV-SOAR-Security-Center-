import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShieldCheck, Trash2, RefreshCw, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ThreatsPage() {
  const mockThreats = [
    {
      id: "T001",
      type: "Unauthorized Access Attempt",
      severity: "critical",
      status: "active",
      timestamp: "2024-07-15T10:30:00Z",
      description: "Multiple failed login attempts on Charger #002 admin interface.",
    },
    {
      id: "T002",
      type: "Firmware Tampering Alert",
      severity: "high",
      status: "active",
      timestamp: "2024-07-15T09:45:00Z",
      description: "Checksum mismatch detected in Charger #001 firmware.",
    },
    {
      id: "T003",
      type: "DDoS Attack",
      severity: "medium",
      status: "resolved",
      timestamp: "2024-07-14T23:15:00Z",
      description: "Unusual traffic spike targeting API endpoint, mitigated.",
    },
    {
      id: "T004",
      type: "Malware Signature Detected",
      severity: "high",
      status: "active",
      timestamp: "2024-07-14T18:00:00Z",
      description: "Known malware signature found in log files of central server.",
    },
    {
      id: "T005",
      type: "Physical Tampering Alert",
      severity: "low",
      status: "ignored",
      timestamp: "2024-07-14T12:00:00Z",
      description: "Proximity sensor triggered at Charger #003, no further suspicious activity.",
    },
    {
      id: "T006",
      type: "Data Exfiltration Attempt",
      severity: "critical",
      status: "active",
      timestamp: "2024-07-13T08:00:00Z",
      description: "Suspicious data transfer patterns from database server.",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500 hover:bg-red-600"
      case "high":
        return "bg-orange-500 hover:bg-orange-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-red-100 text-red-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "ignored":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 p-4 md:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">Security Threats</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto bg-transparent">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <ShieldCheck className="h-4 w-4" /> Run Scan
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Currently in the system</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Requiring immediate attention</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Threats</CardTitle>
            <ShieldCheck className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Successfully mitigated</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-400">
        <CardHeader>
          <CardTitle>Threat List</CardTitle>
          <CardDescription>Detailed view of all detected security threats.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search threats..." className="pl-9 w-full" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="ignored">Ignored</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockThreats.map((threat) => (
              <Card key={threat.id} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{threat.type}</h3>
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Timestamp: {new Date(threat.timestamp).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status:{" "}
                  <span className={`font-medium ${getStatusColor(threat.status)} px-2 py-0.5 rounded-full`}>
                    {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                  </span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{threat.description}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <ShieldCheck className="h-4 w-4 mr-1" /> Resolve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Ignore
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
