import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Cloud,
  Database,
  Shield,
  Server,
  Smartphone,
  Car,
  Zap,
  Network,
  Lock,
  BarChart,
  AlertTriangle,
  Code,
} from "lucide-react"

export function SystemArchitecture() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">EV-SOAR System Architecture</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="flex flex-col items-center text-center">
          <Cloud className="h-10 w-10 text-blue-500 mb-2" />
          <h3 className="font-semibold text-lg">Cloud Platform</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Scalable infrastructure for all services.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Server className="h-10 w-10 text-green-500 mb-2" />
          <h3 className="font-semibold text-lg">Backend Services</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            API endpoints, business logic, and data processing.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Database className="h-10 w-10 text-purple-500 mb-2" />
          <h3 className="font-semibold text-lg">Database</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure storage for user data, charging logs, and threat incidents.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Shield className="h-10 w-10 text-red-500 mb-2" />
          <h3 className="font-semibold text-lg">Security Module</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Threat detection, vulnerability management, and access control.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Zap className="h-10 w-10 text-yellow-500 mb-2" />
          <h3 className="font-semibold text-lg">Charger Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time monitoring and control of EV charging stations.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Car className="h-10 w-10 text-indigo-500 mb-2" />
          <h3 className="font-semibold text-lg">Vehicle Integration</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Communication with EV for charging status and diagnostics.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Smartphone className="h-10 w-10 text-orange-500 mb-2" />
          <h3 className="font-semibold text-lg">Mobile App</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            User interface for charging, payments, and notifications.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Network className="h-10 w-10 text-cyan-500 mb-2" />
          <h3 className="font-semibold text-lg">Network Security</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure communication channels and intrusion prevention.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Lock className="h-10 w-10 text-gray-500 mb-2" />
          <h3 className="font-semibold text-lg">Authentication & Authorization</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">User identity verification and access control.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <BarChart className="h-10 w-10 text-teal-500 mb-2" />
          <h3 className="font-semibold text-lg">Analytics & Reporting</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Data insights for system performance and security trends.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
          <h3 className="font-semibold text-lg">Incident Response</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Automated and manual workflows for security incidents.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Code className="h-10 w-10 text-lime-500 mb-2" />
          <h3 className="font-semibold text-lg">API Gateway</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Secure and managed access to backend services.</p>
        </div>
      </CardContent>
    </Card>
  )
}
