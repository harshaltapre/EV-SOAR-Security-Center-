import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
              Notifications
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">View your system alerts and messages</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No New Notifications</CardTitle>
            <CardDescription>You're all caught up! Check back later for updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-8">
              <Bell className="h-12 w-12 mx-auto mb-4" />
              <p>No notifications to display at the moment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
