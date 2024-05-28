<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'
const tabPosition = ref(0)
const checked = ref(true)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container">
      <div class="sider-bar">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="User">
            <el-checkbox v-model="checked">居中</el-checkbox>
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-config-provider>
</template>
