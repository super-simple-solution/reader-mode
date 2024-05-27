<script lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
  setup() {
    return {
      zhCn,
    }
  },
})
const tabPosition = ref(0)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="container">
      <div class="sider-bar">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="User">User</el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-config-provider>
</template>
