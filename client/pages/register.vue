<script lang="ts" setup>
const { register } = useAuth()
const { clearErrors, handleErrors, createErrorBag } = useValidation()

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const state = ref({ name: '', email: '', password: '' })

const errors = createErrorBag(['name', 'email', 'password'])

const authenticate = async () => {
  clearErrors(errors)

  try {
    await register({ ...state.value })

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
          <FormLabel for="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            class="w-full"
            v-model="state.name"
            autofocus
            required
          />
          <FormError :value="errors.name" />
        </div>

        <div class="mt-4">
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
            placeholder="••••••••"
            class="w-full"
            v-model="state.password"
            required
          />
          <FormError :value="errors.password" />
        </div>

        <div class="mt-6 flex justify-end">
          <FormButton type="submit">Register</FormButton>
        </div>
      </form>
    </Card>

    <div class="mt-8 text-center text-sm">
      <p>Already have an account?</p>
      <NuxtLink to="/login" class="underline">Login now</NuxtLink>
    </div>
  </div>
</template>
