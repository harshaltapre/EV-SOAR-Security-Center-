"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Shield } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get("token")
  const type = searchParams.get("type") as "recovery" | "email_change" | null

  useEffect(() => {
    if (!token || !type) {
      toast({
        title: "Invalid Link",
        description: "The password reset link is missing required parameters.",
        variant: "destructive",
      })
      router.push("/forgot-password")
    }
  }, [token, type, router])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Reset Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password.length < 8) {
      toast({
        title: "Reset Failed",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!token || !type) {
      toast({
        title: "Error",
        description: "Missing reset token or type.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token, type }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Password Reset Successful",
          description: data.message,
          variant: "default",
        })
        router.push("/login")
      } else {
        toast({
          title: "Reset Failed",
          description: data.error || "An unexpected error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Reset password error:", error)
      toast({
        title: "Error",
        description: "Could not connect to the server. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!token || !type) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
        <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
          <CardHeader className="text-center space-y-3 p-6 pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Loading...</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your reset link.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
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
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">Set New Password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                New Password
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
              <Label htmlFor="confirm-password" className="text-gray-700 dark:text-gray-300">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 text-base focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/login"
              className="underline text-blue-600 hover:text-blue-700 transition-colors"
              prefetch={false}
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
