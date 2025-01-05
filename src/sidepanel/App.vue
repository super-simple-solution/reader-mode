<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { computed, reactive, watch } from 'vue'
import { FontFamilyList } from './const'

interface FormState {
  reader_mode: boolean
  center: boolean
  font_family: string
}

const form = reactive<FormState>({
  reader_mode: true,
  center: true,
  font_family: 'default',
})

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const readerModeLabel = computed(() => (form.reader_mode ? '关闭' : '开启'))

const updatePageStyles = () => {
  chrome.storage.sync.set({ style: toRaw(form) })
  chrome.runtime.sendMessage({
    action: 'updateStyles',
    newForm: form,
  })
}

watch(form, updatePageStyles, { deep: true })
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container">
      <div class="sidepanel">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="阅读模式">
            <el-checkbox v-model="form.reader_mode">{{ readerModeLabel }}</el-checkbox>
          </el-form-item>
          <el-form-item label="内容居中">
            <el-checkbox v-model="form.center">居中</el-checkbox>
          </el-form-item>
          <el-form-item label="字体类型">
            <el-select v-model="form.font_family" placeholder="请选择">
              <el-option v-for="item in FontFamilyList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-config-provider>
</template>
