<script lang="ts" setup>
useHead({ title: 'Verify Email' })
definePageMeta({ layout: 'guest', middleware: 'auth' })

const form = useForm()
const { logout, sendEmailVerification } = useAuth()

function resend() {
  form.submit(async () => await sendEmailVerification())
}
</script>

<template>
  <div class="w-full">
    <div class="text-center">
      <NuxtLink to="/" class="inline-block">
        <ApplicationLogo />
      </NuxtLink>
    </div>

    <Card class="mx-auto mt-6 max-w-md">
      <form method="post" @submit.prevent="resend">
        <div className="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <div className="mt-4 flex items-center justify-between">
          <FormSubmit
            :loading="form.submitting.value"
            :success="form.successful.value"
          >
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
