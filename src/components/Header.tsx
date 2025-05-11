import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  SunIcon,
  MoonIcon,
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'

interface HeaderProps {
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { mode, toggleTheme } = useContext(ThemeContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Movie Explorer
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-label="menu"
            >
              <MenuIcon size={20} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={RouterLink}
                to="/"
                onClick={handleMenuClose}
              >
                <HomeIcon size={20} style={{ marginRight: 8 }} />
                Home
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/favorites"
                onClick={handleMenuClose}
              >
                <HeartIcon size={20} style={{ marginRight: 8 }} />
                Favorites
              </MenuItem>
              <MenuItem onClick={toggleTheme}>
                {mode === 'dark' ? (
                  <>
                    <SunIcon size={20} style={{ marginRight: 8 }} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon size={20} style={{ marginRight: 8 }} />
                    Dark Mode
                  </>
                )}
              </MenuItem>
              <MenuItem onClick={onLogout}>
                <LogOutIcon size={20} style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon size={20} />}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/favorites"
              startIcon={<HeartIcon size={20} />}
            >
              Favorites
            </Button>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </IconButton>
            <Button
              color="inherit"
              onClick={onLogout}
              startIcon={<LogOutIcon size={20} />}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
