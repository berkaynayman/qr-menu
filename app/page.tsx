import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const carouselImages = [
    {
      src: "/chef-with-menu.jpeg",
      alt: "Chef showing digital menu on smartphone",
    },
    {
      src: "/restaurant-owner-busy.jpeg",
      alt: "Restaurant owner showing digital menu in a busy restaurant",
    },
    {
      src: "/restaurant-owner-pointing.jpeg",
      alt: "Restaurant owner pointing to digital menu on smartphone",
    },
    {
      src: "/middle-eastern-restaurant.jpeg",
      alt: "Middle Eastern restaurant owner showing digital menu",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Create Digital Menus with QR Codes
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-[600px]">
                    Modernize your restaurant with digital menus. Easy to update, accessible via QR codes, and
                    completely customizable.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5 w-full sm:w-auto">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] h-[300px] w-full overflow-hidden rounded-xl lg:h-[400px] xl:h-[450px] order-first lg:order-last">
                <ImageCarousel images={carouselImages} />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400 max-w-[900px] mx-auto">
                  Create and manage your digital menu in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold">Sign Up & Create Menu</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Register for an account and start building your digital menu with our easy-to-use editor.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold">Generate QR Code</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  With one click, generate a unique QR code that links directly to your digital menu.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold">Display & Update</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Print your QR code for tables, update your menu anytime, and changes appear instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 QR Menu. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
