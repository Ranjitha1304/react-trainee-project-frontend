import axios from './axios'

export const fetchProjects = (params = {}, cancelToken) => {
  return axios.get('/miniprojects/', { params, cancelToken })
}

export const createProject = (data) => axios.post('/miniprojects/', data)
export const updateProject = (id, data) => axios.patch(`/miniprojects/${id}/`, data)
export const deleteProject = (id) => axios.delete(`/miniprojects/${id}/`)
export const getProject = (id) => axios.get(`/miniprojects/${id}/`)
export const getReports = () => axios.get('/reports/')
export const fetchMe = () => axios.get('/auth/me/')
