import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

interface LoginRequest {
  email: string
  password: string
  userType: "admin" | "user"
}

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  stationId?: string
  permissions: string[]
}

// Mock user database
const users: User[] = [
  {
    id: "admin-1",
    email: "admin@evsoar.com",
    name: "Station Manager",
    role: "admin",
    stationId: "STATION-001",
    permissions: ["view_all", "manage_threats", "system_config", "user_management"],
  },
  {
    id: "user-1",
    email: "user@example.com",
    name: "John Doe",
    role: "user",
    permissions: ["view_sessions", "start_charging", "view_history"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password, userType } = body

    // Mock authentication - in production, use proper password hashing
    const user = users.find((u) => u.email === email && u.role === userType)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session token (in production, use JWT or proper session management)
    const sessionToken = `session_${user.id}_${Date.now()}`

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        stationId: user.stationId,
        permissions: user.permissions,
      },
      token: sessionToken,
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 })
    }

    // Validate token and get user info
    const userId = token.value.split("_")[1]
    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        stationId: user.stationId,
        permissions: user.permissions,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Token validation failed" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("auth-token")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
