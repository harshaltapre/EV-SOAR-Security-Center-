import { NextResponse } from "next/server"

export async function GET() {
  // Mock analytics data
  const analytics = {
    totalChargers: 247,
    secureChargers: 198,
    threatsBlocked: 1247,
    uptime: 99.7,
    dailyStats: [
      { date: "2024-01-01", threats: 12, chargers: 245 },
      { date: "2024-01-02", threats: 8, chargers: 246 },
      { date: "2024-01-03", threats: 15, chargers: 247 },
      { date: "2024-01-04", threats: 6, chargers: 247 },
      { date: "2024-01-05", threats: 9, chargers: 247 },
      { date: "2024-01-06", threats: 11, chargers: 247 },
      { date: "2024-01-07", threats: 7, chargers: 247 },
    ],
    threatTypes: [
      { type: "MITM", count: 45, percentage: 36 },
      { type: "Malware", count: 32, percentage: 26 },
      { type: "Protocol Anomaly", count: 28, percentage: 22 },
      { type: "Unauthorized Access", count: 20, percentage: 16 },
    ],
    networkHealth: {
      latency: 12,
      packetLoss: 0.02,
      bandwidth: 98.5,
      encryption: 100,
    },
  }

  return NextResponse.json(analytics)
}
