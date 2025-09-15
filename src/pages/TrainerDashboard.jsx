import React, { useEffect, useState } from 'react'
import { fetchProjects, deleteProject, getReports } from '../api/projects'
import ProjectCard from '../components/ProjectCard'

export default function TrainerDashboard(){
  const [projects, setProjects] = useState([])
  const [reports, setReports] = useState([])

  const load = async () =>{
    try{
      const resp = await fetchProjects()
      setProjects(resp.data.results)
    } catch (e){ console.error(e) }
  }
  const loadReports = async () =>{
    try{ const r = await getReports(); setReports(r.data) } catch (e) { console.error(e) }
  }
  useEffect(()=>{ load(); loadReports() }, [])

  const remove = async (id) =>{
    if(!confirm('Delete project?')) return
    try{ await deleteProject(id); load() } catch(e){ console.error(e) }
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Trainer Dashboard</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map(r => (
            <div key={r.assigned_to__id} className="p-3 bg-white rounded shadow">
              <div className="font-bold">{r.assigned_to__username}</div>
              <div>Total: {r.total} Completed: {r.completed} InProgress: {r.inprogress}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p.id}>
            <ProjectCard project={p} />
            <div className="flex gap-2 mt-2">
              <button onClick={()=>window.location.href=`/projects/${p.id}`} className="px-2 py-1 border rounded">Edit</button>
              <button onClick={()=>remove(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
