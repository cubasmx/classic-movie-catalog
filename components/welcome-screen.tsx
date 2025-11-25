"use client"

import { useEffect, useState } from "react"
import { AuthForm } from "./auth-form"

interface WelcomeScreenProps {
  onEnter: () => void
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-card to-background p-4">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 text-balance">Catálogo de Películas Clásicas</h1>
          <p className="text-xl text-muted-foreground">Descubre las mejores películas del cine clásico</p>
        </div>

        {/* Auth Form */}
        <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} onSuccess={onEnter} />

        {/* Footer info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Panel administrador disponible en configuración</p>
        </div>
      </div>
    </div>
  )
}
