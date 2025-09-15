import React, { useEffect, useState, useRef } from 'react'
import { fetchProjects, updateProject } from '../api/projects'
import ProjectCard from '../components/ProjectCard'
import axios from 'axios'

export default function TraineeDashboard(){
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const cancelRef = useRef(null)

  const load = async () =>{
    setLoading(true)
    if(cancelRef.current){
      cancelRef.current.cancel('Operation canceled by the user.')
    }
    cancelRef.current = axios.CancelToken.source()
    try{
      const resp = await fetchProjects({}, cancelRef.current.token)
      setProjects(resp.data.results)
    } catch (e){
      console.error(e)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const markComplete = async (id) =>{
    try{
      await updateProject(id, { status: 'completed', progress: 100 })
      load()
    } catch (e){ console.error(e) }
  }

  return (
    <div>
      <h2 className="text-xl mb-4">My Assigned Projects</h2>
      {loading ? <div className="loader"></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => <ProjectCard key={p.id} project={p} onComplete={()=>markComplete(p.id)} />)}
        </div>
      )}
    </div>
  )
}
