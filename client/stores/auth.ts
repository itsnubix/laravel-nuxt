import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

interface State {
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: JSON.parse(localStorage.getItem('store/auth/user')),
  }),

  actions: {
    async loadUser() {
      const { $api } = useApi()
      const { data: user } = await $api.get('api/user')

      this.updateUser(user)
    },

    updateUser(user: User) {
      this.user = user
      localStorage.setItem('store/auth/user', JSON.stringify(user))
    },

    clearUser() {
      this.user = null
      localStorage.removeItem('store/auth/user')
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.user?.id
    },
  },
})
