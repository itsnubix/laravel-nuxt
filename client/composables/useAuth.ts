import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { $api } = useApi()

  const login = async (credentials: { email: string; password: string }) => {
    await $api.post('login', { ...credentials })
    await authStore.loadUser()

    return navigateTo('/')
  }

  const logout = async () => {
    await authStore.clearUser()
    await $api.delete('logout')

    return navigateTo('login')
  }

  const register = async () => {}

  return { login, register, logout }
}
