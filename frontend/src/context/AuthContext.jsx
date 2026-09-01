import { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    const userData = data.user || {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: Boolean(data.isAdmin),
    }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return { ...data, user: userData }
  }, [])

  const register = useCallback(async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', {
      name,
      email,
      password,
    })
    const userData = data.user || {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: Boolean(data.isAdmin),
    }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return { ...data, user: userData }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext
