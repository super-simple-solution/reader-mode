<template>
  <div class="min-h-screen bg-gray-100 p-2">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-semibold mb-4">阅读模式设置</h1>
      <div class="space-y-4">
        <!-- 阅读模式切换 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">阅读模式</label>
          <div class="mt-1">
            <Switch
              v-model="form.reader_mode"
              :class="form.reader_mode ? 'bg-blue-500' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="form.reader_mode ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </Switch>
            <span class="ml-3 text-sm text-gray-700">{{ form.reader_mode ? '开启' : '关闭' }}</span>
          </div>
        </div>

        <!-- 内容居中切换 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">内容居中</label>
          <div class="mt-1">
            <Switch
              v-model="form.content_center"
              :class="form.content_center ? 'bg-blue-500' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="form.content_center ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </Switch>
            <span class="ml-3 text-sm text-gray-700">{{ form.content_center ? '居中' : '取消居中' }}</span>
          </div>
        </div>

        <!-- 字体类型选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700">字体类型</label>
          <div class="mt-1">
            <Listbox v-model="form.font_family">
              <div class="relative">
                <ListboxButton
                  class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <span class="block truncate">{{ form.font_family }}</span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-for="font in FontFamilyList"
                      :key="font"
                      :value="font"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                          {{ font }}
                        </span>
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Switch } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { reactive, toRaw, watch } from 'vue'
import { FontFamilyList } from './const'

interface FormState {
  reader_mode: boolean
  content_center: boolean
  font_family: string
}

const form = reactive<FormState>({
  reader_mode: true,
  content_center: true,
  font_family: 'default',
})

const updatePageStyles = () => {
  const styleData = toRaw(form)
  chrome.storage.sync.set({ style: styleData })
  // chrome.runtime.sendMessage({
  //   greeting: 'update-style',
  //   data: styleData,
  // })
}

watch(form, updatePageStyles, { deep: true })
</script>

<style>
/* 你可以在这里添加自定义样式 */
</style>