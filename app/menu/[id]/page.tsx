"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useParams } from "next/navigation"
import { getPublicMenu } from "@/lib/api/menus"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"

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

interface MenuData {
  _id: string
  menuName: string
  menuDescription: string
  currency: string
  viewCount: number
  categories: MenuCategory[]
}

export default function MenuPage() {
  const params = useParams()
  const menuId = params.id as string
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPublicMenu(menuId)
        setMenuData(data)
      } catch (err: any) {
        setError(err.message || "Failed to load menu")
      }
    }

    fetchData()
  }, [menuId])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories[categoryId] !== false
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>
  }

  if (!menuData) {
    return <div className="p-6 text-center">Loading menu...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header variant="minimal" />
      <main className="container mx-auto max-w-3xl p-4 py-6 sm:py-8">
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">{menuData.menuName}</CardTitle>
            <CardDescription>{menuData.menuDescription}</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          {menuData.categories.map((category) => (
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
                              {menuData.currency === "Złoty" && "zł"}
                              {menuData.currency === "USD" && "$"}
                              {menuData.currency === "EUR" && "€"}
                              {menuData.currency === "GBP" && "£"}
                              {menuData.currency === "CAD" && "C$"}
                              {menuData.currency === "AUD" && "A$"}
                              {menuData.currency === "JPY" && "¥"}
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
      </main>

      <footer className="mt-12 border-t bg-white p-4 sm:p-6 text-center dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by <span className="font-semibold">QR Menu</span> · Views: {menuData.viewCount}
        </p>
      </footer>
    </div>
  )
}
