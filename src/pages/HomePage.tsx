import React, { useContext } from 'react'
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import { MovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
const HomePage: React.FC = () => {
  const { trendingMovies, searchResults, loading, error, searchQuery } =
    useContext(MovieContext)
  const displayMovies = searchQuery ? searchResults : trendingMovies
  const title = searchQuery ? 'Search Results' : 'Trending Movies'
  return (
    <Container maxWidth="xl">
      <SearchBar />
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
            }}
          >
            {error}
          </Alert>
        )}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : displayMovies.length > 0 ? (
          <div className="movie-grid">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <Alert
            severity="info"
            sx={{
              mt: 2,
            }}
          >
            {searchQuery
              ? 'No movies found matching your search.'
              : 'No trending movies available.'}
          </Alert>
        )}
      </Box>
    </Container>
  )
}
export default HomePage
