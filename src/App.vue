<script setup lang="ts">
import zhCn from "ant-design-vue/es/locale/zh_CN";
import { useSystemStore } from "@/stores/useSystem";
const { useGlobalLoading } = toRefs(useSystemStore());
</script>

<template>
  <a-config-provider :locale="zhCn">
    <router-view v-loadingType="useGlobalLoading" />
  </a-config-provider>
</template>
