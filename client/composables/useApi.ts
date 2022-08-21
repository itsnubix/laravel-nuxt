import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { NotificationStatus } from '../stores/notifications'

export const useApi = () => {
  const { error: notifyError } = useNotifications()
  const { apiBase } = useRuntimeConfig()
  const { authenticated, clearUser } = useAuthStore()

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
  api.interceptors.response.use(null, async (error: AxiosError) => {
    switch (error?.response?.status) {
      case 401:
        return authenticated && clearUser()
      case 419:
        await api.get('sanctum/csrf-cookie')
        return api.request(error.config)
      case 500:
        notifyError('Something went horribly wrong.', 'Oh no!')
      default:
        return Promise.reject(error)
    }
  })

  return { api }
}
