<script lang="ts" setup>
import { BadgeCheckIcon } from '@heroicons/vue/outline'

const { resetPassword } = useAuth()
const {
  stopSubmit,
  clearErrors,
  startSubmit,
  isSubmitted,
  handleErrors,
  isSubmitting,
  createErrorBag,
} = useForm()
const route = useRoute()

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
})

const errors = createErrorBag(['email', 'password'])
const token = route.params.token as string
const state = ref({
  email: route.query.email as string,
  password: '',
})

const reset = async () => {
  startSubmit()
  clearErrors(errors)

  try {
    await resetPassword({ token, ...state.value })
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
          <FormSubmit :loading="isSubmitting"> Reset password </FormSubmit>
        </div>
      </form>

      <Banner class="bg-green-600 text-white mt-10" :show="isSubmitted">
        <span class="flex p-2 rounded-lg bg-green-800">
          <BadgeCheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <p class="ml-3 font-medium text-white">
          <strong>Password reset!</strong>
        </p>

        <div class="ml-auto">
          <NuxtLink
            :to="{
              path: '/login',
              query: { email: state.email },
            }"
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
          >
            Login now
          </NuxtLink>
        </div>
      </Banner>
    </Card>
  </div>
</template>
