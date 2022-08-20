import axios from 'axios'
import { useAuthStore } from '../stores/auth'

export const useApi = () => {
  const { authenticated, clearUser } = useAuthStore()
  const { apiBase } = useRuntimeConfig()

  const api = axios.create({
    baseURL: apiBase,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  // Handle CSRF Errors
  api.interceptors.response.use(null, async (error) => {
    switch (error.response?.status) {
      case 401:
        return authenticated && clearUser()
      case 419:
        await api.get('sanctum/csrf-cookie')

        return api.request(error.config)

      default:
        return Promise.reject(error)
    }
  })

  return {
    api,
  }
}
