import React from 'react'
import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material'

const Footer: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        py: 3,
        px: 4,
        mt: 4,
        textAlign: 'center',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontSize: isMobile ? '0.75rem' : '0.875rem',
        }}
      >
        © {new Date().getFullYear()} Nithila Kaluarachchi. All rights reserved.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          color="inherit"
          underline="hover"
          sx={{
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          }}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          color="inherit"
          underline="hover"
          sx={{
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          }}
        >
          Favorites
        </Link>
        <Link
          href="https://github.com/Nithila-Kaluarachchi"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="hover"
          sx={{
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          }}
        >
          GitHub
        </Link>
        <Link
          href="/about"
          color="inherit"
          underline="hover"
          sx={{
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          }}
        >
          About
        </Link>
      </Box>
    </Box>
  )
}

export default Footer