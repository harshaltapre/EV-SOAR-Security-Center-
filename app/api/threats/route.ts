import { NextResponse } from "next/server"

// Mock data for threats
const mockThreats = [
  {
    id: "threat-001",
    type: "Unauthorized Access Attempt",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    status: "active",
    description: "Multiple failed login attempts on Charger #002 admin interface.",
  },
  {
    id: "threat-002",
    type: "Firmware Tampering Alert",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    status: "active",
    description: "Checksum mismatch detected in Charger #001 firmware.",
  },
  {
    id: "threat-003",
    type: "DDoS Attack",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    status: "resolved",
    description: "Unusual traffic spike targeting API endpoint, mitigated.",
  },
  {
    id: "threat-004",
    type: "Malware Signature Detected",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: "active",
    description: "Known malware signature found in log files of central server.",
  },
  {
    id: "threat-005",
    type: "Physical Tampering Alert",
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    status: "ignored",
    description: "Proximity sensor triggered at Charger #003, no further suspicious activity.",
  },
]

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json({ threats: mockThreats })
  } catch (error) {
    console.error("Error fetching threats:", error)
    return NextResponse.json({ error: "Failed to fetch threats" }, { status: 500 })
  }
}
