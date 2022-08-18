import { useAuthStore } from '@/stores/auth'
import { resolveDirective } from 'nuxt/dist/app/compat/capi'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { $api } = useApi()

  const login = async (credentials: { email: string; password: string }) => {
    await $api.post('login', { ...credentials })
    await authStore.loadUser()
  }

  const logout = async () => {
    try {
      await $api.delete('logout')
    } finally {
      authStore.clearUser()
    }

    return navigateTo('login')
  }

  const register = async (user: App.Models.User) => {
    await $api.post('register', { ...user })
    await authStore.loadUser()
  }

  const forgotPassword = async (email: string) => {
    await $api.post('forgot-password')
  }

  return { login, register, logout }
}
