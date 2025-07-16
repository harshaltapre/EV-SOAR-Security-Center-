import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

interface RegisterRequest {
  email: string
  password: string
  name?: string
  phone?: string
  vehicleInfo?: {
    make?: string
    model?: string
    year?: number
    licensePlate?: string
  }
  termsAccepted: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()
    const { email, password, name, phone, vehicleInfo, termsAccepted } = body

    if (!termsAccepted) {
      return NextResponse.json({ error: "You must accept the terms and conditions." }, { status: 400 })
    }

    // Basic password strength validation (can be enhanced)
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          vehicle_make: vehicleInfo?.make,
          vehicle_model: vehicleInfo?.model,
          vehicle_year: vehicleInfo?.year,
          vehicle_license_plate: vehicleInfo?.licensePlate,
        },
        emailRedirectTo: `${request.nextUrl.origin}/auth/confirm`, // Redirect after email confirmation
      },
    })

    if (error) {
      console.error("Supabase registration error:", error.message)
      if (error.message.includes("User already registered")) {
        return NextResponse.json(
          { error: "Email already registered. Please log in or reset password." },
          { status: 409 },
        )
      }
      return NextResponse.json({ error: error.message || "Registration failed. Please try again." }, { status: 500 })
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
