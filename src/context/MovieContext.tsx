import React, { useEffect, useState, createContext, ReactNode } from 'react'
import { searchMovies, getTrendingMovies } from '../services/api'
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null; // Allow null
  release_date: string;
  vote_average: number;
  overview: string;
}
type MovieContextType = {
  trendingMovies: Movie[]
  searchResults: Movie[]
  favorites: Movie[]
  loading: boolean
  error: string | null
  searchQuery: string
  searchMovies: (query: string) => Promise<void>
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}
export const MovieContext = createContext<MovieContextType>({
  trendingMovies: [],
  searchResults: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
  searchMovies: async () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
})
type MovieProviderProps = {
  children: ReactNode
}
export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])
  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  // Load trending movies on initial render
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true)
      try {
        const data = await getTrendingMovies()
        setTrendingMovies(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch trending movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrendingMovies()
  }, [])
  const handleSearchMovies = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    setLoading(true)
    try {
      const data = await searchMovies(query)
      setSearchResults(data)
      setError(null)
    } catch (err) {
      setError('Failed to search movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m.id === movie.id)) {
        return [...prev, movie]
      }
      return prev
    })
  }
  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
  }
  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId)
  }
  const value = {
    trendingMovies,
    searchResults,
    favorites,
    loading,
    error,
    searchQuery,
    searchMovies: handleSearchMovies,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
