"use client"

import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { MovieDetails } from "@/components/movie-details"
import type { Movie } from "@/lib/types"
import { db } from "@/lib/db"

export default function MoviePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const movieId = params.id as string

  const [movie, setMovie] = useState<Movie | null>(null)
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
    if (mounted && movieId) {
      const movieData = db.getMovieById(movieId)
      if (movieData) {
        setMovie(movieData)
      } else {
        router.push("/catalog")
      }
      setLoading(false)
    }
  }, [mounted, movieId, router])

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

  if (!user || !movie) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <MovieDetails movie={movie} />
        </div>
      </main>
    </>
  )
}
