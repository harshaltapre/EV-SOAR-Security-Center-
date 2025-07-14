import { type NextRequest, NextResponse } from "next/server"
import { users, storeOTP } from "@/lib/mock-db" // Import from mock-db
import { sendEmail } from "@/lib/email-service" // Import email service

interface ForgotPasswordRequest {
  email: string
  userType: "admin" | "user"
}

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

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

    // Check if email exists for the specified user type
    const user = users.get(email)
    if (!user || user.role !== userType) {
      return NextResponse.json({ error: "No account found with this email and user type" }, { status: 404 })
    }

    // Generate OTP
    const otp = generateOTP()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes expiration

    // Store OTP
    storeOTP(email, {
      otp,
      expires,
      attempts: 0,
    })

    // Send OTP via email (simulated)
    const emailSent = await sendEmail({
      to: email,
      subject: "EV-SOAR Password Reset Code",
      text: `Your password reset code is: ${otp}. This code is valid for 10 minutes.`,
      html: `<p>Your password reset code is: <strong>${otp}</strong>. This code is valid for 10 minutes.</p>`,
    })

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 })
    }

    // Return masked email for security
    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3")

    return NextResponse.json({
      success: true,
      message: `A 6-digit reset code has been sent to ${maskedEmail}.`,
      maskedEmail,
      expiresIn: 600, // 10 minutes in seconds
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
