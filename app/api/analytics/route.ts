import { NextResponse } from "next/server"

// Generate mock analytics data
function generateAnalyticsData() {
  const now = new Date()
  const dailyStats = []
  
  // Generate last 7 days of data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    dailyStats.push({
      date: date.toISOString().split('T')[0],
      threats: Math.floor(Math.random() * 20) + 5,
      blocked: Math.floor(Math.random() * 15) + 10,
      uptime: 98.5 + Math.random() * 1.5,
      sessions: Math.floor(Math.random() * 50) + 100,
      energy: Math.floor(Math.random() * 1000) + 2000,
    })
  }

  const threatTypes = [
    { type: "MITM Attack", count: 45, percentage: 35 },
    { type: "Malware Injection", count: 28, percentage: 22 },
    { type: "Protocol Anomaly", count: 32, percentage: 25 },
    { type: "DDoS Attempt", count: 15, percentage: 12 },
    { type: "Session Hijack", count: 8, percentage: 6 },
  ]

  const networkHealth = {
    latency: Math.floor(Math.random() * 10) + 8,
    packetLoss: Math.random() * 0.1,
    bandwidth: Math.floor(Math.random() * 20) + 65,
    connections: Math.floor(Math.random() * 50) + 200,
  }

  const mlMetrics = {
    accuracy: 0.94 + Math.random() * 0.05,
    precision: 0.92 + Math.random() * 0.05,
    recall: 0.89 + Math.random() * 0.05,
    f1Score: 0.90 + Math.random() * 0.05,
    totalPredictions: 15847 + Math.floor(Math.random() * 100),
    threatsDetected: 1247 + Math.floor(Math.random() * 10),
    falsePositives: 89 + Math.floor(Math.random() * 5),
  }

  return {
    totalChargers: 247,
    secureChargers: 198 + Math.floor(Math.random() * 10),
    threatsBlocked: 1247 + Math.floor(Math.random() * 50),
    uptime: 99.7,
    activeSessions: 45 + Math.floor(Math.random() * 20),
    totalEnergy: 125847 + Math.floor(Math.random() * 1000),
    revenue: 45678 + Math.floor(Math.random() * 500),
    dailyStats,
    threatTypes,
    networkHealth,
    mlMetrics,
    hardwareStatus: {
      tpmChips: { total: 247, active: 247, failed: 0 },
      secureElements: { total: 247, online: 247, offline: 0 },
      edgeProcessors: { total: 247, running: 247, error: 0 },
      vpnTunnels: { total: 247, secure: 247, compromised: 0 },
    },
    performanceMetrics: {
      avgResponseTime: 12 + Math.random() * 5,
      throughput: 1250 + Math.random() * 100,
      errorRate: Math.random() * 0.1,
      availability: 99.95 + Math.random() * 0.05,
    }
  }
}

export async function GET() {
  try {
    const analytics = generateAnalyticsData()
    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
