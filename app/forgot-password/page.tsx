"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Shield, ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
  { label: "One special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "otp" | "reset">("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [userType, setUserType] = useState<"admin" | "user">("admin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    resetToken: "",
  })

  const [otpInfo, setOtpInfo] = useState({
    attemptsLeft: 3,
    maskedEmail: "",
  })

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          userType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        setOtpInfo((prev) => ({ ...prev, maskedEmail: data.maskedEmail }))
        setStep("otp")
      } else {
        setError(data.error || "Failed to send reset code")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormData((prev) => ({ ...prev, resetToken: data.resetToken }))
        setStep("reset")
        setSuccess("Code verified! Now set your new password.")
      } else {
        setError(data.error || "Invalid verification code")
        if (data.attemptsLeft !== undefined) {
          setOtpInfo((prev) => ({ ...prev, attemptsLeft: data.attemptsLeft }))
        }
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: formData.resetToken,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setError(data.error || "Failed to reset password")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setFormData((prev) => ({ ...prev, otp: "" }))
    setOtpInfo((prev) => ({ ...prev, attemptsLeft: 3 })) // Reset attempts on resend
    await handleSendOTP(new Event("submit") as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">EV-SOAR</h1>
          </div>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (step === "otp") setStep("email")
                  else if (step === "reset") setStep("otp")
                  else router.push("/login")
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle>
                  {step === "email" && "Reset Password"}
                  {step === "otp" && "Enter Verification Code"}
                  {step === "reset" && "Set New Password"}
                </CardTitle>
                <CardDescription>
                  {step === "email" && "Enter your email to receive a reset code"}
                  {step === "otp" && "Check your email for the 6-digit code"}
                  {step === "reset" && "Create a strong new password"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {step === "email" && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <Tabs value={userType} onValueChange={(value) => setUserType(value as "admin" | "user")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="user">User</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending code...
                    </div>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label>Enter 6-digit code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={formData.otp}
                      onChange={(value) => setFormData((prev) => ({ ...prev, otp: value }))}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-center text-gray-500">Code sent to {otpInfo.maskedEmail}</p>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">
                      {error}
                      {otpInfo.attemptsLeft > 0 && (
                        <span className="block mt-1">{otpInfo.attemptsLeft} attempt(s) remaining</span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={loading || formData.otp.length !== 6}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <Button type="button" variant="ghost" className="w-full" onClick={handleResendOTP} disabled={loading}>
                    Resend Code
                  </Button>
                </div>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Password Requirements */}
                  {formData.newPassword && (
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => {
                        const isMet = req.test(formData.newPassword)
                        return (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            {isMet ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <X className="h-3 w-3 text-gray-400" />
                            )}
                            <span className={isMet ? "text-green-600" : "text-gray-500"}>{req.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <p className="text-xs text-red-600">Passwords do not match</p>
                  )}
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Resetting password...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
