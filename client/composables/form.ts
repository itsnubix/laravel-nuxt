import { AxiosError } from 'axios'
import { Ref } from 'vue'

export interface ErrorBag extends Ref {
  $message: string
}

export const useForm = (fields: any = {}) => {
  const original = { ...fields }

  // Create an error bag for each field
  const createErrorBag = (): ErrorBag => {
    let errors = []

    Object.keys(fields).forEach((error: string) => (errors[error] = ''))

    return ref({ $message: '', ...errors }) as ErrorBag
  }

  // handle validation errors
  const handleValidationErrors = (errors: any) => {
    for (const key in errors) {
      if (key in fieldsRef.value) {
        errorsRef.value[key] = errors[key]
      }
    }
  }

  // Track form state
  const submitted = ref(false)
  const submitting = ref(false)
  const successful = ref(false)
  const fieldsRef = ref(fields)
  const errorsRef = createErrorBag()

  // start form submission
  function start() {
    submitted.value = false
    successful.value = false

    submitting.value = true
  }

  // stop form submission
  function stop() {
    submitted.value = true
    submitting.value = false
  }

  // form submission succeeded
  function success() {
    successful.value = true
  }

  // reset form state
  function reset() {
    fieldsRef.value = { ...original }
  }

  // clear form errors
  function clearErrors() {
    for (const key in errorsRef.value) {
      errorsRef.value[key] = ''
    }
  }

  // handle form submission errors based on response status
  function handleErrors(error: AxiosError) {
    switch (error.response?.status) {
      case 422:
        errorsRef.value.$message = error.response?.data['message']
        return handleValidationErrors(error.response?.data['errors'])
      default:
        throw error
    }
  }

  return {
    start,
    stop,
    reset,
    success,
    submitted,
    submitting,
    successful,
    clearErrors,
    handleErrors,

    errors: errorsRef,
    fields: fieldsRef,
    async submit(
      callback: CallableFunction,
      options: { shouldReset: boolean } = { shouldReset: true },
    ) {
      if (submitting.value) return

      try {
        start()
        clearErrors()

        await callback(fieldsRef.value)

        if (options.shouldReset) {
          reset()
        }

        success()
      } catch (error) {
        handleErrors(error)
      } finally {
        stop()
      }
    },
  }
}
