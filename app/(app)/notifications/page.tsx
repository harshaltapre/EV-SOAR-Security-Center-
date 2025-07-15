"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Bell, Mail, MessageSquare, Zap, User } from "lucide-react" // Added Zap and User imports

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const handleSavePreferences = () => {
    // In a real application, you would send these preferences to your backend
    console.log("Notification Preferences Saved:", {
      emailNotifications,
      smsNotifications,
      inAppNotifications,
      securityAlerts,
      marketingEmails,
    })
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
      variant: "default",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Notification Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>General Notifications</CardTitle>
          <CardDescription>Control how you receive general updates and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
            <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="in-app-notifications">In-App Notifications</Label>
            </div>
            <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Receive critical alerts about your account and EV security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-red-500" />
              <Label htmlFor="security-alerts">Critical Security Alerts</Label>
            </div>
            <Switch id="security-alerts" checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marketing & Promotions</CardTitle>
          <CardDescription>Control promotional communications from EV-SOAR.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
            </div>
            <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSavePreferences} className="self-start">
        Save Preferences
      </Button>
    </div>
  )
}
