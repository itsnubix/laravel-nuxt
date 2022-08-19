<script lang="ts" setup>
const { forgotPassword } = useAuth()
const { clearErrors, createErrorBag, handleErrors } = useValidation()
const { notify } = useNotifications()

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
})

const state = ref({ email: '' })

const errors = createErrorBag(['email'])

const reset = async () => {
  clearErrors(errors)

  try {
    await forgotPassword(state.value.email)

    notify('Password reset sent.')
  } catch (error) {
    handleErrors(error, errors)
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

    <Card class="mt-6 mx-auto">
      <p class="text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>

      <form class="mt-6" method="post" v-on:submit.prevent="reset">
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

        <div class="mt-6 flex items-center justify-end">
          <FormButton type="submit">Email password reset link</FormButton>
        </div>
      </form>
    </Card>
  </div>
</template>
