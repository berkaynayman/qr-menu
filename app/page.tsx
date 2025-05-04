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
        <div className="container flex h-14 items-center m-0-auto">
          <MobileNav />
          <Link className="flex items-center justify-center mr-4" href="/">
            <Image src="/qr-menu-logo.png" alt="Menulya Logo" width={32} height={32} className="mr-2" />
            <span className="font-bold text-xl">Menulya</span>
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
          <div className="container m-0-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Create Beautiful QR Code Menus with Menulya
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-[600px]">
                    Go contactless and modern with Menulya — the smart way to build and manage your restaurant's digital
                    menu.
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-[600px]">
                  No apps, no downloads — just scan and view. At menulya.com, your menu is just a scan away. Delight
                  your guests with a fast, elegant mobile menu experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5 w-full sm:w-auto">
                      Create My Menu
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Try a Live Demo
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
          <div className="container m-0-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Key Features</h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400 max-w-[900px] mx-auto">
                  Everything you need for a modern digital menu experience
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Free QR Code Menu Generator</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Instantly create and share your menu with customers through a simple QR code.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Mobile-Optimized Interface</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Perfect viewing on any smartphone or tablet, ensuring a great experience for all your guests.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-Time Menu Editing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Make updates on the go - change prices, add specials, or update descriptions instantly.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Modern and Clean Layouts</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Designed for great usability with beautiful, easy-to-read menu templates.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 3a9 9 0 1 0 9 9" />
                    <path d="M12 3v6" />
                    <path d="M16.5 7.5 12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Eco-Friendly & Contactless</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No printing, no physical contact, no hassle - better for the environment and your customers.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Completely Free</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  All essential features are free to use, with no hidden fees or surprise charges.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get Started with Menulya — It's Free
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  Create your digital menu today and elevate your guest experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5">
                    Create My Menu
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Try a Live Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Menulya. All rights reserved.</p>
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
