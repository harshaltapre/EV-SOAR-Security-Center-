import { type NextRequest, NextResponse } from "next/server"
import { getResetToken, deleteResetToken, passwords } from "@/lib/mock-db" // Import from mock-db

interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
}

// Password validation (same as register route)
const validatePassword = (password: string) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    return "Password must be at least 8 characters long"
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter"
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter"
  }
  if (!hasNumbers) {
    return "Password must contain at least one number"
  }
  if (!hasSpecialChar) {
    return "Password must contain at least one special character"
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordRequest = await request.json()
    const { resetToken, newPassword } = body

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: "Reset token and new password are required" }, { status: 400 })
    }

    const storedResetToken = getResetToken(resetToken)
    if (!storedResetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Check if reset token has expired
    if (Date.now() > storedResetToken.expires) {
      deleteResetToken(resetToken)
      return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 })
    }

    // Validate new password strength
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 })
    }

    // Update user's password
    const userEmail = storedResetToken.email
    // In a real app, you'd hash the new password before storing it
    passwords.set(userEmail, newPassword) // Update password in mock-db

    // Clean up reset token
    deleteResetToken(resetToken)

    return NextResponse.json({ success: true, message: "Password reset successfully!" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Failed to reset password. Please try again." }, { status: 500 })
  }
}
