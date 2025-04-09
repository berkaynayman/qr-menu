"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const mockMenus = {
  menu1: {
    id: "menu1",
    name: "Lunch Menu",
    description: "Our delicious lunch offerings",
    categories: [
      {
        id: "category1",
        name: "Appetizers",
        items: [
          {
            id: "item1",
            name: "Garlic Bread",
            description: "Freshly baked bread with garlic butter",
            price: "5.99",
          },
          {
            id: "item2",
            name: "Mozzarella Sticks",
            description: "Crispy fried cheese sticks with marinara sauce",
            price: "7.99",
          },
        ],
      },
      {
        id: "category2",
        name: "Main Courses",
        items: [
          {
            id: "item3",
            name: "Spaghetti Carbonara",
            description: "Classic pasta with eggs, cheese, pancetta, and black pepper",
            price: "14.99",
          },
          {
            id: "item4",
            name: "Grilled Salmon",
            description: "Fresh salmon fillet with lemon butter sauce",
            price: "18.99",
          },
        ],
      },
      {
        id: "category3",
        name: "Desserts",
        items: [
          {
            id: "item5",
            name: "Tiramisu",
            description: "Coffee-flavored Italian dessert",
            price: "8.99",
          },
          {
            id: "item6",
            name: "Chocolate Cake",
            description: "Rich chocolate cake with ganache",
            price: "7.99",
          },
        ],
      },
    ],
  },
  menu2: {
    id: "menu2",
    name: "Dinner Menu",
    description: "Evening specialties",
    categories: [
      {
        id: "category4",
        name: "Starters",
        items: [
          {
            id: "item7",
            name: "Bruschetta",
            description: "Toasted bread with tomatoes, garlic, and basil",
            price: "6.99",
          },
          {
            id: "item8",
            name: "Calamari",
            description: "Fried squid with lemon aioli",
            price: "9.99",
          },
        ],
      },
      {
        id: "category5",
        name: "Entrees",
        items: [
          {
            id: "item9",
            name: "Filet Mignon",
            description: "8oz beef tenderloin with red wine reduction",
            price: "29.99",
          },
          {
            id: "item10",
            name: "Lobster Ravioli",
            description: "Homemade ravioli filled with lobster in a cream sauce",
            price: "24.99",
          },
        ],
      },
    ],
  },
  menu3: {
    id: "menu3",
    name: "Dessert Menu",
    description: "Sweet treats",
    categories: [
      {
        id: "category6",
        name: "Cakes",
        items: [
          {
            id: "item11",
            name: "Cheesecake",
            description: "New York style cheesecake with berry compote",
            price: "7.99",
          },
          {
            id: "item12",
            name: "Carrot Cake",
            description: "Spiced carrot cake with cream cheese frosting",
            price: "6.99",
          },
        ],
      },
      {
        id: "category7",
        name: "Ice Cream",
        items: [
          {
            id: "item13",
            name: "Gelato",
            description: "Italian-style ice cream in various flavors",
            price: "5.99",
          },
          {
            id: "item14",
            name: "Affogato",
            description: "Vanilla ice cream with a shot of espresso",
            price: "6.99",
          },
        ],
      },
    ],
  },
}

export default function MenuPage() {
  const params = useParams()
  const menuId = params.id as string
  const menuData = mockMenus[menuId as keyof typeof mockMenus] || mockMenus.menu1

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
