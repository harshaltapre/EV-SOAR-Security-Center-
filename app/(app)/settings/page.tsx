"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

interface UserProfile {
  id: string
  email: string
  name: string
  phone: string
  vehicleInfo: {
    make: string
    model: string
    year: string
    licensePlate: string
  }
}

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/profile")
        const data = await response.json()

        if (response.ok) {
          setUserProfile(data)
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to load profile data.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Could not connect to the server to load profile.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id.startsWith("vehicle-")) {
      const key = id.replace("vehicle-", "") as keyof UserProfile["vehicleInfo"]
      setUserProfile((prev) => (prev ? { ...prev, vehicleInfo: { ...prev.vehicleInfo, [key]: value } } : null))
    } else {
      setUserProfile((prev) => (prev ? { ...prev, [id]: value } : null))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userProfile?.name,
          phone: userProfile?.phone,
          vehicleMake: userProfile?.vehicleInfo.make,
          vehicleModel: userProfile?.vehicleInfo.model,
          vehicleYear: userProfile?.vehicleInfo.year,
          vehicleLicensePlate: userProfile?.vehicleInfo.licensePlate,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: data.message,
          variant: "default",
        })
      } else {
        toast({
          title: "Update Failed",
          description: data.error || "An unexpected error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error",
        description: "Could not connect to the server to save profile.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Loading Profile...</CardTitle>
            <CardDescription>Please wait while your profile data loads.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Unable to load user profile. Please try again later.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={userProfile.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={userProfile.email} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={userProfile.phone} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Manage your EV details for charging and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-make">Make</Label>
                <Input id="vehicle-make" value={userProfile.vehicleInfo.make} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-model">Model</Label>
                <Input id="vehicle-model" value={userProfile.vehicleInfo.model} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-year">Year</Label>
                <Input id="vehicle-year" type="number" value={userProfile.vehicleInfo.year} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-licensePlate">License Plate</Label>
                <Input id="vehicle-licensePlate" value={userProfile.vehicleInfo.licensePlate} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
