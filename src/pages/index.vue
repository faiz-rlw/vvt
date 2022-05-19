<script setup lang="ts">
// import toast from "~/vuePlugin/toast/toast.vue";
import toast from "~/vuePlugin/toast/index";
</script>

<template>
    <div class="">
        <!-- <toast type="success"></toast> -->
        <a-button
            @click="
                toast({
                    type: 'success',
                    message: 'success',
                })
            "
            >success</a-button
        >
        <a-button
            @click="
                toast({
                    type: 'warning',
                    message: 'warning',
                })
            "
            >warning</a-button
        >
        <a-button
            @click="
                toast({
                    type: 'message',
                    message: 'message',
                })
            "
            >message</a-button
        >
        <a-button
            @click="
                toast({
                    type: 'error',
                    message: 'error',
                })
            "
            >error</a-button
        >
    </div>
</template>

<route lang="yaml">
{ meta: { layout: "default" } }
</route>
