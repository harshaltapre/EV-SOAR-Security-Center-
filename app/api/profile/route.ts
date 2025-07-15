import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user metadata
    const profile = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || "",
      phone: user.user_metadata?.phone || "",
      vehicleInfo: {
        make: user.user_metadata?.vehicle_make || "",
        model: user.user_metadata?.vehicle_model || "",
        year: user.user_metadata?.vehicle_year || "",
        licensePlate: user.user_metadata?.vehicle_license_plate || "",
      },
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate } = body

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name,
        phone,
        vehicle_make: vehicleMake,
        vehicle_model: vehicleModel,
        vehicle_year: vehicleYear,
        vehicle_license_plate: vehicleLicensePlate,
      },
    })

    if (error) {
      console.error("Error updating user profile:", error.message)
      return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
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
    console.error("Error in profile PUT API:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
