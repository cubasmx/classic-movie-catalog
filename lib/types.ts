// Types compartidos para toda la aplicación

export interface User {
  id: string
  username: string
  email: string
  password: string
  gender: "male" | "female" | "other"
  isAdmin: boolean
}

export interface Movie {
  id: string
  title: string
  year: number
  director: string
  genre: string
  synopsis: string
  image: string
  videoUrl?: string // Link o URL del video
  videoFile?: string // Para archivos cargados (base64 o URL)
  duration?: number
  createdAt: number
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, gender: string) => Promise<void>
  logout: () => void
}

export interface FavoritesContextType {
  favorites: string[] // Array de movie IDs
  addFavorite: (movieId: string) => void
  removeFavorite: (movieId: string) => void
  isFavorite: (movieId: string) => boolean
}

export type ThemeType = "dark" | "light" | "cinema" | "vintage"

export interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}
