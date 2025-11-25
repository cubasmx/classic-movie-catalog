"use client"

import type React from "react"

import type { Movie } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface AdminMovieFormProps {
  movie?: Movie
  onSubmit: (movie: Omit<Movie, "id" | "createdAt">) => Promise<void>
  onCancel: () => void
}

export function AdminMovieForm({ movie, onSubmit, onCancel }: AdminMovieFormProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    year: movie?.year || new Date().getFullYear(),
    director: movie?.director || "",
    genre: movie?.genre || "",
    synopsis: movie?.synopsis || "",
    image: movie?.image || "",
    videoUrl: movie?.videoUrl || "",
    videoFile: movie?.videoFile || "",
    duration: movie?.duration || 90,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoType, setVideoType] = useState<"url" | "file">(
    movie?.videoUrl ? "url" : movie?.videoFile ? "file" : "url",
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "duration" ? Number.parseInt(value) : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          videoFile: event.target?.result as string,
          videoUrl: "",
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!formData.title || !formData.director || !formData.genre) {
        throw new Error("Por favor completa los campos requeridos")
      }

      const movieData = {
        title: formData.title,
        year: formData.year,
        director: formData.director,
        genre: formData.genre,
        synopsis: formData.synopsis,
        image: formData.image || "/placeholder.svg",
        videoUrl: videoType === "url" ? formData.videoUrl : undefined,
        videoFile: videoType === "file" ? formData.videoFile : undefined,
        duration: formData.duration,
      }

      await onSubmit(movieData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie ? "Editar Película" : "Agregar Nueva Película"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-500/20 text-red-600 rounded text-sm">{error}</div>}

          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="font-semibold">Información Básica</h3>

            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título de la película"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Año *</label>
                <Input
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duración (min) *</label>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Director *</label>
              <Input
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                placeholder="Nombre del director"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Género *</label>
              <Input
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="Ej: Drama, Romance, Thriller"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sinopsis *</label>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleInputChange}
                placeholder="Descripción de la película"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="space-y-4">
            <h3 className="font-semibold">Imagen</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Cargar Poster (PNG, JPG)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/80"
              />
            </div>
            {formData.image && (
              <div className="relative w-24 h-36 rounded overflow-hidden">
                <img src={formData.image || "/placeholder.svg"} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Video */}
          <div className="space-y-4">
            <h3 className="font-semibold">Video</h3>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={videoType === "url"}
                  onChange={() => setVideoType("url")}
                  className="cursor-pointer"
                />
                <span>URL de YouTube</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={videoType === "file"}
                  onChange={() => setVideoType("file")}
                  className="cursor-pointer"
                />
                <span>Cargar Archivo</span>
              </label>
            </div>

            {videoType === "url" ? (
              <div>
                <label className="block text-sm font-medium mb-1">URL de YouTube</label>
                <Input
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/embed/..."
                />
                <p className="text-xs text-muted-foreground mt-1">Ej: https://www.youtube.com/embed/dQw4w9WgXcQ</p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Cargar Video (MP4, WebM, Ogg)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="block w-full text-sm text-muted-foreground
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-primary-foreground
                    hover:file:bg-primary/80"
                />
                <p className="text-xs text-muted-foreground mt-1">Formatos soportados: MP4, WebM, Ogg (máx 500MB)</p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Guardando..." : movie ? "Actualizar" : "Crear Película"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
