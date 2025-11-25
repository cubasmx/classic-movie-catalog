"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { ThemeContextType, ThemeType } from "@/lib/types"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Cargar tema guardado
    const savedTheme = localStorage.getItem("movie_theme") as ThemeType | null
    if (savedTheme) {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("dark")
    }
  }, [])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem("movie_theme", newTheme)
    applyTheme(newTheme)
  }

  const applyTheme = (themeValue: ThemeType) => {
    const root = document.documentElement
    root.classList.remove("dark", "light", "cinema", "vintage")
    root.classList.add(themeValue)
    root.setAttribute("data-theme", themeValue)
  }

  if (!mounted) return <>{children}</>

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
