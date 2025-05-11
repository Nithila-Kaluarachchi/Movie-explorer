import React, { useMemo, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { ThemeContext } from './context/ThemeContext'
import { MovieProvider } from './context/MovieContext'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import './App.css'
export function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true',
  )
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [mode],
  )
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }
  const handleLogin = (username: string, password: string) => {
    // Simple hardcoded authentication
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true')
      setIsLoggedIn(true)
      return true
    }
    return false
  }
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }
  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MovieProvider>
          <Router>
            {isLoggedIn && <Header onLogout={handleLogout} />}
            <div className="content">
              <Routes>
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <LoginPage onLogin={handleLogin} />
                    )
                  }
                />
                <Route
                  path="/"
                  element={
                    isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/movie/:id"
                  element={
                    isLoggedIn ? (
                      <MovieDetailPage />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    isLoggedIn ? (
                      <FavoritesPage />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </MovieProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
