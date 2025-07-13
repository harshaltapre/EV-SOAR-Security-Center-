import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

interface UpdateProfileRequest {
  name?: string
  phone?: string
  vehicleInfo?: {
    make: string
    model: string
    year: number
    licensePlate: string
  }
}

// Mock user database - in production, this would be a real database
const users = [
  {
    id: "admin-1",
    email: "harshaltapre27@yahoo.com",
    name: "System Administrator",
    role: "admin",
    stationId: "STATION-001",
    permissions: ["view_all", "manage_threats", "system_config", "user_management"],
    phone: "+1234567890",
  },
]

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "No authentication token" }, { status: 401 })
    }

    // Validate token and get user info
    const userId = token.value.split("_")[1]
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body: UpdateProfileRequest = await request.json()

    // Update user profile
    if (body.name) {
      users[userIndex].name = body.name
    }
    if (body.phone) {
      users[userIndex].phone = body.phone
    }
    if (body.vehicleInfo && users[userIndex].role === "user") {
      users[userIndex].vehicleInfo = body.vehicleInfo
    }

    return NextResponse.json({
      success: true,
      user: users[userIndex],
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Profile update failed" }, { status: 500 })
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
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: user,
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Profile fetch failed" }, { status: 500 })
  }
}
