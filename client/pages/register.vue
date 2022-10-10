<script lang="ts" setup>
useHead({ title: 'Register' })
definePageMeta({ layout: 'guest', middleware: 'guest' })

const { register } = useAuth()
const form = useForm({ name: '', email: '', password: '' })
function authenticate() {
  form.submit(async () => await register(form.fields.value))
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
      <Form @submit.prevent="authenticate">
        <div class="col-span-6">
          <FormLabel for="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            class="w-full"
            v-model="form.fields.value.name"
            autofocus
            required
          />
          <FormError :value="form.errors.value.name" />
        </div>

        <div class="col-span-6">
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            class="w-full"
            v-model="form.fields.value.email"
            required
          />
          <FormError :value="form.errors.value.email" />
        </div>

        <div class="col-span-6">
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

        <div class="col-span-6">
          <FormSubmit
            :loading="form.submitting.value"
            :success="form.successful.value"
          >
            Register
          </FormSubmit>
        </div>
      </Form>
    </Card>

    <div class="mt-8 text-center text-sm">
      <p>Already have an account?</p>
      <NuxtLink to="/login" class="underline">Login now</NuxtLink>
    </div>
  </div>
</template>
