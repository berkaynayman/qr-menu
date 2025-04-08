"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
}

interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export default function MenuPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the menu data based on the ID
  const [menuData] = useState({
    id: params.id,
    name: "Sample Restaurant Menu",
    description: "Our delicious offerings made with fresh ingredients",
    categories: [
      {
        id: "1",
        name: "Appetizers",
        items: [
          {
            id: "1",
            name: "Garlic Bread",
            description: "Freshly baked bread with garlic butter",
            price: "5.99",
          },
          {
            id: "2",
            name: "Mozzarella Sticks",
            description: "Breaded mozzarella with marinara sauce",
            price: "7.99",
          },
          {
            id: "3",
            name: "Bruschetta",
            description: "Toasted bread topped with tomatoes, garlic, and basil",
            price: "6.99",
          },
        ],
      },
      {
        id: "2",
        name: "Main Courses",
        items: [
          {
            id: "4",
            name: "Spaghetti Bolognese",
            description: "Classic pasta with rich meat sauce",
            price: "14.99",
          },
          {
            id: "5",
            name: "Grilled Salmon",
            description: "Fresh salmon with lemon butter sauce and vegetables",
            price: "18.99",
          },
          {
            id: "6",
            name: "Chicken Parmesan",
            description: "Breaded chicken with tomato sauce and melted cheese",
            price: "16.99",
          },
        ],
      },
      {
        id: "3",
        name: "Desserts",
        items: [
          {
            id: "7",
            name: "Tiramisu",
            description: "Classic Italian dessert with coffee and mascarpone",
            price: "7.99",
          },
          {
            id: "8",
            name: "Chocolate Cake",
            description: "Rich chocolate cake with vanilla ice cream",
            price: "6.99",
          },
        ],
      },
      {
        id: "4",
        name: "Beverages",
        items: [
          {
            id: "9",
            name: "Soft Drinks",
            description: "Coke, Sprite, Fanta",
            price: "2.99",
          },
          {
            id: "10",
            name: "Coffee",
            description: "Espresso, Americano, Cappuccino",
            price: "3.99",
          },
          {
            id: "11",
            name: "Fresh Juices",
            description: "Orange, Apple, Watermelon",
            price: "4.99",
          },
        ],
      },
    ] as MenuCategory[],
  })

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories[categoryId] !== false // Default to expanded
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-bold truncate">{menuData.name}</h1>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Image src="/qr-menu-logo.png" alt="QR Menu Logo" width={24} height={24} />
              <span className="hidden sm:inline">QR Menu</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl p-4 py-6 sm:py-8">
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{menuData.name}</CardTitle>
            <CardDescription>{menuData.description}</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          {menuData.categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
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
                            <span className="font-medium">${item.price}</span>
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
      </main>

      <footer className="mt-12 border-t bg-white p-4 sm:p-6 text-center dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by <span className="font-semibold">QR Menu</span>
        </p>
      </footer>
    </div>
  )
}
