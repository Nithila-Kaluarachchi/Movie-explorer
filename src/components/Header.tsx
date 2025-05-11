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
} from '@mui/material'
import {
  SunIcon,
  MoonIcon,
  HeartIcon,
  HomeIcon,
  LogOutIcon,
} from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
interface HeaderProps {
  onLogout: () => void
}
const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { mode, toggleTheme } = useContext(ThemeContext)
  const theme = useTheme()
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
      </Toolbar>
    </AppBar>
  )
}
export default Header
