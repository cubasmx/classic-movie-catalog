"use client"

import type React from "react"

import type { Movie } from "@/lib/types"
import { useFavorites } from "@/lib/contexts/favorites-context"
import Link from "next/link"
import { useState } from "react"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)
  const favorite = isFavorite(movie.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-lg bg-secondary h-80 mb-4 transition-all duration-300">
          <img
            src={imageError ? "/placeholder.svg?query=movie-poster" : movie.image}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />

          {/* Overlay con detalles */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-4">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-muted-foreground mb-2">{movie.year}</p>
              <p className="text-sm font-semibold text-white line-clamp-2 mb-3">{movie.director}</p>
              <p className="text-xs bg-primary/80 inline-block px-2 py-1 rounded">{movie.genre}</p>
            </div>
          </div>

          {/* Botón de favorito */}
          <button
            onClick={handleFavorite}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              favorite ? "bg-red-500 text-white" : "bg-black/40 text-white hover:bg-black/60"
            }`}
            title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Título */}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </Link>
  )
}
