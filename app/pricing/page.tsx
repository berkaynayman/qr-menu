import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container m-0-auto flex h-14 items-center">
          <MobileNav />
          <Link className="flex items-center justify-center mr-4" href="/">
            <Image src="/qr-menu-logo.png" alt="Menulya Logo" width={32} height={32} className="mr-2" />
            <span className="font-bold text-xl">Menulya</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors text-primary" href="/pricing">
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
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-lg text-gray-500 md:text-xl">
                No surprises, no hidden fees. Just a great product.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-3xl m-0-auto">
              <Card className="overflow-hidden border-2 border-primary">
                <CardHeader className="bg-primary/5 pb-9 pt-6 text-center">
                  <CardTitle className="text-3xl font-bold">Free — For Now, and For Real</CardTitle>
                  <CardDescription className="text-base mt-2.5">
                    At Menulya, we're on a mission to help restaurants and food businesses go digital — quickly, easily,
                    and without barriers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-8 sm:p-10">
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-3 rounded-lg border p-4 sm:p-6">
                      <div className="flex items-center gap-2 font-medium">
                        <Check className="h-5 w-5 text-primary" />
                        <span>No hidden fees</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <Check className="h-5 w-5 text-primary" />
                        <span>No credit card required</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <Check className="h-5 w-5 text-primary" />
                        <span>No setup charges</span>
                      </div>
                    </div>

                    <p className="text-gray-500">
                      We believe in earning your trust before asking for your business. While Menulya remains free,
                      you'll get full access to all core features:
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>Unlimited digital menus</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>Instant QR code generation</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>Real-time menu editing</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>Mobile-friendly experience</span>
                      </div>
                    </div>

                    <div className="mt-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <p className="text-sm text-gray-500">
                        We're building a platform that grows with you. In the future, we may introduce paid plans with
                        advanced features — but the core experience you're enjoying today will always offer great value
                        at zero cost.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 bg-gray-50 p-6 dark:bg-gray-800/50">
                  <div className="text-center">
                    <p className="font-medium">So go ahead — give your guests a modern dining experience. Risk-free.</p>
                  </div>
                  <Link href="/register" className="w-full">
                    <Button size="lg" className="w-full gap-1.5">
                      Get Started Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h2 className="text-2xl font-bold">Questions about our pricing?</h2>
              <p className="mt-4 text-gray-500">
                We're here to help. If you have any questions about our pricing or features, please don't hesitate to
                reach out.
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
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
