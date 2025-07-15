"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Shield } from "lucide-react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [vehicleYear, setVehicleYear] = useState("")
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter."
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter."
    }
    if (!hasDigit) {
      return "Password must contain at least one digit."
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character."
    }
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast({
        title: "Registration Failed",
        description: passwordError,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!agreedToTerms) {
      toast({
        title: "Registration Failed",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          vehicleMake,
          vehicleModel,
          vehicleYear,
          vehicleLicensePlate,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: data.message || "Please check your email to confirm your account.",
          variant: "default",
        })
        router.push("/login")
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "An unexpected error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center space-y-3 p-6 pb-4">
          <div className="flex items-center justify-center gap-3 text-blue-600">
            <Shield className="h-10 w-10 animate-bounce-in" />
            <CardTitle className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
              EV-SOAR
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">Create Your Account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Vehicle Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-make">Make</Label>
                  <Input
                    id="vehicle-make"
                    type="text"
                    placeholder="Tesla"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-model">Model</Label>
                  <Input
                    id="vehicle-model"
                    type="text"
                    placeholder="Model 3"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-year">Year</Label>
                  <Input
                    id="vehicle-year"
                    type="number"
                    placeholder="2023"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license-plate">License Plate</Label>
                  <Input
                    id="license-plate"
                    type="text"
                    placeholder="ABC-123"
                    value={vehicleLicensePlate}
                    onChange={(e) => setVehicleLicensePlate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(!!checked)} />
              <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="#" className="underline hover:text-blue-600" prefetch={false}>
                  Terms and Conditions
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline text-blue-600 hover:text-blue-700 transition-colors"
              prefetch={false}
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
