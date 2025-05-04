// lib/api/auth.ts
import type { User } from "@/lib/types"

export async function registerUser(data: {
  restaurantName: string
  email: string
  password: string
}): Promise<{ message: string }> {
  const response = await fetch("https://qr-menu-backend-yukr.onrender.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return response.json()
}

export async function loginUser(data: {
  email: string
  password: string
}): Promise<{ token: string; user: User }> {
  const response = await fetch("https://qr-menu-backend-yukr.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Login failed")
  }

  const result = await response.json()

  // If the API doesn't return user info, create a minimal user object
  // In a real app, you might want to fetch user details in a separate call
  if (!result.user) {
    result.user = {
      id: "user-id", // This would ideally come from the backend
      email: data.email,
      restaurantName: "Your Restaurant", // This would ideally come from the backend
    }
  }

  return result
}
