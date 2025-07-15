import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BatteryCharging, Zap, ShieldCheck, Activity, MapPin, AlertTriangle, Gauge, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chargers</CardTitle>
            <BatteryCharging className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120 / 150</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Delivered (Today)</CardTitle>
            <Zap className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234 kWh</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3 Active</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">1 critical, 2 high severity</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Gauge className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Excellent</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">All services operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-500">
          <CardHeader>
            <CardTitle>Charger Network Map</CardTitle>
            <CardDescription>Geographical overview of charging stations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              <MapPin className="h-12 w-12 mr-2" /> Map Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-600">
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
            <CardDescription>Latest events across the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" /> Charger #005 started charging.
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> High severity threat detected on Charger #012.
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" /> New user registered: jane.doe@example.com.
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-500" /> Security patch applied to system.
              </li>
              <li className="flex items-center gap-2">
                <BatteryCharging className="h-4 w-4 text-blue-500" /> Charger #008 completed charging session.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-700">
          <CardHeader>
            <CardTitle>Charging Session Trends</CardTitle>
            <CardDescription>Daily charging activity over the past week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-800">
          <CardHeader>
            <CardTitle>Threat Level Overview</CardTitle>
            <CardDescription>Distribution of threats by severity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              Pie Chart Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
