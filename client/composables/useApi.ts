import { AxiosError } from 'axios'
import { Ref } from 'nuxt/dist/app/compat/capi'

export interface ErrorBag extends Ref {
  $message: string
}

export const useApi = () => {
  const createApiInstance = () => useNuxtApp().$api

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

  const clearErrors = (errorBag: ErrorBag) => {
    for (const key in errorBag.value) {
      errorBag.value[key] = ''
    }
  }

  const handleErrors = (error: AxiosError, errorBag: ErrorBag) => {
    const { data, status } = error.response

    console.log(error, error.response)

    errorBag.value.$message = data['message']

    switch (status) {
      case 422:
        return handleValidationErrors(data['errors'], errorBag)
      default:
        throw error
    }
  }

  const handleValidationErrors = (errors: Object, errorBag: ErrorBag) => {
    for (const key in errors) {
      if (key in errorBag.value) {
        errorBag.value[key] = errors[key]
      }
    }
  }

  return {
    clearErrors,
    handleErrors,
    createErrorBag,
    $api: createApiInstance(),
  }
}
