import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// On 401 try refresh
instance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh = localStorage.getItem('refresh')
        if (!refresh) throw new Error('No refresh token')
        const resp = await axios.post(`${BASE_URL.replace('/api','')}/api/auth/token/refresh/`, { refresh })
        const { access } = resp.data
        localStorage.setItem('access', access)
        instance.defaults.headers.common['Authorization'] = `Bearer ${access}`
        originalRequest.headers['Authorization'] = `Bearer ${access}`
        return instance(originalRequest)
      } catch (e) {
        localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)

export default instance
