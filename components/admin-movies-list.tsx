"use client"

import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminMoviesListProps {
  movies: Movie[]
  onEdit: (movie: Movie) => void
  onDelete: (movieId: string) => void
}

export function AdminMoviesList({ movies, onEdit, onDelete }: AdminMoviesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Películas en el Catálogo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Título</th>
                <th className="text-left py-3 px-4 font-semibold">Director</th>
                <th className="text-left py-3 px-4 font-semibold">Género</th>
                <th className="text-left py-3 px-4 font-semibold">Año</th>
                <th className="text-right py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No hay películas en el catálogo
                  </td>
                </tr>
              ) : (
                movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-border hover:bg-secondary/50 transition">
                    <td className="py-3 px-4 font-medium">{movie.title}</td>
                    <td className="py-3 px-4">{movie.director}</td>
                    <td className="py-3 px-4">{movie.genre}</td>
                    <td className="py-3 px-4">{movie.year}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(movie)}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm(`¿Eliminar "${movie.title}"?`)) {
                            onDelete(movie.id)
                          }
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
