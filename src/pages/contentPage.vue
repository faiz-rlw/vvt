<script setup lang="ts">
const { clientWidth } = storeToRefs(useSystemStore()); 
</script>

<template>
  <div>
    clientWidth: {{clientWidth}}
  </div>
</template>

<style lang="scss" scoped></style>
