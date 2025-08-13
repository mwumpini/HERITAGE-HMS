"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  username: string
  loginTime: string
  department?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  setUserDepartment: (department: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem("isAuthenticated")
        const userData = localStorage.getItem("user")

        if (isAuthenticated === "true" && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        // Clear invalid data
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - replace with real auth logic
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username && password) {
        const userData: User = {
          username,
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  const setUserDepartment = (department: string) => {
    if (user) {
      const updatedUser = { ...user, department }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUserDepartment,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
