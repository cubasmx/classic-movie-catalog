"use client"

import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { MovieGrid } from "@/components/movie-grid"
import type { Movie } from "@/lib/types"
import { db } from "@/lib/db"

export default function CatalogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push("/")
    }
  }, [user, loading, mounted, router])

  useEffect(() => {
    if (mounted) {
      setMovies(db.getMovies())
    }
  }, [mounted])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Cargando catálogo...</p>
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
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-balance">Catálogo de Películas</h2>
            <p className="text-muted-foreground text-balance">
              Explora nuestra colección de películas clásicas del cine
            </p>
          </div>

          <MovieGrid movies={movies} />
        </div>
      </main>
    </>
  )
}
