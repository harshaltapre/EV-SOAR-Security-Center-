import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

interface UpdateProfileRequest {
  name?: string
  phone?: string
  vehicleInfo?: {
    make?: string
    model?: string
    year?: number
    licensePlate?: string
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateProfileRequest = await request.json()
    const { name, phone, vehicleInfo } = body

    const supabase = createSupabaseServerClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: name,
        phone: phone,
        vehicle_make: vehicleInfo?.make,
        vehicle_model: vehicleInfo?.model,
        vehicle_year: vehicleInfo?.year,
        vehicle_license_plate: vehicleInfo?.licensePlate,
      },
    })

    if (error) {
      console.error("Supabase profile update error:", error.message)
      return NextResponse.json({ error: error.message || "Failed to update profile." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        phone: data.user?.user_metadata?.phone,
        vehicleInfo: {
          make: data.user?.user_metadata?.vehicle_make,
          model: data.user?.user_metadata?.vehicle_model,
          year: data.user?.user_metadata?.vehicle_year,
          licensePlate: data.user?.user_metadata?.vehicle_license_plate,
        },
      },
    })
  } catch (error) {
    console.error("Profile update API error:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}
