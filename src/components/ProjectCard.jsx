import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project, onComplete }){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{project.title}</h3>
      <p className="text-sm text-gray-600">Due: {project.due_date || 'N/A'}</p>
      <p className="text-sm">Priority: {project.priority}</p>
      <p className="text-sm">Status: {project.status}</p>
      <div className="mt-2 flex gap-2">
        <Link to={`/projects/${project.id}`} className="px-2 py-1 border rounded">View</Link>
        {onComplete && <button onClick={onComplete} className="px-2 py-1 bg-green-600 text-white rounded">Mark Complete</button>}
      </div>
    </div>
  )
}
