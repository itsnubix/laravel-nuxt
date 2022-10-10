<script lang="ts" setup>
useHead({ title: 'Login' })
definePageMeta({ layout: 'guest', middleware: 'guest' })

const route = useRoute()
const { login } = useAuth()
const form = useForm({ email: route.query.email ?? '', password: '' })

function authenticate() {
  form.submit(async () => await login(form.fields.value))
}
</script>

<template>
  <div class="w-full">
    <div class="text-center">
      <NuxtLink to="/" class="inline-block">
        <ApplicationLogo />
      </NuxtLink>
    </div>

    <Card class="mx-auto mt-4 max-w-md">
      <Form @submit.prevent="authenticate">
        <div class="sm:col-span-6">
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

        <div class="sm:col-span-6">
          <FormLabel for="password">Password</FormLabel>
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

        <div class="col-span-6 flex items-center justify-between">
          <FormSubmit
            :loading="form.submitting.value"
            :success="form.successful.value"
          >
            Login
          </FormSubmit>
          <NuxtLink to="forgot-password" class="ml-3 text-sm text-gray-700">
            Forgot your password?
          </NuxtLink>
        </div>
      </Form>
    </Card>

    <div class="mt-8 text-center text-sm text-gray-500">
      <p>Don't have an account?</p>
      <NuxtLink to="/register" class="underline">Create one now</NuxtLink>
    </div>
  </div>
</template>
