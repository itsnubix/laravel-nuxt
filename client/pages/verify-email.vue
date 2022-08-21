<script lang="ts" setup>
import { InboxInIcon } from '@heroicons/vue/outline'
import { useAuthStore } from '@/stores/auth'

const { verified } = useAuthStore()
const { logout, sendEmailVerification } = useAuth()
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
  layout: 'guest',
})

const errors = createErrorBag()

const resend = async () => {
  try {
    startSubmit()
    clearErrors(errors)
    await sendEmailVerification()
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
      <form method="post" v-on:submit.prevent="resend">
        <div className="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <Banner class="bg-green-600 text-white mt-10" :show="isSubmitted">
          <span class="flex p-2 rounded-lg bg-green-800">
            <InboxInIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 font-medium text-white">
            A new verification link has been sent to the email address you
            provided during registration.
          </p>
        </Banner>

        <div className="mt-4 flex items-center justify-between">
          <FormSubmit :loading="isSubmitting">
            Resend Verification Email
          </FormSubmit>

          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </form>
    </Card>
  </div>
</template>
