import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="space-y-4 text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About QR Menu</h1>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="lead text-lg sm:text-xl text-gray-500 dark:text-gray-400">
                At QR Menu, we believe dining should be a seamless experience — for both customers and restaurant
                owners. Our mission is to bring simplicity, efficiency, and elegance to the way menus are shared and
                experienced.
              </p>

              <p>
                Born out of a desire to modernize traditional dining, QR Menu empowers restaurants, cafés, bars, and
                food trucks to go digital. With just a scan, your guests can instantly view your menu on their phones —
                no app download required. It's faster, safer, and more eco-friendly.
              </p>

              <div className="my-12 bg-gray-50 dark:bg-gray-800 p-4 sm:p-8 rounded-xl">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                  Whether you're a cozy local spot or a fast-paced eatery, QR Menu helps you:
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">1</div>
                    <p className="text-base sm:text-lg font-medium m-0">Easily update your menu in real-time</p>
                  </div>

                  <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">2</div>
                    <p className="text-base sm:text-lg font-medium m-0">Reduce printing costs and waste</p>
                  </div>

                  <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">3</div>
                    <p className="text-base sm:text-lg font-medium m-0">
                      Create a modern, touch-free dining experience
                    </p>
                  </div>

                  <div className="grid grid-cols-[40px_1fr] gap-4 items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">4</div>
                    <p className="text-base sm:text-lg font-medium m-0">
                      Enhance customer engagement with clean, mobile-friendly design
                    </p>
                  </div>
                </div>
              </div>

              <p>
                We're passionate about helping businesses of all sizes stay ahead of the curve. With QR Menu, you're not
                just adopting new technology — you're elevating your entire dining experience.
              </p>

              <div className="mt-12 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Ready to make the switch?</h2>
                <Link href="/register">
                  <Button size="lg" className="gap-1.5 w-full sm:w-auto">
                    Create Your Digital Menu Today
                    <ArrowRight className="h-4 w-4" />
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
