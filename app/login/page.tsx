"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Shield, User, Crown } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"admin" | "user">("user")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Login Successful",
          description: `Welcome, ${data.user.name || data.user.email}!`,
          variant: "default",
        })
        if (data.user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        let toastDescription = data.error || "An unexpected error occurred."
        if (toastDescription.includes("Please confirm your email address")) {
          toastDescription = "Please confirm your email address to log in. Check your inbox for a verification link."
        } else if (toastDescription.includes("Invalid email or password")) {
          toastDescription = "Invalid email or password. Please double-check your credentials."
        }
        toast({
          title: "Login Failed",
          description: toastDescription,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
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
      <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center space-y-3 p-6 pb-4">
          <div className="flex items-center justify-center gap-3 text-blue-600">
            <Shield className="h-10 w-10 animate-bounce-in" />
            <CardTitle className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
              EV-SOAR
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
            Secure EV Charging Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-base focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 text-base focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Login As</Label>
              <RadioGroup
                defaultValue="user"
                value={userType}
                onValueChange={(value: "admin" | "user") => setUserType(value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" className="text-blue-600" />
                  <Label htmlFor="user" className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4" /> User
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" className="text-blue-600" />
                  <Label htmlFor="admin" className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                    <Crown className="h-4 w-4" /> Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
            {userType === "user" && (
              <p>
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="underline text-blue-600 hover:text-blue-700 transition-colors"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </p>
            )}
            <p>
              <Link
                href="/forgot-password"
                className="underline text-blue-600 hover:text-blue-700 transition-colors"
                prefetch={false}
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
