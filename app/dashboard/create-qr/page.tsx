"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Download,
  Share2,
  Printer,
  Palette,
  Settings,
  Smartphone,
  QrCode,
  Table,
  FileImage,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import QRCode from "qrcode"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function CreateQRPage() {
  const router = useRouter()
  const qrRef = useRef<HTMLCanvasElement>(null)
  const [menuUrl, setMenuUrl] = useState("https://menulya.com/menu/sample-menu")
  const [qrColor, setQrColor] = useState("#FF5A1F") // Brand color
  const [qrSize, setQrSize] = useState(250)
  const [qrLogo, setQrLogo] = useState(false)
  const [qrStyle, setQrStyle] = useState("dots")
  const [activeTab, setActiveTab] = useState("customize")
  const [menuName, setMenuName] = useState("Sample Restaurant Menu")
  const [selectedTemplate, setSelectedTemplate] = useState("table-tent")

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
  }, [menuUrl, qrColor, qrSize, qrStyle])

  const downloadQRCode = () => {
    if (qrRef.current) {
      const link = document.createElement("a")
      link.download = `menulya-qr-code-${menuName.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = qrRef.current.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <div className="container mx-auto max-w-5xl p-4 py-8">
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

      <div className="grid gap-6 md:grid-cols-5">
        {/* Left Column - Settings */}
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="customize" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customize" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Customize</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Distribution</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customize" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>QR Code Appearance</CardTitle>
                  <CardDescription>Customize how your QR code looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-color">QR Code Color</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="qr-color"
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="h-10 w-14 cursor-pointer p-1"
                      />
                      <Input
                        type="text"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-1 uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="qr-size">QR Code Size</Label>
                      <span className="text-sm text-muted-foreground">{qrSize}px</span>
                    </div>
                    <Slider
                      id="qr-size"
                      min={150}
                      max={400}
                      step={10}
                      value={[qrSize]}
                      onValueChange={(value) => setQrSize(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qr-style">QR Code Style</Label>
                    <Select value={qrStyle} onValueChange={setQrStyle}>
                      <SelectTrigger id="qr-style">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="squares">Squares</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="menu-name">Menu Name</Label>
                    <Input
                      id="menu-name"
                      placeholder="e.g., Lunch Menu, Dinner Specials"
                      value={menuName}
                      onChange={(e) => setMenuName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">This will be displayed on the printed QR code</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>QR Code Settings</CardTitle>
                  <CardDescription>Configure your QR code functionality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="menu-url">Menu URL</Label>
                    <Input id="menu-url" value={menuUrl} onChange={(e) => setMenuUrl(e.target.value)} />
                    <p className="text-xs text-muted-foreground">This is the URL that your QR code will link to</p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Analytics Tracking</h4>
                        <p className="text-sm text-muted-foreground">Track scans and views of your menu</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Add Logo to QR Code</h4>
                        <p className="text-sm text-muted-foreground">Place your logo in the center of the QR code</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant={qrLogo ? "default" : "outline"} size="sm" onClick={() => setQrLogo(!qrLogo)}>
                          {qrLogo ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Distribution Options</CardTitle>
                  <CardDescription>Choose how to share your QR code with customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Select a template</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTemplate === "table-tent" ? "border-primary bg-primary/5" : "hover:border-gray-400"}`}
                          onClick={() => setSelectedTemplate("table-tent")}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <Table className="h-8 w-8 text-primary" />
                            <span className="text-sm font-medium">Table Tent</span>
                          </div>
                        </div>
                        <div
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTemplate === "menu-insert" ? "border-primary bg-primary/5" : "hover:border-gray-400"}`}
                          onClick={() => setSelectedTemplate("menu-insert")}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <FileImage className="h-8 w-8 text-primary" />
                            <span className="text-sm font-medium">Menu Insert</span>
                          </div>
                        </div>
                        <div
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTemplate === "window-display" ? "border-primary bg-primary/5" : "hover:border-gray-400"}`}
                          onClick={() => setSelectedTemplate("window-display")}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <Smartphone className="h-8 w-8 text-primary" />
                            <span className="text-sm font-medium">Window Display</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Download Options</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={downloadQRCode} className="justify-start">
                          <QrCode className="mr-2 h-4 w-4" />
                          QR Code Only
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <FileImage className="mr-2 h-4 w-4" />
                          With Template
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Printer className="mr-2 h-4 w-4" />
                          Print Ready PDF
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Share Options</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Facebook className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Instagram className="mr-2 h-4 w-4" />
                          Instagram
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Live Preview */}
        <div className="md:col-span-2">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Scan with your phone to test</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 w-full max-w-[280px] flex flex-col items-center">
                <canvas ref={qrRef} className="mb-2" />
                <p className="text-center text-sm font-medium mt-2">{menuName}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" size="sm" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>What to do with your QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Table className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Table Placement</h3>
              <p className="text-sm text-muted-foreground">
                Create table tents or stickers to place on each table for easy access
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Menu Integration</h3>
              <p className="text-sm text-muted-foreground">Add your QR code to printed menus for takeout customers</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Digital Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Share on your website and social media for online customers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
