import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <nav className="bg-white shadow p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="font-bold">TraineeTracker</div>
          <Link to="/" className="text-sm text-gray-600">Home</Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm">{user.username} ({user.role})</div>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-blue-500 text-white rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
