<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import type { IDateRange, IGenerateBody, IReport } from '@/models/reports.models'

interface IProps {
  name: string
  collection: 44 | 223 | 615
}

const props = defineProps<IProps>()
const report = ref<IReport>({} as IReport)
const checkedFields = ref<Array<string>>([])
const date = ref<Date>(new Date())
const _date = computed({
  get: () => {
    const day = date.value.getDate()
    const month = date.value.getMonth()
    const year = date.value.getFullYear()
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  },
  set: (newV) => {
    const [y, m, d] = newV.split('-')
    date.value = new Date(Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d)))
  },
})
const body = ref<IGenerateBody>({ collection_name: report.value.collection, report_name: report.value.db, fields: checkedFields.value, date: {} as IDateRange })
const response = ref()
const isPending = ref()
async function generate() {
  isPending.value = true
  const config = useRuntimeConfig()
  try {
    const data = await $fetch(
      `${config.public.apiBase}/generate`, { method: 'post', body: body.value, responseType: 'blob' },
    )
    response.value = data
  }
  finally {
    isPending.value = false
  }
}
const link = ref()
const [wrapper] = useAutoAnimate({ duration: 150 })
const [options] = useAutoAnimate({ duration: 150 })
const [generateButton] = useAutoAnimate({ duration: 200 })
const [downloadButton] = useAutoAnimate({ duration: 200 })
const types = {
  str: 'Строка',
  date: 'Дата',
  int: 'Число',
  boolean: 'true/false',
}

watch(
  () => props.name,
  async (newV, oldV) => {
    body.value.report_name = newV
    if (props.collection === 44) {
      body.value.collection_name = 'cReports44'
      report.value = await $fetch(`/api/reports44/${newV}`)
    }
    if (props.collection === 223) {
      body.value.collection_name = 'cReports223'
      report.value = await $fetch(`/api/reports223/${newV}`)
    }
    if (props.collection === 615) {
      body.value.collection_name = 'cReports615'
      report.value = await $fetch(`/api/reports615/${newV}`)
    }
  },
)
watch(
  () => checkedFields.value,
  async (newV, oldV) => {
    body.value.fields = newV
  },
)
watch(
  () => response.value,
  async (newV, oldV) => {
    link.value = URL.createObjectURL(response.value)
  },
)

watch(
  () => date.value,
  async (newV, oldV) => {
    body.value.date.start = newV
  },
)

onMounted(async () => {
  if (props.collection === 44) {
    body.value.collection_name = 'cReports44'
    report.value = await $fetch(`/api/reports44/${props.name}`)
  }
  if (props.collection === 223) {
    body.value.collection_name = 'cReports223'
    report.value = await $fetch(`/api/reports223/${props.name}`)
  }
  if (props.collection === 615) {
    body.value.collection_name = 'cReports615'
    report.value = await $fetch(`/api/reports615/${props.name}`)
  }
})
</script>

<template>
  <div
    ref="wrapper" class="flex flex-col gap-4 mb-10 overflow-y-scroll
  "
  >
    <div ref="options" class="grid grid-cols-4 gap-6">
      <div v-for="field in report.fields" :key="field.name" class="flex flex-wrap items-center bg-dark8 px-4 py-2 rounded-8px">
        <input v-model="checkedFields" type="checkbox" :value="field.name" class="mr-3">
        <div class="flex flex-col  2xl:text-xl xl:text-base sm:text-sm of-scroll">
          <span>{{ field.description }}</span>
          <span>({{ field.name }}, {{ types[field.type] }})</span>
        </div>
      </div>
    </div>

    <div class="flex gap-6 items-center">
      <div>
        <input v-model="_date" type="date" class="px-3 py-2 rounded-8px bg-dark-1 text-white focus:(ring-0 ring-offset-0 border-transparent)">
      </div>
      <button v-if="report.fields" ref="generateButton" class="flex items-center bg-blue-500  text-xl px-3 py-2 rounded-8px" @click="generate">
        <span>Generate</span>
        <div v-if="isPending" class="ml-2 i-ion:load-c w-5 h-5 text-white animate-spin" />
      </button>
      <div v-if="response && !isPending" ref="downloadButton">
        <a :href="link" :download="`${props.name}.csv`" class="visited:text-indigo-600">
          <button class="bg-yel-500 hover:bg-yel-600 visited:bg-indigo-600 text-xl px-3 py-2 rounded-8px">
            Download
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
