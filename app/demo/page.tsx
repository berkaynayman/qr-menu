"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample menu data
const DEMO_MENU = {
  menuName: "Coastal Breeze Restaurant",
  menuDescription: "Fresh seafood and Mediterranean-inspired cuisine in a relaxed atmosphere",
  currency: "USD",
  viewCount: 1248,
  categories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "1",
          name: "Mediterranean Mezze Platter",
          description: "Hummus, baba ganoush, tzatziki, olives, and warm pita bread",
          price: "14.95",
        },
        {
          id: "2",
          name: "Crispy Calamari",
          description: "Lightly fried and served with lemon aioli and marinara sauce",
          price: "12.95",
        },
        {
          id: "3",
          name: "Bruschetta",
          description: "Grilled bread topped with diced tomatoes, fresh basil, and garlic",
          price: "9.95",
        },
      ],
    },
    {
      id: "mains",
      name: "Main Courses",
      items: [
        {
          id: "4",
          name: "Grilled Salmon",
          description: "Atlantic salmon with lemon herb butter, served with seasonal vegetables and rice pilaf",
          price: "24.95",
        },
        {
          id: "5",
          name: "Seafood Linguine",
          description: "Shrimp, scallops, and mussels in a white wine garlic sauce",
          price: "26.95",
        },
        {
          id: "6",
          name: "Mediterranean Chicken",
          description: "Herb-marinated chicken breast with roasted vegetables and couscous",
          price: "21.95",
        },
        {
          id: "7",
          name: "Vegetable Paella",
          description: "Saffron rice with seasonal vegetables, herbs, and spices",
          price: "19.95",
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "8",
          name: "Baklava",
          description: "Layers of phyllo dough filled with chopped nuts and sweetened with honey",
          price: "8.95",
        },
        {
          id: "9",
          name: "Lemon Sorbet",
          description: "Refreshing house-made lemon sorbet with fresh berries",
          price: "7.95",
        },
        {
          id: "10",
          name: "Chocolate Olive Oil Cake",
          description: "Rich chocolate cake made with extra virgin olive oil, served with whipped cream",
          price: "9.95",
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: "11",
          name: "House White Wine",
          description: "Glass of our crisp house white wine",
          price: "8.00",
        },
        {
          id: "12",
          name: "House Red Wine",
          description: "Glass of our smooth house red wine",
          price: "8.00",
        },
        {
          id: "13",
          name: "Craft Beer Selection",
          description: "Ask your server about our rotating craft beer selection",
          price: "7.00",
        },
        {
          id: "14",
          name: "Mediterranean Lemonade",
          description: "Fresh lemonade with mint and a touch of rosewater",
          price: "4.95",
        },
      ],
    },
  ],
}

export default function DemoPage() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    starters: true,
    mains: true,
    desserts: true,
    drinks: true,
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories[categoryId] !== false
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold truncate">{DEMO_MENU.menuName}</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Image src="/qr-menu-logo.png" alt="Menulya Logo" width={24} height={24} />
              <span className="hidden sm:inline">Menulya</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl p-4 py-6 sm:py-8">
        <div className="mb-6 bg-primary/10 rounded-lg p-4 border border-primary/20">
          <h2 className="font-medium text-primary mb-2">👋 This is a demo menu</h2>
          <p className="text-sm">
            This is how your customers will see your digital menu. Create your own menu for free with Menulya!
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/register">
              <Button size="sm">Create Your Menu</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{DEMO_MENU.menuName}</CardTitle>
            <CardDescription>{DEMO_MENU.menuDescription}</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          {DEMO_MENU.categories.map((category) => (
            <Card key={category.id}>
              <CardHeader
                className="cursor-pointer bg-gray-50 py-3 sm:py-4 dark:bg-gray-800"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">{category.name}</CardTitle>
                  <Button variant="ghost" size="sm">
                    {isCategoryExpanded(category.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {isCategoryExpanded(category.id) && (
                <CardContent className="p-0">
                  <div className="divide-y">
                    {category.items.map((item) => (
                      <div key={item.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="pr-4">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                          <div className="text-right whitespace-nowrap">
                            <span className="font-medium">
                              {DEMO_MENU.currency === "USD" && "$"}
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Ready to create your own menu?</h2>
            <p className="mb-4">
              With Menulya, you can create beautiful digital menus like this one in minutes. It's completely free!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 border-t bg-white p-4 sm:p-6 text-center dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by <span className="font-semibold">Menulya</span> · Views: {DEMO_MENU.viewCount}
        </p>
      </footer>
    </div>
  )
}
