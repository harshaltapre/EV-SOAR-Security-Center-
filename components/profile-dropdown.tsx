"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link" // Import Link
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, LogOut, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ProfileDropdownProps {
  user: {
    id: string
    email: string
    name: string
    role: string
    phone?: string
    vehicleInfo?: {
      make: string
      model: string
      year: number
      licensePlate: string
    }
  }
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    phone: user.phone || "",
    vehicleInfo: user.vehicleInfo || {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      licensePlate: "",
    },
  })

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      localStorage.removeItem("user")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        const data = await response.json()
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        setIsProfileOpen(false)
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        })
        // Refresh the page to update the UI
        window.location.reload()
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white text-xs">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground capitalize">{user.role} Account</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="col-span-3"
                  placeholder="+1234567890"
                />
              </div>

              {user.role === "user" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="make" className="text-right">
                      Vehicle Make
                    </Label>
                    <Input
                      id="make"
                      value={profileData.vehicleInfo.make}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          vehicleInfo: { ...prev.vehicleInfo, make: e.target.value },
                        }))
                      }
                      className="col-span-3"
                      placeholder="Tesla"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">
                      Vehicle Model
                    </Label>
                    <Input
                      id="model"
                      value={profileData.vehicleInfo.model}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          vehicleInfo: { ...prev.vehicleInfo, model: e.target.value },
                        }))
                      }
                      className="col-span-3"
                      placeholder="Model 3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={profileData.vehicleInfo.year}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          vehicleInfo: { ...prev.vehicleInfo, year: Number.parseInt(e.target.value) },
                        }))
                      }
                      className="col-span-3"
                      min="2000"
                      max="2030"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="license" className="text-right">
                      License Plate
                    </Label>
                    <Input
                      id="license"
                      value={profileData.vehicleInfo.licensePlate}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          vehicleInfo: { ...prev.vehicleInfo, licensePlate: e.target.value },
                        }))
                      }
                      className="col-span-3"
                      placeholder="ABC-123"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
