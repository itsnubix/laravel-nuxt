<script lang="ts" setup>
import { abort } from 'process'

const { resetPassword } = useAuth()
const {
  isSubmitting,
  startSubmit,
  stopSubmit,
  clearErrors,
  createErrorBag,
  handleErrors,
} = useForm()
const route = useRoute()
const { notify } = useNotifications()

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
})

const errors = createErrorBag(['email', 'password'])
const token = route.params.token as string
const state = ref({ email: route.query.email as string, password: '' })

const reset = async () => {
  startSubmit()
  clearErrors(errors)

  try {
    const redirect = await resetPassword({ token, ...state.value })
    notify('Password reset.')

    console.log(redirect)

    return redirect
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
      <form method="post" v-on:submit.prevent="reset">
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

        <div class="mt-6">
          <FormLabel for="password">New password</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            class="w-full"
            v-model="state.password"
            autofocus
            required
          />
          <FormError :value="errors.password" />
        </div>

        <div class="mt-6 flex items-center justify-end">
          <FormSubmit :is-loading="isSubmitting"> Reset password </FormSubmit>
        </div>
      </form>
    </Card>
  </div>
</template>
