// This is a mock in-memory database for demonstration purposes.
// In a real application, you would use a persistent database like Supabase, Neon, or PostgreSQL.

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  stationId?: string
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

interface OTP {
  otp: string
  expires: number
  attempts: number
}

interface ResetToken {
  email: string
  expires: number
}

// Initialize with a default admin user
const initialUsers: User[] = [
  {
    id: "admin-1",
    email: "harshaltapre27@yahoo.com",
    name: "System Administrator",
    role: "admin",
    stationId: "STATION-001",
    permissions: ["view_all", "manage_threats", "system_config", "user_management"],
    createdAt: "2024-01-01T00:00:00Z",
    emailVerified: true,
  },
]

const initialPasswords: Record<string, string> = {
  "harshaltapre27@yahoo.com": "Admin123",
}

// Use a Map for better performance and clarity for in-memory storage
export const users = new Map<string, User>(initialUsers.map((user) => [user.email, user]))
export const passwords = new Map<string, string>(Object.entries(initialPasswords))
export const otpStorage = new Map<string, OTP>()
export const resetTokenStorage = new Map<string, ResetToken>()

// Function to add a new user
export const addUser = (user: User, passwordHash: string) => {
  users.set(user.email, user)
  passwords.set(user.email, passwordHash)
}

// Function to update an existing user
export const updateUser = (email: string, updates: Partial<User>) => {
  const user = users.get(email)
  if (user) {
    users.set(email, { ...user, ...updates })
    return users.get(email)
  }
  return null
}

// Function to get a user by email
export const getUserByEmail = (email: string) => {
  return users.get(email)
}

// Function to get password by email
export const getPasswordByEmail = (email: string) => {
  return passwords.get(email)
}

// Function to store OTP
export const storeOTP = (email: string, otp: OTP) => {
  otpStorage.set(email, otp)
}

// Function to get OTP
export const getOTP = (email: string) => {
  return otpStorage.get(email)
}

// Function to delete OTP
export const deleteOTP = (email: string) => {
  otpStorage.delete(email)
}

// Function to store reset token
export const storeResetToken = (token: string, data: ResetToken) => {
  resetTokenStorage.set(token, data)
}

// Function to get reset token
export const getResetToken = (token: string) => {
  return resetTokenStorage.get(token)
}

// Function to delete reset token
export const deleteResetToken = (token: string) => {
  resetTokenStorage.delete(token)
}
