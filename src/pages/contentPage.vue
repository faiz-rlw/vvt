<script setup lang="ts">
const { clientWidth } = storeToRefs(useSystemStore()); 
</script>

<template>
  <div>
    clientWidth: {{clientWidth}}
    <div class="h-screen bg-red"></div>
    <div class="h-screen bg-blue"></div>
  </div>
</template>
