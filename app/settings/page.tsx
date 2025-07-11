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
import { Settings, Shield, Bell, Users, Database, Network, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Security Settings
    threatDetectionEnabled: true,
    realTimeMonitoring: true,
    autoResponse: false,
    encryptionLevel: "AES-256",
    certificateValidation: true,

    // Notification Settings
    emailAlerts: true,
    smsAlerts: false,
    slackIntegration: true,
    alertThreshold: "medium",

    // System Settings
    scanInterval: "30",
    dataRetention: "90",
    backupFrequency: "daily",
    logLevel: "info",

    // Network Settings
    vpnEnabled: true,
    firewallRules: "strict",
    portScanning: true,
    bandwidthLimit: "1000",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", settings)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="h-6 w-6 md:h-8 md:w-8 text-gray-600" />
              System Settings
            </h1>
            <p className="text-gray-600 mt-1">Configure security, monitoring, and system preferences</p>
          </div>
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Configuration
                </CardTitle>
                <CardDescription>Configure threat detection and security protocols</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="threat-detection">Real-time Threat Detection</Label>
                        <p className="text-sm text-muted-foreground">Enable AI-powered threat detection</p>
                      </div>
                      <Switch
                        id="threat-detection"
                        checked={settings.threatDetectionEnabled}
                        onCheckedChange={(checked) => handleSettingChange("threatDetectionEnabled", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="real-time">Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">Continuous system monitoring</p>
                      </div>
                      <Switch
                        id="real-time"
                        checked={settings.realTimeMonitoring}
                        onCheckedChange={(checked) => handleSettingChange("realTimeMonitoring", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-response">Automated Response</Label>
                        <p className="text-sm text-muted-foreground">Automatically respond to threats</p>
                      </div>
                      <Switch
                        id="auto-response"
                        checked={settings.autoResponse}
                        onCheckedChange={(checked) => handleSettingChange("autoResponse", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="encryption">Encryption Level</Label>
                      <Select
                        value={settings.encryptionLevel}
                        onValueChange={(value) => handleSettingChange("encryptionLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AES-128">AES-128</SelectItem>
                          <SelectItem value="AES-256">AES-256</SelectItem>
                          <SelectItem value="ChaCha20">ChaCha20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cert-validation">Certificate Validation</Label>
                        <p className="text-sm text-muted-foreground">Validate SSL/TLS certificates</p>
                      </div>
                      <Switch
                        id="cert-validation"
                        checked={settings.certificateValidation}
                        onCheckedChange={(checked) => handleSettingChange("certificateValidation", checked)}
                      />
                    </div>
                  </div>
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
                  Alert Configuration
                </CardTitle>
                <CardDescription>Configure how and when you receive security alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Switch
                        id="email-alerts"
                        checked={settings.emailAlerts}
                        onCheckedChange={(checked) => handleSettingChange("emailAlerts", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-alerts">SMS Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                      </div>
                      <Switch
                        id="sms-alerts"
                        checked={settings.smsAlerts}
                        onCheckedChange={(checked) => handleSettingChange("smsAlerts", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="slack">Slack Integration</Label>
                        <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                      </div>
                      <Switch
                        id="slack"
                        checked={settings.slackIntegration}
                        onCheckedChange={(checked) => handleSettingChange("slackIntegration", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="alert-threshold">Alert Threshold</Label>
                      <Select
                        value={settings.alertThreshold}
                        onValueChange={(value) => handleSettingChange("alertThreshold", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - All events</SelectItem>
                          <SelectItem value="medium">Medium - Important events</SelectItem>
                          <SelectItem value="high">High - Critical events only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                <CardDescription>Configure system performance and data management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scan-interval">Scan Interval (seconds)</Label>
                      <Input
                        id="scan-interval"
                        type="number"
                        value={settings.scanInterval}
                        onChange={(e) => handleSettingChange("scanInterval", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention (days)</Label>
                      <Input
                        id="data-retention"
                        type="number"
                        value={settings.dataRetention}
                        onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
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
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select
                        value={settings.logLevel}
                        onValueChange={(value) => handleSettingChange("logLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                  Network Security
                </CardTitle>
                <CardDescription>Configure network security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="vpn">VPN Protection</Label>
                        <p className="text-sm text-muted-foreground">Enable VPN for all connections</p>
                      </div>
                      <Switch
                        id="vpn"
                        checked={settings.vpnEnabled}
                        onCheckedChange={(checked) => handleSettingChange("vpnEnabled", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="port-scanning">Port Scanning</Label>
                        <p className="text-sm text-muted-foreground">Monitor for unauthorized port access</p>
                      </div>
                      <Switch
                        id="port-scanning"
                        checked={settings.portScanning}
                        onCheckedChange={(checked) => handleSettingChange("portScanning", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firewall-rules">Firewall Rules</Label>
                      <Select
                        value={settings.firewallRules}
                        onValueChange={(value) => handleSettingChange("firewallRules", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permissive">Permissive</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="strict">Strict</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bandwidth-limit">Bandwidth Limit (Mbps)</Label>
                      <Input
                        id="bandwidth-limit"
                        type="number"
                        value={settings.bandwidthLimit}
                        onChange={(e) => handleSettingChange("bandwidthLimit", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>Manage user access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Admin User</h4>
                      <p className="text-sm text-muted-foreground">admin@evsoar.com</p>
                    </div>
                    <Badge>Administrator</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Security Analyst</h4>
                      <p className="text-sm text-muted-foreground">analyst@evsoar.com</p>
                    </div>
                    <Badge variant="secondary">Analyst</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Operator</h4>
                      <p className="text-sm text-muted-foreground">operator@evsoar.com</p>
                    </div>
                    <Badge variant="outline">Operator</Badge>
                  </div>
                </div>

                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
