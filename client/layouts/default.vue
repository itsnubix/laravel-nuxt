<script lang="ts" setup>
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

const { logout } = useAuth()

const navigation = [
  {
    name: 'Home',
    to: '/',
    current: false,
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <div class="bg-slate-50 flex-grow">
      <slot />
    </div>
  </div>
</template>
