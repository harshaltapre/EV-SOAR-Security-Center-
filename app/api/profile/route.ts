import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { users, updateUser } from "@/lib/mock-db" // Import from mock-db

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

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.value.split("_")[1]
    const user = Array.from(users.values()).find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body: UpdateProfileRequest = await request.json()
    const { name, phone, vehicleInfo } = body

    const updatedUser = updateUser(user.email, { name, phone, vehicleInfo })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        phone: updatedUser.phone,
        vehicleInfo: updatedUser.vehicleInfo,
      },
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
