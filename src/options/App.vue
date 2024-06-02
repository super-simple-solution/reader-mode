<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { FontFamilyList } from './const'
import { reactive, toRaw } from 'vue'
const form = reactive({
  center: true,
  fontFamily: 'default',
})

const updateStyles = () => {
  chrome.storage.sync.set({ style: toRaw(form) })
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container">
      <div class="sider-bar">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="内容居中">
            <el-checkbox v-model="form.center">居中</el-checkbox>
          </el-form-item>
          <el-form-item label="字体类型">
            <el-select v-model="form.fontFamily" placeholder="请选择" @change="updateStyles">
              <el-option v-for="item in FontFamilyList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-config-provider>
</template>
