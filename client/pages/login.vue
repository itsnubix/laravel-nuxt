<script lang="ts" setup>
definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const { login } = useAuth()
const { clearErrors, handleErrors, createErrorBag } = useApi()

const state = ref({ email: '', password: '' })

const errors = createErrorBag(['email', 'password'])

const authenticate = async () => {
  clearErrors(errors)

  try {
    await login({ ...state.value })

    return navigateTo('/')
  } catch (error) {
    handleErrors(error, errors)
  }
}
</script>

<template>
  <div>
    <NuxtLink to="/">
      <ApplicationLogo class="mx-auto" />
    </NuxtLink>

    <Card class="mt-6">
      <form method="post" v-on:submit.prevent="authenticate">
        <div>
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
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
            placeholder="password"
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
          <FormButton type="submit">Login</FormButton>
        </div>
      </form>
    </Card>

    <div class="mt-8 text-center text-sm">
      <p>Don't have an account?</p>
      <NuxtLink to="/register" class="underline">Create one now</NuxtLink>
    </div>
  </div>
</template>
