import { defineStore } from 'pinia'

interface State {
  user: App.Models.User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: JSON.parse(localStorage.getItem('store/auth/user')),
  }),

  actions: {
    async loadUser() {
      const { $api } = useApi()
      const { data: user } = await $api.get('api/me')

      this.updateUser(user)
    },

    updateUser(user: App.Models.User) {
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
