import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axios'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch (e) { return null }
  })
  const [access, setAccess] = useState(() => localStorage.getItem('access') || null)
  const [refresh, setRefresh] = useState(() => localStorage.getItem('refresh') || null)

  useEffect(() => {
    if(access){
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`
    } else {
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }, [access])

  const login = ({ accessToken, refreshToken, user }) => {
    setAccess(accessToken)
    setRefresh(refreshToken)
    setUser(user)
    localStorage.setItem('access', accessToken)
    localStorage.setItem('refresh', refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setAccess(null); setRefresh(null); setUser(null)
    localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('user')
    delete axiosInstance.defaults.headers.common['Authorization']
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, access, refresh, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
