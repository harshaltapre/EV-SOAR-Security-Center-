import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

interface ResetPasswordRequest {
  password: string
  token: string
  type: "recovery" | "email_change"
}

export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordRequest = await request.json()
    const { password, token, type } = body

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    // Exchange the token for a session
    const { error: tokenError } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type,
    })

    if (tokenError) {
      console.error("Supabase token verification error:", tokenError.message)
      return NextResponse.json({ error: tokenError.message || "Invalid or expired token." }, { status: 400 })
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      console.error("Supabase password update error:", updateError.message)
      return NextResponse.json({ error: updateError.message || "Failed to reset password." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Password has been reset successfully." })
  } catch (error) {
    console.error("Reset password API error:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}
