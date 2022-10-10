export default defineNuxtPlugin((app) => ({ provide: { auth: useAuth() } }))
