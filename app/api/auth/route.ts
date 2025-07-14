import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users, passwords, getUserByEmail } from "@/lib/mock-db" // Import from mock-db

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
  phone?: string
  vehicleInfo?: {
    make: string
    model: string
    year: number
    licensePlate: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password, userType } = body

    // Find user with matching email and role
    const user = getUserByEmail(email)

    if (!user || user.role !== userType) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const storedPassword = passwords.get(email)
    if (storedPassword !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create session token
    const sessionToken = `session_${user.id}_${Date.now()}`

    // Set secure cookie
    const cookieStore = cookies()
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
        phone: user.phone,
        vehicleInfo: user.vehicleInfo,
        permissions: user.permissions,
      },
      token: sessionToken,
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 })
    }

    // Validate token and get user info
    const userId = token.value.split("_")[1]
    // In a real app, you'd look up the user by ID from your database
    // For mock-db, we'll iterate or find a way to map ID back to email if needed
    const user = Array.from(users.values()).find((u) => u.id === userId)

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
        phone: user.phone,
        vehicleInfo: user.vehicleInfo,
        permissions: user.permissions,
      },
    })
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ error: "Token validation failed" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies()
    cookieStore.delete("auth-token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
