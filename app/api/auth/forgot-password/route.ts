import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    const supabase = createSupabaseServerClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${request.nextUrl.origin}/reset-password`,
    })

    if (error) {
      console.error("Supabase forgot password error:", error.message)
      return NextResponse.json({ error: error.message || "Failed to send password reset email." }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Password reset email sent. Please check your inbox.",
    })
  } catch (error) {
    console.error("Forgot password API error:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}
