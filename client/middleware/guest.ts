import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = useAuthStore()

  if (authenticated) {
    return navigateTo('/')
  }
})
