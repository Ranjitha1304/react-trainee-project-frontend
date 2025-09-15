import React, { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'', first_name:'', last_name:'', role:'trainee' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    try{
      await axios.post('/auth/register/', form)
      navigate('/login')
    } catch (err){
      setError(err.response?.data || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{JSON.stringify(error)}</div>}
      <form onSubmit={submit} className="space-y-2">
        <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" />
        <input value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} placeholder="First name" className="w-full p-2 border rounded" />
        <input value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} placeholder="Last name" className="w-full p-2 border rounded" />
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-2 border rounded">
          <option value="trainee">Register as Trainee</option>
          <option value="trainer">Register as Trainer</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  )
}
