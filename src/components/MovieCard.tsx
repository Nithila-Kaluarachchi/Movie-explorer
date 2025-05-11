import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  Rating,
} from '@mui/material'
import { HeartIcon } from 'lucide-react'
import { MovieContext, Movie } from '../context/MovieContext'
interface MovieCardProps {
  movie: Movie
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(MovieContext)
  const favorite = isFavorite(movie.id)
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={
          movie.poster_path ||
          'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {releaseYear}
          </Typography>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={handleFavoriteClick}
          color={favorite ? 'secondary' : 'default'}
        >
          <HeartIcon size={20} fill={favorite ? 'currentColor' : 'none'} />
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default MovieCard
