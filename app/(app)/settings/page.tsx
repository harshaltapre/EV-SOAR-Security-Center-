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
import { Settings, Shield, Bell, Network, Database, Key, Users, Save, RefreshCw, CheckCircle } from "lucide-react"

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
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
              System Settings
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Configure EV-SOAR security parameters</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

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
    </div>
  )
}
