import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, vehicleMake, vehicleModel, vehicleYear, vehicleLicensePlate } = body

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          vehicle_make: vehicleMake,
          vehicle_model: vehicleModel,
          vehicle_year: vehicleYear,
          vehicle_license_plate: vehicleLicensePlate,
        },
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`, // Or your desired confirmation page
      },
    })

    if (error) {
      console.error("Supabase registration error:", error.message)
      return NextResponse.json({ error: error.message || "Registration failed." }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Please check your email to confirm your account.",
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    })
  } catch (error) {
    console.error("Registration API error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
