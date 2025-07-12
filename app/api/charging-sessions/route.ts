import { type NextRequest, NextResponse } from "next/server"

interface ChargingSession {
  id: string
  userId: string
  chargerId: string
  vehicleId: string
  startTime: string
  endTime?: string
  status: "active" | "completed" | "interrupted" | "error"
  energyDelivered: number // kWh
  cost: number
  securityLevel: "secure" | "warning" | "threat"
  threatScore: number
  location: string
  paymentMethod: string
  sessionData: {
    maxPower: number
    avgPower: number
    peakCurrent: number
    voltage: number
    temperature: number
    efficiency: number
  }
}

interface StartSessionRequest {
  userId: string
  chargerId: string
  vehicleId: string
  paymentMethod: string
  maxPower?: number
}

// Mock session database
const sessions: ChargingSession[] = [
  {
    id: "SESSION-001",
    userId: "user-1",
    chargerId: "CHG-001",
    vehicleId: "VEHICLE-001",
    startTime: "2024-01-15T14:30:00Z",
    endTime: "2024-01-15T16:15:00Z",
    status: "completed",
    energyDelivered: 45.2,
    cost: 18.08,
    securityLevel: "secure",
    threatScore: 5,
    location: "Downtown Mall",
    paymentMethod: "credit_card",
    sessionData: {
      maxPower: 50,
      avgPower: 42.5,
      peakCurrent: 125,
      voltage: 400,
      temperature: 35,
      efficiency: 0.92,
    },
  },
  {
    id: "SESSION-002",
    userId: "user-1",
    chargerId: "CHG-002",
    vehicleId: "VEHICLE-001",
    startTime: "2024-01-16T09:15:00Z",
    status: "active",
    energyDelivered: 12.8,
    cost: 5.12,
    securityLevel: "warning",
    threatScore: 35,
    location: "Airport Terminal",
    paymentMethod: "mobile_app",
    sessionData: {
      maxPower: 75,
      avgPower: 68.2,
      peakCurrent: 180,
      voltage: 400,
      temperature: 42,
      efficiency: 0.89,
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const chargerId = searchParams.get("chargerId")
    const status = searchParams.get("status")

    let filteredSessions = sessions

    if (userId) {
      filteredSessions = filteredSessions.filter((s) => s.userId === userId)
    }

    if (chargerId) {
      filteredSessions = filteredSessions.filter((s) => s.chargerId === chargerId)
    }

    if (status) {
      filteredSessions = filteredSessions.filter((s) => s.status === status)
    }

    // Sort by start time (most recent first)
    filteredSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

    return NextResponse.json({
      sessions: filteredSessions,
      total: filteredSessions.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: StartSessionRequest = await request.json()

    // Validate required fields
    if (!data.userId || !data.chargerId || !data.vehicleId || !data.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if charger is available
    const activeSession = sessions.find((s) => s.chargerId === data.chargerId && s.status === "active")
    if (activeSession) {
      return NextResponse.json({ error: "Charger is currently in use" }, { status: 409 })
    }

    // Create new session
    const newSession: ChargingSession = {
      id: `SESSION-${Date.now()}`,
      userId: data.userId,
      chargerId: data.chargerId,
      vehicleId: data.vehicleId,
      startTime: new Date().toISOString(),
      status: "active",
      energyDelivered: 0,
      cost: 0,
      securityLevel: "secure",
      threatScore: Math.floor(Math.random() * 20), // Random initial threat score
      location: getChargerLocation(data.chargerId),
      paymentMethod: data.paymentMethod,
      sessionData: {
        maxPower: data.maxPower || 50,
        avgPower: 0,
        peakCurrent: 0,
        voltage: 400,
        temperature: 25,
        efficiency: 0.95,
      },
    }

    sessions.push(newSession)

    // Simulate real-time security check
    setTimeout(async () => {
      await performSecurityCheck(newSession.id)
    }, 5000)

    return NextResponse.json({
      success: true,
      session: newSession,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to start charging session" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")
    const action = searchParams.get("action")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const sessionIndex = sessions.findIndex((s) => s.id === sessionId)
    if (sessionIndex === -1) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    const session = sessions[sessionIndex]

    switch (action) {
      case "stop":
        session.status = "completed"
        session.endTime = new Date().toISOString()
        // Calculate final cost based on energy delivered
        session.cost = session.energyDelivered * 0.4 // $0.40 per kWh
        break

      case "pause":
        session.status = "interrupted"
        break

      case "resume":
        if (session.status === "interrupted") {
          session.status = "active"
        }
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    sessions[sessionIndex] = session

    return NextResponse.json({
      success: true,
      session,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
  }
}

// Helper functions
function getChargerLocation(chargerId: string): string {
  const locations: Record<string, string> = {
    "CHG-001": "Downtown Mall",
    "CHG-002": "Airport Terminal",
    "CHG-003": "Shopping Center",
    "CHG-004": "Office Complex",
  }
  return locations[chargerId] || "Unknown Location"
}

async function performSecurityCheck(sessionId: string) {
  // Simulate ML-based security analysis
  const session = sessions.find((s) => s.id === sessionId)
  if (!session) return

  // Mock threat detection API call
  const threatData = {
    chargerId: session.chargerId,
    networkData: {
      packetSizes: Array.from({ length: 100 }, () => Math.random() * 1500 + 64),
      connectionFrequency: Math.random() * 10 + 1,
      protocolDistribution: { OCPP: 0.8, HTTP: 0.15, Other: 0.05 },
    },
    ocppMessages: {
      messageTypes: ["StartTransaction", "MeterValues", "Heartbeat"],
      timingPatterns: Array.from({ length: 20 }, () => Math.random() * 1000 + 500),
      payloadSizes: Array.from({ length: 20 }, () => Math.random() * 500 + 100),
    },
    userBehavior: {
      sessionDuration: Date.now() - new Date(session.startTime).getTime(),
      chargingPattern: "normal",
      deviceFingerprint: "standard_device",
    },
  }

  try {
    // This would call the ML threat detection API
    const response = await fetch("/api/ml/threat-detection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(threatData),
    })

    if (response.ok) {
      const result = await response.json()
      const prediction = result.prediction

      // Update session with threat assessment
      const sessionIndex = sessions.findIndex((s) => s.id === sessionId)
      if (sessionIndex !== -1) {
        sessions[sessionIndex].threatScore = Math.round(prediction.threatProbability * 100)
        sessions[sessionIndex].securityLevel =
          prediction.severity === "critical" || prediction.severity === "high"
            ? "threat"
            : prediction.severity === "medium"
              ? "warning"
              : "secure"
      }
    }
  } catch (error) {
    console.error("Security check failed:", error)
  }
}
