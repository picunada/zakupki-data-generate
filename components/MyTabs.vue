<script setup lang="ts">
import { Tab, TabGroup, TabList } from '@headlessui/vue'
const links = ['Reports44', 'Reports223', 'Reports615']
</script>

<template>
  <div class="w-full max-w-md px-2 py-8 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-white/10 p-1">
        <Tab
          v-for="link in links"
          :key="link"
          as="template"
          class="flex-1"
        >
          <NuxtLink :to="link.toLowerCase()">
            <button
              class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" :class="[
                $route.name === link.toLowerCase()
                  ? 'bg-blue-500 shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              {{ link }}
            </button>
          </NuxtLink>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>
