<script lang="ts" setup>
const { forgotPassword } = useAuth()
const { createErrorBag, handleErrors } = useValidation()

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
})

const state = ref({ email: '' })

const errors = createErrorBag(['email'])

const reset = async () => {
  try {
    await forgotPassword(state.value.email)
  } catch (error) {
    handleErrors(error, errors)
  }
}
</script>
<template>
  <div>
    <NuxtLink to="/">
      <ApplicationLogo class="mx-auto" />
    </NuxtLink>

    <Card class="mt-6">
      <form method="post" v-on:submit.prevent="reset">
        <div>
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            class="w-full"
            v-model="state.email"
            autofocus
            required
          />
          <FormError :value="errors.email" />
        </div>

        <div class="mt-6 flex items-center justify-end">
          <FormButton type="submit">Send reset request</FormButton>
        </div>
      </form>
    </Card>
  </div>
</template>
