<script lang="ts" setup>
const reportNames = await $fetch('/api/reports44')
const queryName = ref<string>('')
</script>

<template>
  <div>
    <div class="flex flex-col gap-10">
      <div class="w-full flex items-center justify-center">
        <ReportSelector v-model="queryName" :reports="reportNames" />
      </div>
      <div class="flex 1">
        <ReportFetch :name="queryName" :collection="44" />
      </div>
    </div>
  </div>
</template>

