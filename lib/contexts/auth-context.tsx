"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/lib/types"
import { db } from "@/lib/db"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar usuario guardado
    const savedUserId = localStorage.getItem("movie_user_id")
    if (savedUserId) {
      const userData = db.getUserById(savedUserId)
      if (userData) {
        setUser(userData)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const user = db.getUserByEmail(email)
    if (!user || user.password !== password) {
      throw new Error("Email o contraseña incorrectos")
    }
    setUser(user)
    localStorage.setItem("movie_user_id", user.id)
  }

  const register = async (username: string, email: string, password: string, gender: string) => {
    const existingUser = db.getUserByEmail(email)
    if (existingUser) {
      throw new Error("El email ya está registrado")
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
      gender: gender as "male" | "female" | "other",
      isAdmin: false,
    }

    db.addUser(newUser)
    setUser(newUser)
    localStorage.setItem("movie_user_id", newUser.id)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("movie_user_id")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
