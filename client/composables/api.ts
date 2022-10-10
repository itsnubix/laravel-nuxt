import axios, { AxiosError, AxiosResponse } from 'axios'
import { useAuthStore } from '../stores/auth'

export function useApi() {
  const { apiBase } = useRuntimeConfig()
  const authStore = useAuthStore()

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
      case 409:
        return navigateTo('/verify-email')
      case 419:
        await api.get('sanctum/csrf-cookie')
        return api.request(error.config)
      default:
        return Promise.reject(error)
    }
  })

  return { api }
}
