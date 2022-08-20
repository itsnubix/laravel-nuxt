<script lang="ts" setup>
const { register } = useAuth()
const {
  isSubmitting,
  startSubmit,
  stopSubmit,
  clearErrors,
  handleErrors,
  createErrorBag,
} = useForm()

definePageMeta({
  layout: 'guest',
  middleware: 'guest',
})

const state = ref({ name: '', email: '', password: '' })

const errors = createErrorBag(['name', 'email', 'password'])

const authenticate = async () => {
  startSubmit()
  clearErrors(errors)

  try {
    await register({ ...state.value })

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
          <FormLabel for="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
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

        <div class="mt-6 flex justify-end">
          <FormSubmit :loading="isSubmitting">Register</FormSubmit>
        </div>
      </form>
    </Card>

    <div class="mt-8 text-center text-sm">
      <p>Already have an account?</p>
      <NuxtLink to="/login" class="underline">Login now</NuxtLink>
    </div>
  </div>
</template>
