import { NextResponse } from "next/server"

// Mock data for chargers
const mockChargers = [
  {
    id: "charger-001",
    name: "Main Station A",
    status: "online",
    location: "123 Electric Ave",
    lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    powerOutput: 22,
  },
  {
    id: "charger-002",
    name: "Downtown Hub B",
    status: "charging",
    location: "456 City Center",
    lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    powerOutput: 50,
  },
  {
    id: "charger-003",
    name: "Suburban Point C",
    status: "offline",
    location: "789 Oak Street",
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    powerOutput: 0,
  },
  {
    id: "charger-004",
    name: "Industrial Park D",
    status: "maintenance",
    location: "101 Factory Rd",
    lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    powerOutput: 0,
  },
]

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json({ chargers: mockChargers })
  } catch (error) {
    console.error("Error fetching chargers:", error)
    return NextResponse.json({ error: "Failed to fetch chargers" }, { status: 500 })
  }
}
