"use client"

import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { AdminMovieForm } from "@/components/admin-movie-form"
import { AdminMoviesList } from "@/components/admin-movies-list"
import type { Movie } from "@/lib/types"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [movies, setMovies] = useState<Movie[]>([])
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading) {
      if (!user) {
        router.push("/")
      } else if (!user.isAdmin) {
        router.push("/catalog")
      }
    }
  }, [user, authLoading, mounted, router])

  useEffect(() => {
    if (mounted) {
      setMovies(db.getMovies())
      setLoading(false)
    }
  }, [mounted])

  const handleSubmit = async (movieData: Omit<Movie, "id" | "createdAt">) => {
    if (editingMovie) {
      db.updateMovie(editingMovie.id, movieData)
      setEditingMovie(null)
    } else {
      const newMovie: Movie = {
        id: Date.now().toString(),
        ...movieData,
        createdAt: Date.now(),
      }
      db.addMovie(newMovie)
    }
    setMovies(db.getMovies())
    setIsFormOpen(false)
  }

  const handleDelete = (movieId: string) => {
    db.deleteMovie(movieId)
    setMovies(db.getMovies())
  }

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Administra el catálogo de películas clásicas</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Películas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{movies.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Géneros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{new Set(movies.map((m) => m.genre)).size}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Año Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {movies.length > 0 ? Math.round(movies.reduce((sum, m) => sum + m.year, 0) / movies.length) : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-1">
              {isFormOpen ? (
                <AdminMovieForm
                  movie={editingMovie || undefined}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setIsFormOpen(false)
                    setEditingMovie(null)
                  }}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Acciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <button
                      onClick={() => {
                        setEditingMovie(null)
                        setIsFormOpen(true)
                      }}
                      className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      + Agregar Película
                    </button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Lista de películas */}
            <div className="lg:col-span-2">
              <AdminMoviesList
                movies={movies}
                onEdit={(movie) => {
                  setEditingMovie(movie)
                  setIsFormOpen(true)
                }}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
