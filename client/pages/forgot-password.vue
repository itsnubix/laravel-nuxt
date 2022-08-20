<script lang="ts" setup>
import { LockOpenIcon } from '@heroicons/vue/outline'
const { forgotPassword } = useAuth()
const {
  isSubmitted,
  isSubmitting,
  startSubmit,
  stopSubmit,
  clearErrors,
  createErrorBag,
  handleErrors,
} = useForm()

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
})

const state = ref({ email: '' })

const errors = createErrorBag(['email'])

const reset = async () => {
  startSubmit()
  clearErrors(errors)

  try {
    await forgotPassword(state.value.email)
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
          <FormSubmit :loading="isSubmitting">
            Email password reset link
          </FormSubmit>
        </div>
      </form>

      <Banner class="bg-green-600 text-white mt-10" :show="isSubmitted">
        <span class="flex p-2 rounded-lg bg-green-800">
          <LockOpenIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <p class="ml-3 font-medium text-white">
          <strong>Email sent!</strong>
          Check your email to finish resetting your password.
        </p>
      </Banner>
    </Card>
  </div>
</template>
