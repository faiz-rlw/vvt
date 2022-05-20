<script setup lang="ts">
import toast from "~/vuePlugin/toast/index";
</script>

<template>
    <div class="">
        <a-button
            @click="
                toast({
                    message: 'success!!!',
                })
            "
            >success</a-button
        >
        <a-button
            @click="
                toast.warning({
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
