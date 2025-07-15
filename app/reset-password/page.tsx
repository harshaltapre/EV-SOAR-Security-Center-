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
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Supabase passes the access_token in the URL hash after a password reset email link is clicked
    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1)) // Remove '#'
    const accessToken = params.get("access_token")

    if (accessToken) {
      setToken(accessToken)
      // Optionally, you can immediately set the session with this token
      // This is often handled by Supabase's client library automatically on page load
      // if it detects an access_token in the URL hash.
      const supabase = createSupabaseBrowserClient()
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: params.get("refresh_token") || "" })
        .then(({ data, error }) => {
          if (error) {
            console.error("Error setting session from URL hash:", error.message)
            toast({
              title: "Error",
              description: "Failed to validate reset link. Please try again.",
              variant: "destructive",
            })
            setToken(null) // Invalidate token if session setting fails
          } else if (!data.session) {
            // This can happen if the token is expired or invalid
            toast({
              title: "Error",
              description: "Invalid or expired reset link. Please request a new one.",
              variant: "destructive",
            })
            setToken(null)
          }
        })
    } else {
      // If no token is present, the user might have navigated directly or the link is malformed
      toast({
        title: "Invalid Link",
        description: "This password reset link is invalid or has expired. Please request a new one.",
        variant: "destructive",
      })
    }
  }, [])

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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!token) {
      toast({
        title: "Error",
        description: "Invalid or missing reset token. Please request a new password reset link.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Reset Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast({
        title: "Reset Failed",
        description: passwordError,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.updateUser({ password: password })

      if (error) {
        console.error("Supabase password reset error:", error.message)
        toast({
          title: "Reset Failed",
          description: error.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated. You can now log in with your new password.",
          variant: "default",
        })
        router.push("/login")
      }
    } catch (error) {
      console.error("Password reset error:", error)
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
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">Set Your New Password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
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
              <Label htmlFor="confirm-password">Confirm New Password</Label>
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
              disabled={loading || !token}
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
