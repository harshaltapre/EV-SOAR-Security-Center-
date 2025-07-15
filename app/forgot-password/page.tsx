"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Shield } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Password Reset Email Sent",
          description: data.message || "Please check your inbox for instructions to reset your password.",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send password reset email. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Forgot password error:", error)
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
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">Forgot Your Password?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <form onSubmit={handleForgotPassword} className="space-y-5">
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
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
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
