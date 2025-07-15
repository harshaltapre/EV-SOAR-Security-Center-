import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

interface LoginRequest {
  email: string
  password: string
  userType: "admin" | "user" // userType is for conceptual role, Supabase handles auth directly
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password, userType } = body

    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Supabase login error:", error.message, "Full error object:", error) // Enhanced logging
      let errorMessage = "Invalid email or password."
      if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email address to log in."
      } else if (error.message.includes("Invalid login credentials") || error.status === 400) {
        // Supabase often returns "Invalid login credentials" for wrong password or unconfirmed email
        errorMessage = "Invalid email or password. Please check your credentials or confirm your email."
      }
      return NextResponse.json({ error: errorMessage }, { status: 401 })
    }

    // Enforce admin email for admin login type
    if (userType === "admin" && data.user?.email !== "harshaltapre27@yahoo.com") {
      await supabase.auth.signOut() // Sign out if not the designated admin
      return NextResponse.json({ error: "Unauthorized access for admin panel." }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name, // Assuming name is stored in user_metadata
        role: userType, // This is a conceptual role for the demo
      },
    })
  } catch (error) {
    console.error("Authentication API error:", error)
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "No authenticated user." }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        role: user.email === "harshaltapre27@yahoo.com" ? "admin" : "user", // Conceptual role based on email
        phone: user.user_metadata?.phone,
        vehicleInfo: {
          make: user.user_metadata?.vehicle_make,
          model: user.user_metadata?.vehicle_model,
          year: user.user_metadata?.vehicle_year,
          licensePlate: user.user_metadata?.vehicle_license_plate,
        },
      },
    })
  } catch (error) {
    console.error("Token validation API error:", error)
    return NextResponse.json({ error: "Token validation failed." }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Supabase logout error:", error.message)
      return NextResponse.json({ error: error.message || "Logout failed." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout API error:", error)
    return NextResponse.json({ error: "Logout failed. Please try again." }, { status: 500 })
  }
}
