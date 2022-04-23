<script setup lang="ts">
import dayjs from 'dayjs';
import toast from '~/utils/util';
onMounted(() => {
    toast("123")
})
const { x, y } = useMouse()
let value5 = ref()
</script>

<template>
    <div class="container">
        <a-date-picker v-model:value="value5" picker="year" />
        <span class="bg-[#b2a8bb]">
            {{ x }} - {{ y }}

        {{ dayjs(new Date()).format('DD/MM/YYYY') }}
        </span>
    </div>
</template>

<style lang="less" scoped>
</style>

<route lang="yaml">
meta:default
</route>