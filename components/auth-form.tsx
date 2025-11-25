"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  isLogin: boolean
  onToggle: () => void
  onSuccess: () => void
}

export function AuthForm({ isLogin, onToggle, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("other")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(username, email, password, gender)
      }
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">{isLogin ? "Iniciar Sesión" : "Registrarse"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-500/20 text-red-600 rounded text-sm">{error}</div>}

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Género</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button onClick={onToggle} className="ml-1 text-primary hover:underline">
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
