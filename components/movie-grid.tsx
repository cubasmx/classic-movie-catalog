"use client"

import type { Movie } from "@/lib/types"
import { MovieCard } from "./movie-card"
import { useState, useMemo } from "react"

interface MovieGridProps {
  movies: Movie[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("")

  // Obtener géneros únicos
  const genres = useMemo(() => {
    return Array.from(new Set(movies.map((m) => m.genre))).sort()
  }, [movies])

  // Filtrar películas
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = !selectedGenre || movie.genre === selectedGenre
      return matchesSearch && matchesGenre
    })
  }, [movies, searchQuery, selectedGenre])

  return (
    <div className="space-y-6">
      {/* Controles de búsqueda y filtro */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Buscar por título o director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre("")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedGenre === "" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Todos
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedGenre === genre ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de películas */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron películas</p>
        </div>
      )}
    </div>
  )
}
