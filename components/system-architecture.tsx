"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Cpu, Network, Lock, Server, Zap } from "lucide-react"

export function SystemArchitecture() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>EV-SOAR Hardware Specifications</CardTitle>
          <CardDescription>Detailed hardware requirements for secure EV charging infrastructure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Edge Security Gateway */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              Edge Security Gateway (Per Charger)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2">Processing Unit</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• ARM Cortex-A78 Quad-core @ 2.4GHz</li>
                  <li>• 8GB LPDDR5 RAM</li>
                  <li>• 64GB eUFS 3.1 storage</li>
                  <li>• Dedicated AI/ML accelerator (5 TOPS)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 mb-2">Security Hardware</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• TPM 2.0 (Trusted Platform Module)</li>
                  <li>• Hardware Security Module (HSM)</li>
                  <li>• Secure Element (CC EAL6+)</li>
                  <li>• Hardware RNG (FIPS 140-2 Level 3)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Connectivity Modules */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Network className="h-5 w-5 text-green-600" />
              Connectivity & Communication
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Cellular</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 5G NR Sub-6GHz</li>
                  <li>• LTE-M/NB-IoT fallback</li>
                  <li>• eSIM with remote provisioning</li>
                  <li>• Carrier aggregation support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 mb-2">Wi-Fi & Ethernet</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Wi-Fi 6E (802.11ax)</li>
                  <li>• WPA3 Enterprise security</li>
                  <li>• Gigabit Ethernet (IEEE 802.3)</li>
                  <li>• Power over Ethernet (PoE+)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 mb-2">Industrial I/O</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• CAN Bus interface</li>
                  <li>• RS-485/Modbus RTU</li>
                  <li>• Digital I/O (24V tolerant)</li>
                  <li>• Isolated power supply</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Environmental & Power */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Environmental & Power Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2">Environmental</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Operating temp: -40°C to +85°C</li>
                  <li>• Humidity: 5% to 95% RH</li>
                  <li>• IP67 rated enclosure</li>
                  <li>• Vibration: IEC 60068-2-6</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Power & Reliability</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Input: 12-48V DC, 24W max</li>
                  <li>• Battery backup: 4-hour UPS</li>
                  <li>• MTBF: &gt;100,000 hours</li>
                  <li>• Watchdog timer & auto-recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Software Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Software Architecture & Security Stack</CardTitle>
          <CardDescription>Comprehensive software solution for threat detection and prevention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-purple-600 mb-2 flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  AI Security Engine
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• TensorFlow Lite for edge inference</li>
                  <li>• Real-time anomaly detection models</li>
                  <li>• LSTM networks for sequence analysis</li>
                  <li>• Federated learning capabilities</li>
                  <li>• Behavioral profiling algorithms</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Protocol Security
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• OCPP 2.0.1 with security profile 3</li>
                  <li>• TLS 1.3 with mutual authentication</li>
                  <li>• X.509 certificate management</li>
                  <li>• Message signing & encryption</li>
                  <li>• Replay attack prevention</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Network Security
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• IPSec VPN tunneling</li>
                  <li>• Deep packet inspection (DPI)</li>
                  <li>• Intrusion detection system (IDS)</li>
                  <li>• Network access control (NAC)</li>
                  <li>• Zero-trust network architecture</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Cryptographic Services
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• AES-256 encryption</li>
                  <li>• RSA-4096 & ECDSA-P384 signatures</li>
                  <li>• SHA-3 hashing algorithms</li>
                  <li>• Key derivation functions (PBKDF2)</li>
                  <li>• Hardware-backed key storage</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Phases */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
          <CardDescription>Phased deployment strategy for EV-SOAR system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Badge className="bg-blue-100 text-blue-800 mt-1">Phase 1</Badge>
              <div>
                <h4 className="font-medium">Hardware Deployment (Months 1-3)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Install edge security gateways, establish secure communication channels, and integrate with existing
                  OCPP infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Badge className="bg-green-100 text-green-800 mt-1">Phase 2</Badge>
              <div>
                <h4 className="font-medium">AI Model Training (Months 2-4)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Collect baseline data, train anomaly detection models, and implement federated learning across the
                  network.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Badge className="bg-purple-100 text-purple-800 mt-1">Phase 3</Badge>
              <div>
                <h4 className="font-medium">Full Security Activation (Months 4-6)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Enable real-time threat detection, automated response systems, and comprehensive security monitoring.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
