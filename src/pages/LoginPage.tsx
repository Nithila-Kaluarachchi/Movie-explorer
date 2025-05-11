import React, { useState } from 'react'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material'
import { LogInIcon } from 'lucide-react'
interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean
}
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password')
      return
    }
    const success = onLogin(username, password)
    if (!success) {
      setError('Invalid credentials. Try username: user, password: password')
    }
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Movie Explorer
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to discover your favorite films
            </Typography>
          </Box>
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
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
              startIcon={<LogInIcon size={20} />}
            >
              Sign In
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
              }}
            >
              Demo credentials: username: user, password: password
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
export default LoginPage
