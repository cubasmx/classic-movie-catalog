"use client"

import { useState } from "react"

interface VideoPlayerProps {
  movieTitle: string
  videoUrl?: string
  videoFile?: string
}

export function VideoPlayer({ movieTitle, videoUrl, videoFile }: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const isYoutubeUrl = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Reproductor de Video</h3>

      <div
        className={`relative bg-black rounded-lg overflow-hidden ${
          isFullscreen ? "fixed inset-0 z-50" : "aspect-video"
        }`}
      >
        {isYoutubeUrl && videoUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={videoUrl}
            title={movieTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : videoFile ? (
          <video controls fullscreen={isFullscreen} className="w-full h-full" controlsList="nodownload">
            <source src={videoFile} type="video/mp4" />
            Tu navegador no soporta la etiqueta de video
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <p className="text-lg mb-2">No hay video disponible</p>
            <p className="text-sm">El administrador no ha cargado un video para esta película</p>
          </div>
        )}

        {!isFullscreen && (
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute bottom-4 right-4 px-3 py-2 bg-black/60 hover:bg-black/80 text-white rounded transition text-sm"
          >
            Pantalla completa
          </button>
        )}

        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 px-3 py-2 bg-black/60 hover:bg-black/80 text-white rounded transition text-sm"
          >
            Salir
          </button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Formatos soportados: MP4, WebM, Ogg</p>
      </div>
    </div>
  )
}
