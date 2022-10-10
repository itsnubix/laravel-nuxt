export default defineNuxtPlugin((app) => {
  return {
    provide: { auth: useAuth().$store },
  }
})
