import React, { useContext } from 'react'
import { Container, Typography, Box, Alert } from '@mui/material'
import { MovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(MovieContext)
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          My Favorites
        </Typography>
        {favorites.length > 0 ? (
          <div className="movie-grid">
            {favorites.map((movie) => (
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
            You haven't added any favorites yet. Browse movies and click the
            heart icon to add them here.
          </Alert>
        )}
      </Box>
    </Container>
  )
}
export default FavoritesPage
