"use client"

import type { Movie } from "@/lib/types"
import { useFavorites } from "@/lib/contexts/favorites-context"
import { VideoPlayer } from "./video-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface MovieDetailsProps {
  movie: Movie
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative -mx-4 sm:mx-0 -mt-4 sm:mt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background h-full" />
        <div className="relative aspect-video bg-secondary overflow-hidden rounded-lg">
          <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title and basic info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-balance">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-muted-foreground">{movie.year}</span>
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {movie.genre}
                  </span>
                  {movie.duration && <span className="text-muted-foreground">{movie.duration} min</span>}
                </div>
              </div>
              <Button
                size="lg"
                variant={favorite ? "default" : "outline"}
                onClick={handleFavorite}
                className={favorite ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {favorite ? "❤️ Favorito" : "🤍 Agregar"}
              </Button>
            </div>
          </div>

          {/* Director */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Director</h3>
            <p className="text-lg">{movie.director}</p>
          </div>

          {/* Synopsis */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">Sinopsis</h3>
            <p className="text-foreground leading-relaxed text-base">{movie.synopsis}</p>
          </div>

          {/* Video Player */}
          {(movie.videoUrl || movie.videoFile) && (
            <VideoPlayer movieTitle={movie.title} videoUrl={movie.videoUrl} videoFile={movie.videoFile} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Año</p>
                <p className="text-lg">{movie.year}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Género</p>
                <p className="text-lg">{movie.genre}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Director</p>
                <p className="text-sm">{movie.director}</p>
              </div>
              {movie.duration && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Duración</p>
                  <p className="text-lg">{movie.duration} minutos</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Back Button */}
          <Link href="/catalog" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Volver al catálogo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
