import { NextResponse } from "next/server"

const threats = [
  {
    id: "THR-001",
    type: "mitm",
    severity: "critical",
    charger: "CHG-003",
    timestamp: new Date().toISOString(),
    description: "Potential man-in-the-middle attack detected on OCPP communication",
    status: "active",
    details: {
      sourceIP: "192.168.1.45",
      targetPort: 8080,
      protocol: "OCPP 2.0.1",
      confidence: 95,
    },
  },
  {
    id: "THR-002",
    type: "protocol_anomaly",
    severity: "medium",
    charger: "CHG-002",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    description: "Unusual OCPP message patterns detected",
    status: "investigating",
    details: {
      anomalyType: "Message frequency spike",
      normalRate: "2 msg/min",
      detectedRate: "45 msg/min",
      confidence: 78,
    },
  },
  {
    id: "THR-003",
    type: "malware",
    severity: "high",
    charger: "CHG-001",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    description: "Suspicious firmware modification attempt blocked",
    status: "resolved",
    details: {
      malwareType: "Firmware injection",
      blockedFile: "update_v2.1.5.bin",
      hash: "a1b2c3d4e5f6...",
      confidence: 92,
    },
  },
]

export async function GET() {
  return NextResponse.json(threats)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newThreat = {
    id: `THR-${String(threats.length + 1).padStart(3, "0")}`,
    ...body,
    timestamp: new Date().toISOString(),
  }
  threats.push(newThreat)
  return NextResponse.json(newThreat, { status: 201 })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const index = threats.findIndex((t) => t.id === body.id)
  if (index !== -1) {
    threats[index] = { ...threats[index], ...body }
    return NextResponse.json(threats[index])
  }
  return NextResponse.json({ error: "Threat not found" }, { status: 404 })
}
