<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { reactive, toRaw, watch } from 'vue'
import { FontFamilyList } from './const'

const form = reactive({
  reader_mode: true,
  center: true,
  font_family: 'default',
})

// const updateStyles = () => {
//   chrome.storage.sync.set({ style: toRaw(form) })
// }

watch(
  form,
  (newForm) => {
    // updateStyles()
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          greeting: 'update-reader-mode',
          focusConfig: newForm,
        })
      }
    })
  },
  { deep: true },
)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container">
      <div class="sider-bar">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="阅读模式">
            <el-checkbox v-model="form.reader_mode">{{ form.reader_mode ? '关闭' : '开启' }}</el-checkbox>
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
