<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const { login } = useAuth()
const authStore = useAuthStore()
const {
  isSubmitting,
  startSubmit,
  stopSubmit,
  clearErrors,
  handleErrors,
  createErrorBag,
} = useForm()
const route = useRoute()

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const state = ref({ email: route.query.email as string, password: '' })

const errors = createErrorBag(['email', 'password'])

const authenticate = async () => {
  startSubmit()
  clearErrors(errors)

  try {
    await login({ ...state.value })
    await authStore.loadUser()

    return navigateTo('/')
  } catch (error) {
    handleErrors(error, errors)
  } finally {
    stopSubmit()
  }
}
</script>

<template>
  <div class="w-full">
    <div class="text-center">
      <NuxtLink to="/" class="inline-block">
        <ApplicationLogo />
      </NuxtLink>
    </div>

    <Card class="mt-6 max-w-md mx-auto">
      <form method="post" v-on:submit.prevent="authenticate">
        <div>
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            class="w-full"
            v-model="state.email"
            autofocus
            required
          />
          <FormError :value="errors.email" />
        </div>

        <div class="mt-4">
          <FormLabel for="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            class="w-full"
            v-model="state.password"
            required
          />
          <FormError :value="errors.password" />
        </div>

        <div class="mt-6 flex items-center justify-end">
          <NuxtLink to="forgot-password" class="mr-3 text-sm text-gray-700">
            Forgot your password?
          </NuxtLink>
          <FormSubmit :is-loading="isSubmitting">Login</FormSubmit>
        </div>
      </form>
    </Card>

    <div class="mt-8 text-center text-sm">
      <p>Don't have an account?</p>
      <NuxtLink to="/register" class="underline">Create one now</NuxtLink>
    </div>
  </div>
</template>
