import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import TraineeDashboard from './pages/TraineeDashboard'
import TrainerDashboard from './pages/TrainerDashboard'
import ProjectDetail from './pages/ProjectDetail'
import Navbar from './components/Navbar'
import { useAuth } from './contexts/AuthContext'

function App(){
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? (user.role === 'trainer' ? <TrainerDashboard /> : <TraineeDashboard />) : <Navigate to="/login" />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
