import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  // Handle CSRF Errors
  api.interceptors.response.use(null, async (error) => {
    if (error.response?.status === 419) {
      await api.get('sanctum/csrf-cookie')

      return api.request(error.config)
    }

    return Promise.reject(error)
  })

  return { provide: { api } }
})
