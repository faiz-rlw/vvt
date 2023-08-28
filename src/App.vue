<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Loader>
      <router-view />
    </Loader>
  </el-config-provider>
</template>
