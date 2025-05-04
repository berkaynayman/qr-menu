"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Save, Trash2 } from "lucide-react"
import { createMenu } from "@/lib/api/menus"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function CreateMenuPage() {
  const router = useRouter()
  const [menuName, setMenuName] = useState("Coastal Breeze Restaurant")
  const [menuDescription, setMenuDescription] = useState("Fresh seafood and Mediterranean-inspired cuisine in a relaxed atmosphere")
  const [currency, setCurrency] = useState("USD")
  const [categories, setCategories] = useState<MenuCategory[]>([
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
    },])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      await createMenu({
        menuName,
        menuDescription,
        currency,
        categories,
      })
      router.push("/dashboard/create-qr")
    } catch (err: any) {
      setError(err.message || "Failed to create menu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create Menu</h1>
        <Button className="ml-auto" onClick={handleSave} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save & Generate QR"}
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
