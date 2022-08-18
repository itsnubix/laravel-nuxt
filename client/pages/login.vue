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
    await login({ email: state.value.email, password: state.value.password })
  } catch (error) {
    handleErrors(error, errors)
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-medium text-center">Login</h1>
    {{ errors.asdf }}
    <Card class="mt-2">
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

        <div class="mt-6">
          <FormButton type="submit">Submit</FormButton>
        </div>
      </form>
    </Card>
  </div>
</template>
