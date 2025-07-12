import { NextResponse } from "next/server"

// Mock database - in production, this would be a real database
const chargers = [
  {
    id: "CHG-001",
    location: "Downtown Mall",
    status: "secure",
    lastScan: new Date().toISOString(),
    threatLevel: 5,
    connectedVehicles: 3,
    coordinates: { lat: 40.7128, lng: -74.006 },
    model: "FastCharge Pro 150kW",
    firmware: "v2.1.4",
    uptime: 99.8,
  },
  {
    id: "CHG-002",
    location: "Airport Terminal",
    status: "warning",
    lastScan: new Date().toISOString(),
    threatLevel: 35,
    connectedVehicles: 7,
    coordinates: { lat: 40.6892, lng: -74.1745 },
    model: "UltraCharge 350kW",
    firmware: "v2.0.8",
    uptime: 97.2,
  },
  {
    id: "CHG-003",
    location: "Shopping Center",
    status: "threat",
    lastScan: new Date().toISOString(),
    threatLevel: 85,
    connectedVehicles: 2,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    model: "FastCharge Pro 150kW",
    firmware: "v1.9.2",
    uptime: 94.5,
  },
  {
    id: "CHG-004",
    location: "Office Complex",
    status: "secure",
    lastScan: new Date().toISOString(),
    threatLevel: 10,
    connectedVehicles: 5,
    coordinates: { lat: 40.7505, lng: -73.9934 },
    model: "SmartCharge 75kW",
    firmware: "v2.1.1",
    uptime: 99.1,
  },
]

export async function GET() {
  return NextResponse.json(chargers)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newCharger = {
    id: `CHG-${String(chargers.length + 1).padStart(3, "0")}`,
    ...body,
    lastScan: new Date().toISOString(),
  }
  chargers.push(newCharger)
  return NextResponse.json(newCharger, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const index = chargers.findIndex((c) => c.id === body.id)
  if (index !== -1) {
    chargers[index] = { ...chargers[index], ...body, lastScan: new Date().toISOString() }
    return NextResponse.json(chargers[index])
  }
  return NextResponse.json({ error: "Charger not found" }, { status: 404 })
}
