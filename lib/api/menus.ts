export async function createMenu(data: {
  menuName: string
  menuDescription: string
  currency: string
  categories: {
    id: string
    name: string
    items: {
      id: string
      name: string
      description: string
      price: string
    }[]
  }[]
}) {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("User is not authenticated.")

  const response = await fetch("https://qr-menu-backend-yukr.onrender.com/api/menus/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to create menu")
  }

  return response.json()
}

export async function getUserMenus(): Promise<any[]> {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("Not authenticated")

  const res = await fetch("https://qr-menu-backend-yukr.onrender.com/api/menus", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch menus")
  }

  return res.json()
}

export async function getPublicMenu(menuId: string) {
  const res = await fetch(`https://qr-menu-backend-yukr.onrender.com/api/menus/${menuId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch menu")
  }

  return res.json()
}
