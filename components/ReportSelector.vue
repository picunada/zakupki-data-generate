<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import type { IReportInfo } from '@/models/reports.models'

const props = defineProps<{
  reports: IReportInfo[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedReport = ref<string>(props.reports[0].name)
const query = ref<string>('')

const filteredReports = computed(() =>
  query.value === ''
    ? props.reports
    : props.reports.filter(report =>
      report.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, '')),
    ),
)

watch(() => selectedReport.value,
  async (newV, oldV) => {
    emit('update:modelValue', newV)
  },
)

onMounted(() => emit('update:modelValue', selectedReport.value))
</script>

<template>
  <div class="w-70">
    <Combobox v-model="selectedReport">
      <div class="relative  mt-1">
        <div
          class="relative w-full  cursor-default overflow-hidden rounded-lg bg-dark-1 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue sm:text-sm"
        >
          <ComboboxInput
            class="w-full bg-dark-1 border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0"

            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <div
              class="h-5 w-5 text-white i-ion:chevron-down"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark-1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm shadow-xl"
          >
            <div
              v-if="filteredReports.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-white"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="report in filteredReports"
              :key="report.name"
              v-slot="{ selected, active }"
              as="template"
              :value="report.name"
              :disabled="!report.active"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-blue-500 text-white': active,
                  'text-white': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected, 'text-grey-400': !report.active }"
                >
                  {{ report.title }}
                </span>
                <div
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-1.5"
                  :class="{ 'text-white': active, 'text-blue-500': !active }"
                >
                  <div class="i-ion:checkmark-sharp h-6 w-6" />
                </div>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
