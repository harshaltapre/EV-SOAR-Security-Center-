import { NextResponse } from "next/server"

// Mock database - in production, this would be a real database
const chargers = [
  {
    id: "CHG-001",
    location: "Downtown Mall",
    status: "secure",
    lastScan: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    threatLevel: 5,
    connectedVehicles: 3,
    coordinates: { lat: 40.7128, lng: -74.006 },
    powerOutput: 150,
    manufacturer: "Tesla",
    model: "Supercharger V3",
  },
  {
    id: "CHG-002",
    location: "Airport Terminal",
    status: "warning",
    lastScan: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    threatLevel: 35,
    connectedVehicles: 7,
    coordinates: { lat: 40.6892, lng: -74.1745 },
    powerOutput: 250,
    manufacturer: "ChargePoint",
    model: "Express Plus",
  },
  {
    id: "CHG-003",
    location: "Shopping Center",
    status: "threat",
    lastScan: new Date(Date.now() - 30 * 1000).toISOString(),
    threatLevel: 85,
    connectedVehicles: 2,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    powerOutput: 100,
    manufacturer: "EVgo",
    model: "Fast Charger",
  },
  {
    id: "CHG-004",
    location: "Office Complex",
    status: "secure",
    lastScan: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    threatLevel: 10,
    connectedVehicles: 5,
    coordinates: { lat: 40.7505, lng: -73.9934 },
    powerOutput: 75,
    manufacturer: "Blink",
    model: "DC Fast",
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
