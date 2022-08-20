import { AxiosError } from 'axios'
import { Ref } from 'nuxt/dist/app/compat/capi'

export interface ErrorBag extends Ref {
  $message: string
}

export const useForm = () => {
  const isSubmitted = ref(false)
  const isSubmitting = ref(false)

  const startSubmit = () => {
    isSubmitted.value = false
    isSubmitting.value = true
  }

  const stopSubmit = () => {
    isSubmitted.value = true
    isSubmitting.value = false
  }

  /**
   * Creates a validation error bag
   */
  const createErrorBag = (
    errorsToHandle: string | Array<string> = [],
  ): ErrorBag => {
    if (typeof errorsToHandle === 'string') {
      errorsToHandle = [errorsToHandle]
    }

    let errors = []

    errorsToHandle.forEach((error: string) => (errors[error] = ''))

    return ref({
      $message: '',
      ...errors,
    }) as ErrorBag
  }

  /**
   * Clears all errors from an error bag
   */
  const clearErrors = (errorBag: ErrorBag) => {
    for (const key in errorBag.value) {
      errorBag.value[key] = ''
    }
  }

  /**
   * Processes and handles axios errors
   */
  const handleErrors = (error: AxiosError, errorBag: ErrorBag) => {
    const { data, status } = error.response

    switch (status) {
      case 422:
        errorBag.value.$message = data['message']
        return handleValidationErrors(data['errors'], errorBag)
      default:
        throw error
    }
  }

  /**
   * Handles validation errors
   */
  const handleValidationErrors = (errors: Object, errorBag: ErrorBag) => {
    for (const key in errors) {
      if (key in errorBag.value) {
        errorBag.value[key] = errors[key]
      }
    }
  }

  return {
    stopSubmit,
    clearErrors,
    isSubmitted,
    startSubmit,
    handleErrors,
    isSubmitting,
    createErrorBag,
  }
}
