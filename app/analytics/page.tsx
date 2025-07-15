import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, Users, BatteryCharging, RefreshCw, Clock } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 p-4 md:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">System Analytics</h1>
        <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto bg-transparent">
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy Delivered</CardTitle>
            <Zap className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,345 kWh</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Charging Sessions</CardTitle>
            <BatteryCharging className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,567</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Session Duration</CardTitle>
            <Clock className="h-6 w-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45.5 min</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Consistent over time</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">150</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-500">
          <CardHeader>
            <CardTitle>Energy Consumption Trend</CardTitle>
            <CardDescription>Daily energy usage over the past 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              Line Chart Placeholder (Energy)
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-600">
          <CardHeader>
            <CardTitle>Threat Trend Analysis</CardTitle>
            <CardDescription>Number of threats detected over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
              Bar Chart Placeholder (Threats)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-700">
          <CardHeader>
            <CardTitle>Charger Utilization Rate</CardTitle>
            <CardDescription>Average utilization across all chargers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Peak Hours (6 PM - 10 PM)</Label>
                <Progress value={85} className="h-2" indicatorClassName="bg-blue-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">85% utilization</p>
              </div>
              <div>
                <Label>Off-Peak Hours (12 AM - 6 AM)</Label>
                <Progress value={30} className="h-2" indicatorClassName="bg-green-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">30% utilization</p>
              </div>
              <div>
                <Label>Overall Average</Label>
                <Progress value={60} className="h-2" indicatorClassName="bg-purple-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">60% utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-800">
          <CardHeader>
            <CardTitle>Top Performing Chargers</CardTitle>
            <CardDescription>Chargers with highest energy delivery.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center justify-between">
                <span>Charger #002 (Downtown Hub B)</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  500 kWh
                </Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Charger #007 (Tech Park)</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  480 kWh
                </Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Charger #011 (Mall Entrance)</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  450 kWh
                </Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
