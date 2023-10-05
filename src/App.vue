<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useSystemStore } from "@/stores/useSystem";
const { useGlobalLoading } = toRefs(useSystemStore());
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view v-loadingType="useGlobalLoading" />
  </el-config-provider>
</template>
