import React, { useState, useContext } from 'react'
import { Paper, InputBase, IconButton, Box } from '@mui/material'
import { SearchIcon } from 'lucide-react'
import { MovieContext } from '../context/MovieContext'
const SearchBar: React.FC = () => {
  const { searchMovies, searchQuery } = useContext(MovieContext)
  const [query, setQuery] = useState(searchQuery)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    searchMovies(query)
  }
  return (
    <Box className="search-container">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 600,
        }}
        elevation={3}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
          }}
          placeholder="Search for movies..."
          inputProps={{
            'aria-label': 'search movies',
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{
            p: '10px',
          }}
          aria-label="search"
        >
          <SearchIcon size={20} />
        </IconButton>
      </Paper>
    </Box>
  )
}
export default SearchBar
