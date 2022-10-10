<script lang="ts" setup>
const form = useForm({ email: '' })
const { forgotPassword } = useAuth()

useHead({ title: 'Forgot Password' })
definePageMeta({ middleware: 'guest', layout: 'guest' })

const reset = () => {
  form.submit(async () => {
    await forgotPassword(form.fields.value.email)
  })
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
      <p class="text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>

      <div v-if="form.successful.value" class="mt-6 text-sm">
        <span class="font-gray-700 block font-medium">
          Password reset link sent.
        </span>

        <p class="mr-3 text-gray-500">
          Please check your email inbox for further details.
        </p>
      </div>
      <form
        v-else-if="!form.successful.value"
        class="mt-6"
        method="post"
        @submit.prevent="reset"
      >
        <div>
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            class="w-full"
            v-model="form.fields.value.email"
            autofocus
            required
          />
          <FormError :value="form.errors.value.email" />
        </div>

        <div class="mt-6 flex items-center justify-end">
          <FormSubmit
            :loading="form.submitting.value"
            :success="form.successful.value"
          >
            Email password reset link
          </FormSubmit>
        </div>
      </form>
    </Card>
  </div>
</template>
