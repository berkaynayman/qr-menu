import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create QR Code Menus for Free | Menulya.com",
  description:
    "Create and manage digital menus with Menulya.com. Generate QR codes, update your menu anytime, and deliver a contactless dining experience — completely free.",
  metadataBase: new URL("https://www.menulya.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.menulya.com",
    title: "Create QR Code Menus for Free | Menulya.com",
    description:
      "Create and manage digital menus with Menulya.com. Generate QR codes, update your menu anytime, and deliver a contactless dining experience — completely free.",
    siteName: "Menulya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create QR Code Menus for Free | Menulya.com",
    description:
      "Create and manage digital menus with Menulya.com. Generate QR codes, update your menu anytime, and deliver a contactless dining experience — completely free.",
  },
  alternates: {
    canonical: "https://www.menulya.com",
  },
  generator: "www.berkaynayman.com",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
