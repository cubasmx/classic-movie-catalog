"use client"

import type { Movie } from "@/lib/types"
import { MovieCard } from "./movie-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FavoritesListProps {
  movies: Movie[]
  onClear: () => void
}

export function FavoritesList({ movies, onClear }: FavoritesListProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🤍</div>
        <h3 className="text-2xl font-bold mb-2">No hay favoritos aún</h3>
        <p className="text-muted-foreground mb-6">
          Agrega películas a tu lista de favoritos mientras explores el catálogo
        </p>
        <Link href="/catalog">
          <Button>Ir al Catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1">Mis Favoritos</h2>
          <p className="text-muted-foreground">
            {movies.length} película{movies.length !== 1 ? "s" : ""} en tu lista
          </p>
        </div>
        <Button variant="outline" onClick={onClear} className="text-destructive hover:text-destructive bg-transparent">
          Limpiar lista
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
