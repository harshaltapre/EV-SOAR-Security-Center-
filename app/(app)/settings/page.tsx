"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Shield, Bell, Network, Database, Key, Users, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Security Settings
    threatDetectionEnabled: true,
    realTimeMonitoring: true,
    autoBlockThreats: false,
    threatSensitivity: "medium",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    slackIntegration: true,
    notificationThreshold: "medium",

    // Network Settings
    scanInterval: "30",
    connectionTimeout: "10",
    maxRetries: "3",

    // System Settings
    dataRetention: "90",
    logLevel: "info",
    backupEnabled: true,
    backupFrequency: "daily",

    // Profile Settings
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",

    // Security Settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuthentication: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    // Reset to default values
    setSettings({
      threatDetectionEnabled: true,
      realTimeMonitoring: true,
      autoBlockThreats: false,
      threatSensitivity: "medium",
      emailNotifications: true,
      smsNotifications: false,
      slackIntegration: true,
      notificationThreshold: "medium",
      scanInterval: "30",
      connectionTimeout: "10",
      maxRetries: "3",
      dataRetention: "90",
      logLevel: "info",
      backupEnabled: true,
      backupFrequency: "daily",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorAuthentication: false,
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Settings</h1>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={settings.name}
              onChange={(e) => handleSettingChange("name", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={settings.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={settings.phone}
              onChange={(e) => handleSettingChange("phone", e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save Profile</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              onChange={(e) => handleSettingChange("currentPassword", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              onChange={(e) => handleSettingChange("newPassword", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              onChange={(e) => handleSettingChange("confirmPassword", e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Change Password</Button>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorAuthentication}
              onCheckedChange={(checked) => handleSettingChange("twoFactorAuthentication", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates and alerts via email.</p>
            </div>
            <Switch
              id="email-notifications"
              defaultChecked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive critical alerts via SMS.</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Success Alert */}
      {saved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Network</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Threat Detection
              </CardTitle>
              <CardDescription>Configure security monitoring and threat detection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Real-time Threat Detection</Label>
                  <p className="text-sm text-muted-foreground">Enable continuous monitoring of OCPP communications</p>
                </div>
                <Switch
                  checked={settings.threatDetectionEnabled}
                  onCheckedChange={(checked) => handleSettingChange("threatDetectionEnabled", checked)}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Real-time Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor charger status and communications in real-time
                  </p>
                </div>
                <Switch
                  checked={settings.realTimeMonitoring}
                  onCheckedChange={(checked) => handleSettingChange("realTimeMonitoring", checked)}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Auto-block Threats</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically block detected threats without manual intervention
                  </p>
                </div>
                <Switch
                  checked={settings.autoBlockThreats}
                  onCheckedChange={(checked) => handleSettingChange("autoBlockThreats", checked)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Threat Detection Sensitivity</Label>
                <Select
                  value={settings.threatSensitivity}
                  onValueChange={(value) => handleSettingChange("threatSensitivity", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Fewer false positives</SelectItem>
                    <SelectItem value="medium">Medium - Balanced detection</SelectItem>
                    <SelectItem value="high">High - Maximum security</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Higher sensitivity may result in more false positives</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alert Notifications
              </CardTitle>
              <CardDescription>Configure how and when you receive security alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive threat alerts via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                </div>
                <Switch
                  checked={settings.slackIntegration}
                  onCheckedChange={(checked) => handleSettingChange("slackIntegration", checked)}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Notification Threshold</Label>
                <Select
                  value={settings.notificationThreshold}
                  onValueChange={(value) => handleSettingChange("notificationThreshold", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - All threats</SelectItem>
                    <SelectItem value="medium">Medium - Medium+ severity</SelectItem>
                    <SelectItem value="high">High - High+ severity only</SelectItem>
                    <SelectItem value="critical">Critical - Critical only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Only send notifications for threats above this severity level
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Settings */}
        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Network Configuration
              </CardTitle>
              <CardDescription>Configure network monitoring and connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="scanInterval">Scan Interval (seconds)</Label>
                  <Input
                    id="scanInterval"
                    type="number"
                    value={settings.scanInterval}
                    onChange={(e) => handleSettingChange("scanInterval", e.target.value)}
                    min="10"
                    max="300"
                  />
                  <p className="text-sm text-muted-foreground">How often to scan chargers for threats</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="connectionTimeout">Connection Timeout (seconds)</Label>
                  <Input
                    id="connectionTimeout"
                    type="number"
                    value={settings.connectionTimeout}
                    onChange={(e) => handleSettingChange("connectionTimeout", e.target.value)}
                    min="5"
                    max="60"
                  />
                  <p className="text-sm text-muted-foreground">Timeout for charger connections</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxRetries">Max Connection Retries</Label>
                  <Input
                    id="maxRetries"
                    type="number"
                    value={settings.maxRetries}
                    onChange={(e) => handleSettingChange("maxRetries", e.target.value)}
                    min="1"
                    max="10"
                  />
                  <p className="text-sm text-muted-foreground">Maximum retry attempts for failed connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>Configure system-wide settings and data management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                    min="30"
                    max="365"
                  />
                  <p className="text-sm text-muted-foreground">How long to keep threat and log data</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => handleSettingChange("logLevel", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error - Errors only</SelectItem>
                      <SelectItem value="warn">Warning - Warnings and errors</SelectItem>
                      <SelectItem value="info">Info - General information</SelectItem>
                      <SelectItem value="debug">Debug - Detailed debugging</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Level of detail in system logs</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic system and data backups</p>
                </div>
                <Switch
                  checked={settings.backupEnabled}
                  onCheckedChange={(checked) => handleSettingChange("backupEnabled", checked)}
                />
              </div>

              {settings.backupEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">How often to create system backups</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Keys Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integrations
              </CardTitle>
              <CardDescription>Manage external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                <Input
                  id="slackWebhook"
                  type="password"
                  placeholder="https://hooks.slack.com/services/..."
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailService">Email Service API Key</Label>
                <Input
                  id="emailService"
                  type="password"
                  placeholder="Enter your email service API key"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smsService">SMS Service API Key</Label>
                <Input
                  id="smsService"
                  type="password"
                  placeholder="Enter your SMS service API key"
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Admin Users</h4>
                    <p className="text-sm text-muted-foreground">Full system access</p>
                  </div>
                  <Badge variant="secondary">3 users</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Security Analysts</h4>
                    <p className="text-sm text-muted-foreground">Threat monitoring and response</p>
                  </div>
                  <Badge variant="secondary">8 users</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Operators</h4>
                    <p className="text-sm text-muted-foreground">Read-only access</p>
                  </div>
                  <Badge variant="secondary">12 users</Badge>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
