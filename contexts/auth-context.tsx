"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { AuthState, User } from "@/lib/types"
import { loginUser } from "@/lib/api/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })
  const router = useRouter()

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        const userJson = localStorage.getItem("user")

        if (token && userJson) {
          const user = JSON.parse(userJson) as User
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await loginUser({ email, password })

      // Store auth data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      })

      router.push("/dashboard")
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })

    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
