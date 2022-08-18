import { AxiosError } from 'axios'
import { Ref } from 'nuxt/dist/app/compat/capi'

export const useApi = () => {
  const createApiInstance = () => useNuxtApp().$api

  interface ErrorBag extends Ref {
    $message: string
  }

  const createErrorBag = (errorsToHandle: string | Array<string>): ErrorBag => {
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

  const handleErrors = (error: AxiosError, errorBag: ErrorBag) => {
    const { data, status } = error.response

    switch (status) {
      case 422:
        return handleValidationErrors(data['errors'], data['message'], errorBag)
      default:
        throw error
    }
  }

  const handleValidationErrors = (
    errors: Object,
    message: string = '',
    errorBag: ErrorBag,
  ) => {
    if (message) {
      errorBag.$message = message
    }

    for (const key in errors) {
      if (key in errorBag.value) {
        errorBag.value[key] = errors[key]
      }
    }
  }

  return {
    handleErrors,
    createErrorBag,
    handleValidationErrors,
    $api: createApiInstance(),
  }
}
