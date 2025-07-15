import { NextResponse } from "next/server"

// Mock data for analytics
const mockAnalytics = {
  totalChargers: 150,
  activeChargers: 120,
  totalUsers: 2500,
  chargingSessionsToday: 850,
  totalThreats: 55,
  resolvedThreats: 48,
  energyConsumed: 12345.67, // kWh
  averageSessionDuration: 45.5, // minutes
}

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return NextResponse.json(mockAnalytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
