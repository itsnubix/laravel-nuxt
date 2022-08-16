import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore()

  console.log(store.isAuthenticated)

  if (!store.isAuthenticated) {
    return navigateTo('/login')
  }
})
