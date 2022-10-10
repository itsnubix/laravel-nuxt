import { useAuthStore } from '@/stores/auth'
import { AxiosResponse } from 'axios'

export function useAuth() {
  const { api } = useApi()
  const authStore = useAuthStore()
  const { home } = useRuntimeConfig()

  return {
    $store: authStore,
    user: authStore.user,
    verified: authStore.verified,
    authenticated: authStore.authenticated,

    async login(credentials: { email: string; password: string }) {
      await api.post('login', { ...credentials })
      await authStore.loadUser()

      return navigateTo(home)
    },

    async logout() {
      await api.delete('logout')
      authStore.clearAll()

      return navigateTo('/login')
    },

    async register(user: { name: string; email: string; password: string }) {
      await api.post('register', { ...user })
      await authStore.loadUser()

      return navigateTo(home)
    },

    async forgotPassword(email: string) {
      try {
        await api.post('forgot-password', { email })
        return true
      } catch (error) {
        return false
      }
    },

    async resetPassword(resetRequest: {
      email: string
      token: string
      password: string
      password_confirmation: string
    }) {
      await api.post('reset-password', { ...resetRequest })
    },

    async updatePassword(request: {
      password: string
      current_password: string
      password_confirmation: string
    }) {
      await api.put('update-password', { ...request })
    },

    async sendEmailVerification() {
      await api.post('email/verification-notification')
    },

    async getAuthenticatedUser() {
      return ((await api.get('api/me')) as AxiosResponse).data
    },
  }
}
