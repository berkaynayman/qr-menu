"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react"
import { getMenu, updateMenu } from "@/lib/api/menus"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransparentLoadingOverlay } from "@/components/transparent-loading-overlay"

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

export default function EditMenuPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [menuName, setMenuName] = useState("")
  const [menuDescription, setMenuDescription] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMenu() {
      try {
        const menu = await getMenu(params.id)
        setMenuName(menu.menuName)
        setMenuDescription(menu.menuDescription || "")
        setCurrency(menu.currency || "USD")
        setCategories(menu.categories || [])
      } catch (err: any) {
        setError(err.message || "Failed to load menu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [params.id])

  const addCategory = () => {
    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name: "New Category",
      items: [],
    }
    setCategories([...categories, newCategory])
  }

  const updateCategory = (id: string, name: string) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, name } : category)))
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  const addItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: "New Item",
      description: "Description",
      price: "0.00",
    }
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, items: [...category.items, newItem] } : category,
      ),
    )
  }

  const updateItem = (categoryId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
            }
          : category,
      ),
    )
  }

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
          : category,
      ),
    )
  }

  const handleSave = async () => {
    if (!menuName) {
      setError("Menu name is required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await updateMenu(params.id, {
        menuName,
        menuDescription,
        currency,
        categories,
      })
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to update menu")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <TransparentLoadingOverlay isLoading={true} message="Loading menu..." showLogo={false} />
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Menu</h1>
        <Button className="ml-auto" onClick={handleSave} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* MENU DETAILS */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Menu Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menu-name">Menu Name</Label>
            <Input
              id="menu-name"
              placeholder="e.g., Lunch Menu, Dinner Specials"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-description">Menu Description (Optional)</Label>
            <Textarea
              id="menu-description"
              placeholder="A brief description of your menu"
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CAD">CAD (C$)</SelectItem>
                <SelectItem value="AUD">AUD (A$)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="TRY">TRY (₺)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">This currency will be displayed with your menu prices</p>
          </div>
        </CardContent>
      </Card>

      {/* MENU CATEGORIES */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Menu Categories</h2>
        <Button onClick={addCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Input
                  className="text-lg font-semibold"
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-red-500"
                  onClick={() => deleteCategory(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(category.id, item.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-5">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(category.id, item.id, "description", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {currency === "USD" && "$"}
                        {currency === "EUR" && "€"}
                        {currency === "GBP" && "£"}
                        {currency === "CAD" && "C$"}
                        {currency === "AUD" && "A$"}
                        {currency === "JPY" && "¥"}
                        {currency === "TRY" && "₺"}
                      </div>
                      <Input
                        className="pl-7"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateItem(category.id, item.id, "price", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => deleteItem(category.id, item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addItem(category.id)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}