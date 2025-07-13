import { type NextRequest, NextResponse } from "next/server"

interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
  confirmPassword: string
}

// Mock password storage - should match the one in auth route
const passwords: Record<string, string> = {
  "harshaltapre27@yahoo.com": "Admin123",
}

// Password validation
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
    const { resetToken, newPassword, confirmPassword } = body

    if (!resetToken || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate reset token format
    if (!resetToken.startsWith("reset_")) {
      return NextResponse.json({ error: "Invalid reset token" }, { status: 400 })
    }

    // Extract email from token
    const tokenParts = resetToken.split("_")
    if (tokenParts.length < 3) {
      return NextResponse.json({ error: "Invalid reset token format" }, { status: 400 })
    }

    const email = tokenParts[1]
    const timestamp = Number.parseInt(tokenParts[2])

    // Check if token has expired (15 minutes)
    if (Date.now() - timestamp > 15 * 60 * 1000) {
      return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 })
    }

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    // Validate password strength
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 })
    }

    // Check if email exists
    if (!passwords.hasOwnProperty(email)) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    // Update password
    passwords[email] = newPassword

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now sign in with your new password.",
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Password reset failed. Please try again." }, { status: 500 })
  }
}
