"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  variant?: "default" | "dashboard" | "minimal"
}

export function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const isDashboard = variant === "dashboard"
  const isMinimal = variant === "minimal"

  const navItems = [
    { label: "Features", href: "/features", show: !isDashboard && !isMinimal },
    { label: "Pricing", href: "/pricing", show: !isDashboard && !isMinimal },
    { label: "About", href: "/about", show: !isDashboard && !isMinimal },
    { label: "Dashboard", href: "/dashboard", show: isDashboard },
  ].filter((item) => item.show)

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-0-auto flex h-14 items-center">
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 px-2 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <Image src="/qr-menu-logo.png" alt="Menulya Logo" width={32} height={32} />
                  <span className="font-bold text-xl">Menulya</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium hover:text-primary ${pathname === item.href ? "text-primary" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 mt-4">
                {isAuthenticated ? (
                  <>
                    <div className="p-3 border rounded-md mb-2">
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
                    <Button
                      className="w-full flex items-center gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      variant="outline"
                      onClick={() => {
                        logout()
                        setOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link className="flex items-center justify-center mr-4" href="/">
          <Image src="/qr-menu-logo.png" alt="Menulya Logo" width={32} height={32} className="mr-2" />
          <span className="font-bold text-xl">Menulya</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 ml-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${pathname === item.href ? "text-primary" : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="ml-auto hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative">
              {/* User dropdown trigger */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 h-9 font-medium"
                onClick={toggleUserDropdown}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="hidden sm:inline">{user?.restaurantName || "Your Restaurant"}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>

              {/* User dropdown menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50">
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{user?.restaurantName || "Your Restaurant"}</p>
                        <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/create-menu" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      Create New Menu
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      Account Settings
                    </Link>
                  </div>

                  <div className="border-t py-1">
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
