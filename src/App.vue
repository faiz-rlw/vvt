<script setup lang="ts">
import DevicePixelRatio from "./utils/evicePixelRatio";
onMounted(()=>{
    DevicePixelRatio.init();
})
</script>

<template>
    <router-view></router-view>
</template>
