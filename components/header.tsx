"use client"

import { useAuth } from "@/lib/contexts/auth-context"
import { useTheme } from "@/lib/contexts/theme-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useFavorites } from "@/lib/contexts/favorites-context"

export function Header() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const { favorites } = useFavorites()
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)

  const getGreeting = () => {
    if (!user) return "Bienvenido"

    const genderGreeting: Record<string, string> = {
      male: "Bienvenido",
      female: "Bienvenida",
      other: "Bienvenido/a",
    }

    return `${genderGreeting[user.gender]}, ${user.username}`
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <Link href="/catalog" className="flex items-center gap-2 group">
            <h1 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition">
              🎬 Cine Clásico
            </h1>
          </Link>

          {/* Greeting */}
          {user && <div className="hidden sm:block text-sm text-muted-foreground">{getGreeting()}</div>}

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Link a Favoritos */}
            {user && (
              <Link href="/favorites" className="relative">
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  ❤️ {favorites.length > 0 && <span className="ml-1">{favorites.length}</span>}
                </Button>
              </Link>
            )}

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="px-2 sm:px-3 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition text-xs sm:text-sm font-medium"
              >
                🎨
              </button>
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1 z-50">
                  {["dark", "light", "cinema", "vintage"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t as any)
                        setShowThemeMenu(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                        theme === t ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      {t === "dark" && "Oscuro"}
                      {t === "light" && "Claro"}
                      {t === "cinema" && "Cine"}
                      {t === "vintage" && "Vintage"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Menu - Hidden by default */}
            {user?.isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="px-2 sm:px-3 py-2 rounded-md bg-destructive/20 hover:bg-destructive/30 transition text-xs sm:text-sm font-medium text-destructive"
                  title="Menú de administrador"
                >
                  ⚙️
                </button>
                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1 z-50">
                    <Link
                      href="/admin"
                      onClick={() => setShowAdminMenu(false)}
                      className="block w-full text-left px-3 py-2 rounded hover:bg-secondary transition text-sm"
                    >
                      Panel de Administración
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Logout */}
            {user && (
              <Button
                variant="outline"
                onClick={logout}
                className="text-xs sm:text-sm py-1 px-2 sm:px-4 bg-transparent"
              >
                Salir
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
