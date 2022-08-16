import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

interface State {
  user: User
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: JSON.parse(localStorage.getItem('store/auth/user')),
  }),

  actions: {
    async loadUser() {
      const { data } = await useApi().get('api/user')

      this.updateUser(data)
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
