import { type NextRequest, NextResponse } from "next/server"
import { addUser, users } from "@/lib/mock-db" // Import from mock-db

interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
  vehicleInfo?: {
    make: string
    model: string
    year: number
    licensePlate: string
  }
  termsAccepted: boolean
}

interface User {
  id: string
  email: string
  name: string
  role: "user"
  permissions: string[]
  phone?: string
  vehicleInfo?: {
    make: string
    model: string
    year: number
    licensePlate: string
  }
  createdAt: string
  emailVerified: boolean
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
    const body: RegisterRequest = await request.json()
    const { name, email, password, phone, vehicleInfo, termsAccepted } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    if (!termsAccepted) {
      return NextResponse.json({ error: "You must accept the terms and conditions" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Password validation
    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 })
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "user",
      permissions: ["view_sessions", "start_charging", "view_history"],
      phone,
      vehicleInfo,
      createdAt: new Date().toISOString(),
      emailVerified: false, // Set to false, can be verified later
    }

    // Store user and password (in production, hash the password)
    addUser(newUser, password)

    return NextResponse.json({
      success: true,
      message: "Account created successfully! You can now sign in.",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
