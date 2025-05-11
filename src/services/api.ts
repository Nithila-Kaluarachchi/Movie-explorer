import axios from 'axios';
import { Movie } from '../context/MovieContext';
// In a real app, this would be stored in an environment variable
const REACT_APP_TMDB_API_KEY= '44d0bde34aafa95b07123fdedba4fa84'; 
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_URL = 'https://api.themoviedb.org/3'; // Define the base URL for the API
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: REACT_APP_TMDB_API_KEY,
  },
});
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/trending/movie/week');
  return response.data.results.map(formatMovie);
};
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results.map(formatMovie);
};
export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`);
  return {
    ...formatMovie(response.data),
    genres: response.data.genres,
    runtime: response.data.runtime,
    tagline: response.data.tagline,
  };
};
export const getMovieCredits = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return {
    cast: response.data.cast.map((person: any) => ({
      id: person.id,
      name: person.name,
      character: person.character,
      profile_path: person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : null,
    })).slice(0, 10), // Limit to 10 cast members
  };
};
export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results.filter((video: any) => 
    video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );
};
// Helper function to format movie data
const formatMovie = (movie: any): Movie => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
  overview: movie.overview,
});