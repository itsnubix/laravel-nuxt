<script lang="ts" setup>
definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const { login } = useAuth()
const { createErrorBag, handleErrors } = useApi()

const state = ref({
  email: 'asdf@asdf',
  password: 'asdf',
})

const errors = createErrorBag(['email', 'password'])

const authenticate = async () => {
  try {
    await login({ email: state.value.email, password: state.value.password })
  } catch (error) {
    console.log(error)
    handleErrors(error, errors)
  }
}
</script>

<template>
  <div>
    {{ errors.email }}
    {{ state }}
    <h1 class="text-2xl font-medium text-center">Login</h1>
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
        </div>

        <div class="mt-6">
          <FormButton type="submit">Submit</FormButton>
        </div>
      </form>
    </Card>
  </div>
</template>
