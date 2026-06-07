import axios from 'axios'

// En Docker, Nginx hace de proxy hacia cada microservicio.
// Las rutas /api/* son interceptadas por Nginx y redirigidas al servicio correcto.

export const authApi = axios.create({
  baseURL: '/api',   // → auth-service: /api/auth/*
})

export const userApi = axios.create({
  baseURL: '/api',   // → auth-service: /api/users/*
})

export const equipmentApi = axios.create({
  baseURL: '/api',   // → equipment-service: /api/equipments/*, /api/equipment-types/*, /api/import/*
})

export const locationApi = axios.create({
  baseURL: '/api',   // → location-service: /api/laboratorios/*, /api/equipment-locations/*
})

export const maintenanceApi = axios.create({
  baseURL: '/api',   // → maintenance-service: /api/tickets/*, /api/catalog/*, etc.
})

const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('[API WARN] No token found in localStorage for request:', config.url)
    }

    console.log('[REQ]', config.baseURL + config.url, {
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'NO TOKEN',
      authHeader: config.headers.Authorization ? 'YES' : 'NO',
    })

    return config
  })

  instance.interceptors.response.use(
    res => res,
    err => {
      const status = err.response?.status
      const url = err.config?.baseURL + err.config?.url

      console.error('[API ERROR]', {
        status,
        url,
        data: err.response?.data,
      })

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