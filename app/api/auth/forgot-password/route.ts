import { type NextRequest, NextResponse } from "next/server"

interface ForgotPasswordRequest {
  email: string
  userType: "admin" | "user"
}

// Mock OTP storage - in production, use Redis or database
const otpStorage: Record<string, { otp: string; expires: number; attempts: number }> = {}

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Mock users for validation
const validEmails = ["harshaltapre27@yahoo.com"] // Admin email

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordRequest = await request.json()
    const { email, userType } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if email exists (simplified check)
    if (userType === "admin" && !validEmails.includes(email)) {
      return NextResponse.json({ error: "No admin account found with this email address" }, { status: 404 })
    }

    // Generate OTP
    const otp = generateOTP()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP
    otpStorage[email] = {
      otp,
      expires,
      attempts: 0,
    }

    // In production, send email here
    console.log(`OTP for ${email}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: "Password reset code sent to your email address",
      // For demo purposes, include OTP in response (remove in production)
      otp: otp,
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Failed to send reset code. Please try again." }, { status: 500 })
  }
}
