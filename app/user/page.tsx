import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { BatteryCharging, Clock, DollarSign, Zap } from "lucide-react"

export default function UserPage() {
  const chargingHistory = [
    { id: "S001", charger: "Station A", date: "2023-10-25", duration: "1h 30m", energy: "15 kWh", cost: "$4.50" },
    { id: "S002", charger: "Station B", date: "2023-10-24", duration: "2h 00m", energy: "20 kWh", cost: "$6.00" },
    { id: "S003", charger: "Station A", date: "2023-10-23", duration: "0h 45m", energy: "8 kWh", cost: "$2.40" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">User Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, John Doe! Manage your charging and profile.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in">
          <CardHeader>
            <CardTitle>Current Charging Session</CardTitle>
            <CardDescription>No active charging session.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[150px] text-gray-500 dark:text-gray-400">
            <BatteryCharging className="h-12 w-12 mb-2" />
            <p>Start a new session at your nearest station.</p>
            <Button className="mt-4">Find Charger</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-100">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your current balance for charging.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[150px]">
            <DollarSign className="h-12 w-12 text-green-500 mb-2" />
            <div className="text-4xl font-bold text-green-600">$50.00</div>
            <Button className="mt-4">Top Up</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-200">
          <CardHeader>
            <CardTitle>Charging History</CardTitle>
            <CardDescription>Your past charging sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session ID</TableHead>
                    <TableHead>Charger</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Energy</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chargingHistory.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.id}</TableCell>
                      <TableCell>{session.charger}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell className="flex items-center gap-1"><Clock className="h-4 w-4" />{session.duration}</TableCell>
                      <TableCell className="flex items-center gap-1"><Zap className="h-4 w-4" />{session.energy}</TableCell>
                      <TableCell className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{session.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button variant="outline" className="mt-4 w-full bg-transparent">View All History</Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in delay-300">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal and vehicle details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleMake">Vehicle Make</Label>
              <Input id="vehicleMake" defaultValue="Tesla" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input id="vehicleModel" defaultValue="Model 3" />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
