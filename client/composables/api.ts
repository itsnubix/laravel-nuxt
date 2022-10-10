import { useAuthStore } from '@/stores/auth'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const useApi = () => {
  const authStore = useAuthStore()
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

  // Check if service is offline
  api.interceptors.request.use((config) => {
    if (!window.navigator.onLine) {
      console.log('cache requests to sync later')
    }

    return config
  })

  // Handle CSRF Errors
  let attempts = 0
  api.interceptors.response.use(null, async (error: AxiosError) => {
    attempts += 1

    if (attempts > 3) {
      return Promise.reject(error)
    }

    switch (error?.response?.status) {
      case 401:
        if (authStore.authenticated) {
          authStore.clearUser()
        }
        return (location.href = '/login')
      case 419:
        await api.get('sanctum/csrf-cookie')
        return api.request(error.config)
      default:
        return Promise.reject(error)
    }
  })

  return { api }
}
