import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const { api } = useApi()
  const { loadUser, clearUser } = useAuthStore()
  const { home } = useRuntimeConfig()

  /**
   * Login the user and redirect to the homepage
   */
  const login = async (credentials: { email: string; password: string }) => {
    await api.post('login', { ...credentials })
    await loadUser()

    return navigateTo(home)
  }

  /**
   * Invalidate the session, clear the store, and redirec to the login page
   */
  const logout = async () => {
    await api.delete('logout')
    clearUser()

    return navigateTo('/login')
  }

  /**
   * Register the user, load them and redirect to the homepage
   */
  const register = async (user: {
    name: string
    email: string
    password: string
  }) => {
    await api.post('register', { ...user })
    await loadUser()

    return navigateTo(home)
  }

  /**
   * Request a password forgotten email
   */
  const forgotPassword = async (email: string) => {
    await api.post('forgot-password', { email })
  }

  /**
   * Reset the password
   */
  const resetPassword = async (resetRequest: {
    email: string
    token: string
    password: string
  }) => {
    await api.post('reset-password', { ...resetRequest })
  }

  /**
   * Send another email verification
   */
  const sendEmailVerification = async () => {
    await api.post('email/verification-notification')
  }

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    sendEmailVerification,
  }
}
