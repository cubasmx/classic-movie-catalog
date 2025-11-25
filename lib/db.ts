// Base de datos simulada con localStorage
import type { User, Movie } from "./types"

const USERS_KEY = "movie_catalog_users"
const MOVIES_KEY = "movie_catalog_movies"
const FAVORITES_KEY = "movie_catalog_favorites"

// Películas de ejemplo
const DEFAULT_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Citizen Kane",
    year: 1941,
    director: "Orson Welles",
    genre: "Drama",
    synopsis:
      'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to discover the meaning of his final utterance, "Rosebud".',
    image: "/citizen-kane-movie-poster.jpg",
    videoUrl: "https://www.youtube.com/embed/dztzIbMLPzE",
    duration: 119,
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Casablanca",
    year: 1942,
    director: "Michael Curtiz",
    genre: "Romance",
    synopsis:
      "In Casablanca, Morocco, an American expatriate cafe owner encounters his old flame and a dashing police captain.",
    image: "/casablanca-movie-poster.jpg",
    videoUrl: "https://www.youtube.com/embed/BkL9l7qoXGk",
    duration: 102,
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "It's a Wonderful Life",
    year: 1946,
    director: "Frank Capra",
    genre: "Drama",
    synopsis:
      "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what his town would have been like if he had never been born.",
    image: "/its-a-wonderful-life-poster.jpg",
    videoUrl: "https://www.youtube.com/embed/-mYH3qTuB5Y",
    duration: 130,
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "Singin' in the Rain",
    year: 1952,
    director: "Gene Kelly, Stanley Donen",
    genre: "Musical",
    synopsis:
      "Three friends make the most of the opportunities that come their way after the transition from silent films to talking pictures.",
    image: "/singin-in-the-rain-poster.jpg",
    videoUrl: "https://www.youtube.com/embed/SiIUHKz6ens",
    duration: 103,
    createdAt: Date.now(),
  },
  {
    id: "5",
    title: "Vertigo",
    year: 1958,
    director: "Alfred Hitchcock",
    genre: "Thriller",
    synopsis:
      "A retired San Francisco police detective obsessed with an unrequited past makes a mysterious, beautiful woman his obsession.",
    image: "/vertigo-movie-poster.jpg",
    videoUrl: "https://www.youtube.com/embed/QLwUTI3_NKI",
    duration: 128,
    createdAt: Date.now(),
  },
]

export const db = {
  // Usuarios
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY)
    if (!data) {
      // Inicializar con admin
      const adminUser: User = {
        id: "0",
        username: "admin",
        email: "admin@example.com",
        password: "admin",
        gender: "other",
        isAdmin: true,
      }
      localStorage.setItem(USERS_KEY, JSON.stringify([adminUser]))
      return [adminUser]
    }
    return JSON.parse(data)
  },

  getUserById: (id: string): User | null => {
    const users = db.getUsers()
    return users.find((u) => u.id === id) || null
  },

  getUserByEmail: (email: string): User | null => {
    const users = db.getUsers()
    return users.find((u) => u.email === email) || null
  },

  addUser: (user: User): void => {
    const users = db.getUsers()
    users.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  },

  // Películas
  getMovies: (): Movie[] => {
    const data = localStorage.getItem(MOVIES_KEY)
    if (!data) {
      localStorage.setItem(MOVIES_KEY, JSON.stringify(DEFAULT_MOVIES))
      return DEFAULT_MOVIES
    }
    return JSON.parse(data)
  },

  getMovieById: (id: string): Movie | null => {
    const movies = db.getMovies()
    return movies.find((m) => m.id === id) || null
  },

  addMovie: (movie: Movie): void => {
    const movies = db.getMovies()
    movies.push(movie)
    localStorage.setItem(MOVIES_KEY, JSON.stringify(movies))
  },

  updateMovie: (id: string, updates: Partial<Movie>): void => {
    const movies = db.getMovies()
    const index = movies.findIndex((m) => m.id === id)
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updates }
      localStorage.setItem(MOVIES_KEY, JSON.stringify(movies))
    }
  },

  deleteMovie: (id: string): void => {
    const movies = db.getMovies()
    const filtered = movies.filter((m) => m.id !== id)
    localStorage.setItem(MOVIES_KEY, JSON.stringify(filtered))
  },

  // Favoritos
  getFavorites: (userId: string): string[] => {
    const data = localStorage.getItem(`${FAVORITES_KEY}_${userId}`)
    return data ? JSON.parse(data) : []
  },

  addFavorite: (userId: string, movieId: string): void => {
    const favorites = db.getFavorites(userId)
    if (!favorites.includes(movieId)) {
      favorites.push(movieId)
      localStorage.setItem(`${FAVORITES_KEY}_${userId}`, JSON.stringify(favorites))
    }
  },

  removeFavorite: (userId: string, movieId: string): void => {
    const favorites = db.getFavorites(userId)
    const filtered = favorites.filter((id) => id !== movieId)
    localStorage.setItem(`${FAVORITES_KEY}_${userId}`, JSON.stringify(filtered))
  },
}
