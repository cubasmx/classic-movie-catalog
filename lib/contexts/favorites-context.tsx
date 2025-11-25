"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { FavoritesContextType } from "@/lib/types"
import { db } from "@/lib/db"
import { useAuth } from "./auth-context"

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      const userFavorites = db.getFavorites(user.id)
      setFavorites(userFavorites)
    }
  }, [user])

  const addFavorite = (movieId: string) => {
    if (!user) return
    db.addFavorite(user.id, movieId)
    setFavorites([...favorites, movieId])
  }

  const removeFavorite = (movieId: string) => {
    if (!user) return
    db.removeFavorite(user.id, movieId)
    setFavorites(favorites.filter((id) => id !== movieId))
  }

  const isFavorite = (movieId: string) => {
    return favorites.includes(movieId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }
  return context
}
