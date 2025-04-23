import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-0-auto flex h-14 items-center">
        <MobileNav />
        <Link className="flex items-center justify-center mr-4" href="/">
          <Image src="/qr-menu-logo.png" alt="QR Menu Logo" width={32} height={32} className="mr-2" />
          <span className="font-bold text-xl">QR Menu</span>
        </Link>
        <nav className="hidden md:flex gap-6 ml-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/about">
            About
          </Link>
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
