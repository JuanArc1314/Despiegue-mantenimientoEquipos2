import axios from 'axios'

const AUTH_URL = 'https://despiegue-mantenimientoequipos2-production.up.railway.app/api'
const EQUIPMENT_URL = 'https://bountiful-wonder-production-e22e.up.railway.app/api'
const MAINTENANCE_URL = 'https://caring-rebirth-production-a1dc.up.railway.app/api'

export const authApi = axios.create({ baseURL: AUTH_URL })
export const userApi = axios.create({ baseURL: AUTH_URL })
export const equipmentApi = axios.create({ baseURL: EQUIPMENT_URL })
export const locationApi = axios.create({ baseURL: EQUIPMENT_URL })
export const maintenanceApi = axios.create({ baseURL: MAINTENANCE_URL })

const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('[API WARN] No token found in localStorage for request:', config.url)
    }
    return config
  })

  instance.interceptors.response.use(
    res => res,
    err => {
      const status = err.response?.status
      const url = err.config?.baseURL + err.config?.url

      console.error('[API ERROR]', { status, url, data: err.response?.data })

      if (status === 403) {
        const IGNORAR_403 = ['/users', '/catalogos', '/tipos']
        const esLlamadaSecundaria = IGNORAR_403.some(path => url.includes(path))
        if (!esLlamadaSecundaria) {
          window.location.href = '/sin-acceso'
        }
      }

      return Promise.reject(err)
    }
  )
}

addAuthInterceptor(authApi)
addAuthInterceptor(userApi)
addAuthInterceptor(equipmentApi)
addAuthInterceptor(locationApi)
addAuthInterceptor(maintenanceApi)

export default authApi