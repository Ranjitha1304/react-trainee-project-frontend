import React, { useState } from 'react'
import axios from '../api/axios'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const { login, setUser } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    try{
      const resp = await axios.post('/auth/token/', form)
      const { access, refresh } = resp.data
      // set access header temporarily
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      // fetch /auth/me to get user info (role etc)
      const me = await axios.get('/auth/me/')
      const user = me.data
      // finalize login
      login({ accessToken: access, refreshToken: refresh, user })
      navigate('/dashboard')
    } catch (err){
      setError('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-2">
        <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" />
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
