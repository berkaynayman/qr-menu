// lib/api/auth.ts
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
  }): Promise<{ token: string }> {
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
  
    return response.json()
  }
  
  