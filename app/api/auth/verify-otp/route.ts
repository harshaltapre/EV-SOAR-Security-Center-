import { type NextRequest, NextResponse } from "next/server"

interface VerifyOTPRequest {
  email: string
  otp: string
}

// Mock OTP storage - should match the one in forgot-password
const otpStorage: Record<string, { otp: string; expires: number; attempts: number }> = {}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json()
    const { email, otp } = body

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const storedOTP = otpStorage[email]
    if (!storedOTP) {
      return NextResponse.json({ error: "No reset request found. Please request a new code." }, { status: 404 })
    }

    // Check if OTP has expired
    if (Date.now() > storedOTP.expires) {
      delete otpStorage[email]
      return NextResponse.json({ error: "Reset code has expired. Please request a new one." }, { status: 400 })
    }

    // Check attempts limit
    if (storedOTP.attempts >= 3) {
      delete otpStorage[email]
      return NextResponse.json({ error: "Too many failed attempts. Please request a new code." }, { status: 429 })
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      storedOTP.attempts++
      return NextResponse.json(
        {
          error: "Invalid reset code. Please try again.",
          attemptsLeft: 3 - storedOTP.attempts,
        },
        { status: 400 },
      )
    }

    // OTP is valid - generate reset token
    const resetToken = `reset_${email}_${Date.now()}`

    return NextResponse.json({
      success: true,
      message: "Reset code verified successfully",
      resetToken,
    })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 })
  }
}
