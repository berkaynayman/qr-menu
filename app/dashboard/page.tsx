"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, QrCode, Trash2 } from "lucide-react"
import { getUserMenus, deleteMenu } from "@/lib/api/menus"
import { getDashboardStats, type DashboardStats } from "@/lib/api/stats"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Header } from "@/components/header"
import { TransparentLoadingOverlay } from "@/components/transparent-loading-overlay"



export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [menus, setMenus] = useState<any[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalMenus: 0,
    totalViews: 0,
    mostViewedMenu: null,
    totalCategories: 0,
    totalItems: 0,
    avgViewsPerMenu: 0
  })
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
    async function fetchData() {
      if (!isAuthenticated) return

      try {
        setLoading(true)
        const [menuData, statsData] = await Promise.all([
          getUserMenus(),
          getDashboardStats()
        ])
        
        setMenus(menuData)
        setStats(statsData)
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    if (!isLoading) {
      fetchData()
    }
  }, [isAuthenticated, isLoading])

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return

    setIsDeleting(true)
    try {
      await deleteMenu(menuToDelete)
      setMenus(menus.filter((menu) => menu._id !== menuToDelete))
    } catch (err: any) {
      setError(err.message || "Failed to delete menu")
    } finally {
      setIsDeleting(false)
      setMenuToDelete(null)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="dashboard" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMenus}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
            </CardContent>
          </Card>
        </div>
        {stats.mostViewedMenu && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{stats.mostViewedMenu.name}</p>
                    <p className="text-sm text-muted-foreground">Total views: {stats.mostViewedMenu.views}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/menu/${stats.mostViewedMenu.id}`)}>
                    View Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-6 mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Your Menus</h2>
          <Button onClick={() => router.push("/dashboard/create-menu")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Menu
          </Button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <p className="text-muted-foreground">Loading your menus...</p>
          </div>
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

      <TransparentLoadingOverlay isLoading={loading && !isLoading} message="Loading your menus..." showLogo={false} />

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
