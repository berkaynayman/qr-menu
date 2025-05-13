import Link from "next/link"
import Image from "next/image"
import { ArrowRight, QrCode, Smartphone, Edit3, Globe, Palette, BarChart3, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container m-0-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Features That Make QR Menu Shine
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  QR Menu is built for modern restaurants, cafés, food trucks, and any place serving up great food. Our
                  platform gives you all the tools you need to offer a smooth, contactless menu experience — without the
                  tech headache.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container m-0-auto px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Instant QR Code Generation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Create a unique QR code for your menu in seconds. Download, print, and place it anywhere — on
                    tables, windows, takeout packaging, or displays.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mobile-Friendly Digital Menus</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your menu looks great on any device. Clean layout, easy navigation, and no app required — just scan
                    and view.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Edit3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Menu Editing</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Update your menu any time — prices, items, descriptions — all with a simple dashboard. No reprints,
                    no delays.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Coming Soon
                </div>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Multi-Language Support</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Serve customers in their native language. We're working on multilingual menu support to help you
                    connect with a wider audience.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  In Development
                </div>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Branding</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Make it yours — upload your logo, choose your colors, and match your menu to your restaurant's vibe.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                  Future Feature
                </div>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Usage Insights</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    See how often your menu is scanned, what's most viewed, and gather valuable insights to improve your
                    offerings.
                  </p>
                  <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full opacity-70"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tagline Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container m-0-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Built for simplicity. Designed for restaurants.
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Whether you're running a single location or managing multiple branches, QR Menu helps you stay
                efficient, modern, and customer-friendly — with no extra effort.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container m-0-auto px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Restaurants Love QR Menu</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Join hundreds of restaurants already using QR Menu to streamline their operations and enhance customer
                  experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Reduce printing costs and waste</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Update menus instantly without reprinting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Provide a contactless, hygienic experience</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Showcase high-quality images of your dishes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Easily manage seasonal or daily specials</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/restaurant-owner-pointing.jpeg"
                  alt="Restaurant owner showing digital menu"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container m-0-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to modernize your menu?
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                  Join thousands of restaurants already using QR Menu to create beautiful, digital menus.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Create Your Free Menu
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container m-0-auto px-4 md:px-6">
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
