<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  icon?: any
  to?: RouteLocationRaw
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'square'
  type?: 'submit' | 'button'
  theme?: 'primary' | 'secondary' | 'plain'
  iconClass?: string
}>()

const sizeClasses = () => {
  switch (props.size) {
    case 'square':
      return 'p-1.5 text-sm'
    case 'xs':
      return 'px-2 py-1 text-xs'
    case 'sm':
      return 'px-2.5 py-1.5 text-sm'
    case 'lg':
      return 'px-4 py-2 text-base'
    case 'md':
    default:
      return 'px-4 py-2 text-sm'
  }
}

const themeClasses = () => {
  switch (props.theme) {
    case 'plain':
      return 'text-indigo-500 focus:ring-indigo-500 !shadow-none !p-0.5'
    case 'secondary':
      return [
        'bg-white text-indigo-500 border border-indigo-300 focus:ring-indigo-500',
        props.to
          ? 'hover:bg-indigo-50'
          : 'enabled:hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed',
      ]
    case 'primary':
    default:
      return [
        'text-white bg-indigo-500 focus:ring-indigo-500',
        props.to
          ? 'hover:bg-indigo-700'
          : 'enabled:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed',
      ]
  }
}

const iconClasses = () => {
  const classes = []
  switch (props.size) {
    case 'sm':
      classes.push('h-5 w-5 ml-1 -mr-0.5')
      break
    case 'lg':
      classes.push('h-6 w-6 ml-1.5 -mr-1')
      break
    case 'md':
    default:
      classes.push('h-5 w-5 ml-1 -mr-1')
      break
  }

  switch (props.theme) {
    case 'secondary':
      classes.push('text-indigo-400')
      break
    case 'primary':
    default:
      classes.push('text-indigo-400')
      break
  }

  if (props.iconClass) {
    classes.push(props.iconClass)
  }

  return classes
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :type="type || 'button'"
    :class="[
      sizeClasses(),
      themeClasses(),
      'inline-flex items-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    ]"
  >
    <slot />

    <div v-if="icon" :class="iconClasses()" aria-hidden="true">
      <component :is="icon" />
    </div>
  </NuxtLink>
  <button
    v-else-if="!to"
    :type="type || 'button'"
    :class="[
      sizeClasses(),
      themeClasses(),
      'inline-flex items-center rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    ]"
  >
    <slot />

    <div v-if="icon" :class="iconClasses()" aria-hidden="true">
      <component :is="icon" />
    </div>
  </button>
</template>
