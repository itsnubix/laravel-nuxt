import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { $api } = useApi()

  const login = async (credentials: { email: string; password: string }) => {
    console.log(1)
    await $api.post('login', { ...credentials })
    console.log(2)
    await authStore.loadUser()
    console.log(3)

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
