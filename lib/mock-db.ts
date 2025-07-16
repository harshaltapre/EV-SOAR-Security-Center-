// This file is no longer actively used as Supabase is integrated for data persistence.
// It is kept for reference if any mock data logic is needed in the future.

interface User {
  id: string
  email: string
  passwordHash: string
  name?: string
  phone?: string
  role: "user" | "admin"
  isEmailConfirmed: boolean
  resetToken?: string
  resetTokenExpires?: Date
  vehicleInfo?: {
    make?: string
    model?: string
    year?: number
    licensePlate?: string
  }
}

interface Charger {
  id: string
  location: string
  status: "online" | "offline" | "charging" | "maintenance"
  lastHeartbeat: Date
  threatLevel: "low" | "medium" | "high" | "critical"
}

interface ThreatIncident {
  id: string
  chargerId: string
  type: string
  description: string
  timestamp: Date
  status: "open" | "resolved" | "investigating"
  severity: "low" | "medium" | "high" | "critical"
}

interface ChargingSession {
  id: string
  userId: string
  chargerId: string
  startTime: Date
  endTime: Date
  energyConsumedKWh: number
  cost: number
}

export const mockUsers: User[] = [
  {
    id: "user1",
    email: "user@example.com",
    passwordHash: "$2a$10$abcdefghijklmnopqrstuv", // Placeholder for hashed password
    name: "Regular User",
    role: "user",
    isEmailConfirmed: true,
  },
  {
    id: "admin1",
    email: "harshaltapre27@yahoo.com",
    passwordHash: "$2a$10$abcdefghijklmnopqrstuv", // Placeholder for hashed password
    name: "Admin User",
    role: "admin",
    isEmailConfirmed: true,
  },
]

export const mockChargers: Charger[] = [
  {
    id: "charger1",
    location: "Station A, Bay 1",
    status: "online",
    lastHeartbeat: new Date(),
    threatLevel: "low",
  },
  {
    id: "charger2",
    location: "Station A, Bay 2",
    status: "charging",
    lastHeartbeat: new Date(),
    threatLevel: "medium",
  },
]

export const mockThreatIncidents: ThreatIncident[] = [
  {
    id: "threat1",
    chargerId: "charger1",
    type: "Unauthorized Access Attempt",
    description: "Multiple failed login attempts detected on charger firmware.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: "open",
    severity: "high",
  },
]

export const mockChargingSessions: ChargingSession[] = [
  {
    id: "session1",
    userId: "user1",
    chargerId: "charger1",
    startTime: new Date(Date.now() - 7200000), // 2 hours ago
    endTime: new Date(Date.now() - 3600000), // 1 hour ago
    energyConsumedKWh: 15.5,
    cost: 7.75,
  },
]
