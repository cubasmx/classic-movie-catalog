import type React from "react"
// ... existing code ...
import { ThemeProvider } from "@/lib/contexts/theme-context"
import { AuthProvider } from "@/lib/contexts/auth-context"
import { FavoritesProvider } from "@/lib/contexts/favorites-context"

// ... existing imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {/* <CHANGE> agregar providers de contextos */}
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.app'
    };
