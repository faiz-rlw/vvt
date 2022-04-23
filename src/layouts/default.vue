<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
    <a-config-provider :locale="zhCN">
        <router-view />
    </a-config-provider>
</template>

<style lang="less" scoped>
</style>

<route lang="yaml">
meta:default
</route>