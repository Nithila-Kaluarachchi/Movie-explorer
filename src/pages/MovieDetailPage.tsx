import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Button,
  Rating,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Alert,
  Grid,
} from '@mui/material'
import { HeartIcon, ClockIcon, CalendarIcon } from 'lucide-react'
import { MovieContext } from '../context/MovieContext'
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from '../services/api'

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = parseInt(id || '0')
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(MovieContext)
  const favorite = isFavorite(movieId)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [movie, setMovie] = useState<any>(null)
  const [credits, setCredits] = useState<any>(null)
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true)
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ])
        setMovie(movieData)
        setCredits(creditsData)
        setVideos(videosData)
        setError(null)
      } catch (err) {
        setError('Failed to load movie details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (movieId) {
      fetchMovieData()
    }
  }, [movieId])

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movieId)
    } else if (movie) {
      addToFavorites(movie)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 8,
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error || !movie) {
    return (
      <Container maxWidth="lg">
        <Alert
          severity="error"
          sx={{
            my: 4,
          }}
        >
          {error || 'Movie not found'}
        </Alert>
      </Container>
    )
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'
  const trailer = videos.length > 0 ? videos[0] : null

  return (
    <Container maxWidth="lg" sx={{ overflowX: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Movie Poster and Favorite Button */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={
              movie.poster_path ||
              'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          />
          <Button
            variant={favorite ? 'contained' : 'outlined'}
            color={favorite ? 'secondary' : 'primary'}
            startIcon={
              <HeartIcon size={20} fill={favorite ? 'white' : 'none'} />
            }
            onClick={handleFavoriteClick}
            sx={{
              width: '100%',
              mt: 2,
            }}
          >
            {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Box>

        {/* Movie Details */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.title} ({releaseYear})
          </Typography>
          {movie.tagline && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              "{movie.tagline}"
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body2">
              {movie.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 3,
            }}
          >
            {movie.genres?.map((genre: any) => (
              <Chip key={genre.id} label={genre.name} size="small" />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mb: 3,
              flexWrap: 'wrap',
            }}
          >
            {movie.release_date && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CalendarIcon size={18} />
                <Typography variant="body2">
                  {new Date(movie.release_date).toLocaleDateString()}
                </Typography>
              </Box>
            )}
            {movie.runtime && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <ClockIcon size={18} />
                <Typography variant="body2">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Typography>
              </Box>
            )}
          </Box>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || 'No overview available.'}
          </Typography>
          {trailer && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  mt: 3,
                }}
              >
                Trailer
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  mb: 3,
                  width: '100%',
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    borderRadius: '8px',
                  }}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </>
          )}
          {credits && credits.cast && credits.cast.length > 0 && (
            <>
              <Divider
                sx={{
                  my: 3,
                }}
              />
              <Typography variant="h6" gutterBottom>
                Cast
              </Typography>
              <Grid container spacing={2}>
                {credits.cast.map((person: any) => (
                  <div key={person.id} className="cast-item">
                    <Card
                      sx={{
                        height: '100%',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={
                          person.profile_path ||
                          'https://via.placeholder.com/150x225?text=No+Image'
                        }
                        alt={person.name}
                      />
                      <CardContent
                        sx={{
                          py: 1,
                        }}
                      >
                        <Typography variant="body2" noWrap>
                          {person.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {person.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default MovieDetailPage
