"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
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
            <Link href="/features" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="/pricing" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
              About
            </Link>
          </nav>
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
