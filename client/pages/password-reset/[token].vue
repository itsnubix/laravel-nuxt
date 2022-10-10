<script lang="ts" setup>
useHead({ title: 'Reset your password' })
definePageMeta({ layout: 'guest', middleware: 'guest' })

const route = useRoute()
const { login, resetPassword } = useAuth()
const form = useForm({
  email: route.query.email,
  password: '',
  password_confirmation: '',
})

const reset = () => {
  form.submit(async () => {
    await resetPassword({ token: route.params.token, ...form.fields.value })
    await login({
      email: form.fields.value.email,
      password: form.fields.value.password,
    })

    return navigateTo('/home')
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
      <form method="post" @submit.prevent="reset">
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

        <div class="mt-6">
          <FormLabel for="password">New password</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            class="w-full"
            v-model="form.fields.value.password"
            required
          />
          <FormError :value="form.errors.value.password" />
        </div>

        <div class="mt-6">
          <FormLabel for="password">Confirm password</FormLabel>
          <FormInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            class="w-full"
            v-model="form.fields.value.password_confirmation"
            required
          />
          <FormError :value="form.errors.value.password_confirmation" />
        </div>

        <div class="mt-6 flex items-center justify-end">
          <FormSubmit
            :loading="form.submitting.value"
            :success="form.successful.value"
          >
            Reset password
          </FormSubmit>
        </div>
      </form>
    </Card>
  </div>
</template>
