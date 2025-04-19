"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Download, QrCode } from "lucide-react"
import QRCode from "qrcode"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CreateQRPage() {
  const router = useRouter()
  const qrRef = useRef<HTMLCanvasElement>(null)
  const [menuUrl, setMenuUrl] = useState("https://example.com/menu/menu1")
  const [qrColor, setQrColor] = useState("#000000")
  const [qrSize, setQrSize] = useState(200)
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(
        qrRef.current,
        menuUrl,
        {
          width: qrSize,
          margin: 2,
          color: {
            dark: qrColor,
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error)
        },
      )
    }
  }, [menuUrl, qrColor, qrSize])

  const downloadQRCode = () => {
    if (qrRef.current) {
      const link = document.createElement("a")
      link.download = "qr-menu-code.png"
      link.href = qrRef.current.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">QR Code Generator</h1>
        <Button className="ml-auto" onClick={downloadQRCode}>
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Settings</CardTitle>
            <CardDescription>Customize your QR code appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-url">Menu URL</Label>
              <Input id="menu-url" value={menuUrl} onChange={(e) => setMenuUrl(e.target.value)} />
              <p className="text-xs text-gray-500">This is the URL that your QR code will link to</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-color">QR Code Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="qr-color"
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer p-1"
                />
                <Input type="text" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-size">QR Code Size</Label>
              <Input
                id="qr-size"
                type="range"
                min="100"
                max="400"
                step="10"
                value={qrSize}
                onChange={(e) => setQrSize(Number.parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>Small</span>
                <span>{qrSize}px</span>
                <span>Large</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
            <CardDescription>Scan this code to view your menu</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="print">Print Version</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="flex justify-center p-4">
                <img src="data:image/png;base64,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" 
                alt="QR Code" className="w-1/2" />
              </TabsContent>
              <TabsContent value="print" className="p-4">
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                  <h3 className="text-xl font-bold">Scan for our Digital Menu</h3>
                  <canvas ref={qrRef} />
                  <p className="text-center text-sm text-gray-500">
                    Scan this QR code with your smartphone camera to view our menu
                  </p>
                </div>
                <Button className="mt-4 w-full" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download for Printing
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>What to do with your QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Download</h3>
              <p className="text-sm text-gray-500">Download your QR code as a high-quality PNG image for printing</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Print</h3>
              <p className="text-sm text-gray-500">Print your QR code and place it on tables or in your menu</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                  <path d="M10 2c1 .5 2 2 2 5" />
                </svg>
              </div>
              <h3 className="font-medium">Share</h3>
              <p className="text-sm text-gray-500">Share the QR code on social media or your website</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
