import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing, Mail, MessageSquare, Zap, User } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <BellRing className="h-6 w-6 text-red-500" />
            <div>
              <p className="font-medium">Critical Security Alert: Unauthorized Access Attempt</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Detected an unusual login attempt from an unknown IP address.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Zap className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="font-medium">Charger Status Update: Charger #102 Offline</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Charger at Station A, Bay 3 is currently offline.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Yesterday, 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-blue-500" />
            <div>
              <p className="font-medium">System Update: New Features Available</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check out the latest enhancements to your dashboard.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">3 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <MessageSquare className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-medium">Support Ticket #2023-001 Resolved</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your issue regarding charger connectivity has been resolved.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">4 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-purple-500" />
            <div>
              <p className="font-medium">Welcome to EV-SOAR!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thank you for joining our secure EV charging platform.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">1 week ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
