"use client"

import { useAuth } from "@/lib/contexts/auth-context"
import { useFavorites } from "@/lib/contexts/favorites-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { FavoritesList } from "@/components/favorites-list"
import type { Movie } from "@/lib/types"
import { db } from "@/lib/db"

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth()
  const { favorites, removeFavorite } = useFavorites()
  const router = useRouter()

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, mounted, router])

  useEffect(() => {
    if (mounted) {
      const movies = favorites.map((id) => db.getMovieById(id)).filter((m): m is Movie => m !== null)
      setFavoriteMovies(movies)
      setLoading(false)
    }
  }, [mounted, favorites])

  const handleClear = () => {
    if (confirm("¿Deseas eliminar todas tus películas favoritas?")) {
      favorites.forEach((movieId) => {
        removeFavorite(movieId)
      })
    }
  }

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Cargando favoritos...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <FavoritesList movies={favoriteMovies} onClear={handleClear} />
        </div>
      </main>
    </>
  )
}
