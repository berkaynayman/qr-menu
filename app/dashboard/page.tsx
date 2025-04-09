"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, Menu, Plus, QrCode, Settings, User, Trash2 } from "lucide-react"

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

// Mock data
const mockMenus = [
  {
    id: "menu1",
    name: "Lunch Menu",
    description: "Our delicious lunch offerings",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-03-15T00:00:00.000Z",
  },
  {
    id: "menu2",
    name: "Dinner Menu",
    description: "Evening specialties",
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-03-10T00:00:00.000Z",
  },
  {
    id: "menu3",
    name: "Dessert Menu",
    description: "Sweet treats",
    createdAt: "2023-02-01T00:00:00.000Z",
    updatedAt: "2023-03-01T00:00:00.000Z",
  },
]

const mockStats = {
  totalMenus: 3,
  totalQrCodes: 3,
  totalItems: 12,
  totalScans: 128,
}

export default function DashboardPage() {
  const router = useRouter()
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return

    setIsDeleting(true)
    try {
      // Simulate deletion
      setTimeout(() => {
        setIsDeleting(false)
        setMenuToDelete(null)
      }, 1000)
    } catch (error) {
      console.error("Error deleting menu:", error)
      setIsDeleting(false)
      setMenuToDelete(null)
    }
  }

  // Format dates in a consistent way
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    } catch (e) {
      return "Invalid date"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/menus"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
                Menus
              </Link>
              <Link
                href="/dashboard/qr-codes"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
                QR Codes
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
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
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/menus"
            className="flex items-center gap-2 text-lg font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Menus
          </Link>
          <Link
            href="/dashboard/qr-codes"
            className="flex items-center gap-2 text-lg font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            QR Codes
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 text-lg font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Settings
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="ml-auto md:ml-0" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
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
        <div className="mt-8 grid gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">Your Menus</h2>
            <Button onClick={() => router.push("/dashboard/create-menu")}>
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Create Menu</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockMenus.map((menu) => (
              <Card key={menu.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>{menu.name}</CardTitle>
                  <CardDescription>Updated {formatDate(menu.updatedAt)}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                      Menu Preview
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 p-4">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/edit-menu/${menu.id}`)}>
                    Edit Menu
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/menu/${menu.id}`)}>
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
                    onClick={() => setMenuToDelete(menu.id)}
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
        </div>
      </main>

      <AlertDialog open={!!menuToDelete} onOpenChange={(open) => !open && setMenuToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this menu?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu and all its categories and items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMenu} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
