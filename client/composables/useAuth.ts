import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await useApi().post('login', { ...credentials })
      await authStore.loadUser()

      return navigateTo('/')
    } catch (error) {
      createError(error)

      return navigateTo('logout')
    }
  }

  const logout = async () => {
    await authStore.clearUser()
    await useApi().delete('logout')

    return navigateTo('login')
  }

  const register = async () => {}

  return { login, register, logout }
}
