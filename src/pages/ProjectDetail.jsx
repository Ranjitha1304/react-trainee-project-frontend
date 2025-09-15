import React, { useEffect, useState } from 'react'
import { getProject, updateProject } from '../api/projects'
import { useParams } from 'react-router-dom'

export default function ProjectDetail(){
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({})

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      try{ const r = await getProject(id); setProject(r.data); setForm({ status: r.data.status, progress: r.data.progress }) } catch(e){ console.error(e) } finally { setLoading(false) }
    }
    load()
  }, [id])

  const save = async ()=> {
    try{ await updateProject(id, form); alert('Saved'); } catch(e){ console.error(e) }
  }

  if(loading) return <div className="loader" />
  if(!project) return <div>No project</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl">{project.title}</h2>
      <p>{project.description}</p>
      <div className="mt-4">
        <label>Status</label>
        <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="block p-2 border rounded">
          <option value="todo">To do</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label className="mt-2">Progress</label>
        <input type="number" value={form.progress} onChange={e=>setForm({...form, progress: Number(e.target.value)})} className="w-full p-2 border rounded" />
        <button onClick={save} className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  )
}
