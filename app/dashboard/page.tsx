"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, Menu, Plus, QrCode, Settings, User, Trash2, LogOut, HelpCircle } from "lucide-react"
import { getUserMenus } from "@/lib/api/menus"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const mockStats = {
  totalMenus: 3,
  totalQrCodes: 3,
  totalItems: 12,
  totalScans: 128,
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [menus, setMenus] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    async function fetchMenus() {
      if (!isAuthenticated) return

      try {
        const data = await getUserMenus()
        setMenus(data)
      } catch (err: any) {
        setError(err.message || "Failed to load menus")
      } finally {
        setLoading(false)
      }
    }

    if (!isLoading) {
      fetchMenus()
    }
  }, [isAuthenticated, isLoading])

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return

    setIsDeleting(true)
    // Buraya gerçek DELETE endpoint geldiyse entegre ederiz
    setTimeout(() => {
      setMenus(menus.filter((menu) => menu._id !== menuToDelete))
      setIsDeleting(false)
      setMenuToDelete(null)
    }, 1000)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 bg-gray-100 px-3 py-2 dark:bg-gray-800">
                <ChevronRight className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/menus"
                className="flex items-center gap-2 px-3 py-2 text-gray-500 dark:text-gray-400"
              >
                <ChevronRight className="h-4 w-4" />
                Menus
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-3 py-2 text-gray-500 dark:text-gray-400"
              >
                <ChevronRight className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/qr-menu-logo.png" alt="QR Menu Logo" width={32} height={32} />
          <span>QR Menu</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/dashboard" className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User profile with visible dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3"
              onClick={() => document.getElementById("user-dropdown")?.classList.toggle("hidden")}
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">{user?.restaurantName || "Account"}</span>
            </Button>

            {/* Dropdown menu - always in the DOM but toggled with hidden class */}
            <div
              id="user-dropdown"
              className="hidden absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50"
            >
              <div className="p-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.restaurantName || "Restaurant"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <ChevronRight className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/create-menu" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create New Menu</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </div>

              <div className="border-t py-1">
                <Link href="/help" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </div>

              <div className="border-t py-1">
                <button onClick={logout} className="flex w-full items-center px-4 py-2 text-red-500 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Separate visible logout button */}
          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMenus}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+0% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total QR Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalScans}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+14% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalItems}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalQrCodes}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Same as last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Your Menus</h2>
          <Button onClick={() => router.push("/dashboard/create-menu")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Menu
          </Button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading menus...</p>
        ) : menus.length === 0 ? (
          <p>No menus found. Start by creating a new one.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menus.map((menu) => (
              <Card key={menu._id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>{menu.menuName}</CardTitle>
                  <CardDescription>{menu.menuDescription || "No description"}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-56 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center">
                      <img src={menu.qrCode || "/placeholder.svg"} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 p-4">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/edit-menu/${menu._id}`)}>
                    Edit Menu
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/menu/${menu._id}`)}>
                    View on Website
                  </Button>
                  <Button size="sm" onClick={() => router.push(`/dashboard/create-qr`)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    View QR
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setMenuToDelete(menu._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-medium">Create a New Menu</h3>
              <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                Add a new menu for your restaurant with categories, items, and prices.
              </p>
              <Button className="mt-6" onClick={() => router.push("/dashboard/create-menu")}>
                Create Menu
              </Button>
            </Card>
          </div>
        )}
      </main>

      <AlertDialog open={!!menuToDelete} onOpenChange={(open) => !open && setMenuToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the menu.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMenu} className="bg-red-500" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
