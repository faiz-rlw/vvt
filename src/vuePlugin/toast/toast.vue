<script setup lang="ts">
import { types, findTypesKey } from "./base";

let timer: NodeJS.Timeout;
const props = defineProps({
    type: {
        type: String,
        default: types.MESSAGE,
        validator(val: string) {
            return Object.values(types).includes(val);
        },
    },
    message: {
        type: String,
        default: types.MESSAGE,
    },
    duration: {
        type: Number,
        default: 300,
    },
});

const state = reactive({
    visible: false,
    top: 0,
});

const setVisible = (isVisible: boolean) => {
    return new Promise((resolve) => {
        state.visible = isVisible;
        timer = setTimeout(() => {
            resolve("");
            clearTimeout(timer);
        }, 300);
    });
};

defineExpose({
    setVisible,
    height: 40,
    margin: 20,
});

const type = computed(() => {
    return findTypesKey(props.type);
});
const styleClass = computed(() => ["r-toast", type.value]);
</script>

<template>
    <transition name="r-toast-fade">
        <div
            :class="styleClass"
            v-show="state.visible"
            :style="{
                top: state.top + 'px',
            }"
        >
            {{ props.message }}
        </div>
    </transition>
</template>
<style lang="less" scoped>
.r-toast {
    position: fixed;
    left: 50%;
    margin-left: -190px;
    min-width: 380px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
}
.SUCCESS {
    background-color: #f0f9eb;
    color: #529b2e;
}

.WARNING {
    background-color: #fdf6ec;
    color: #b88230;
}

.MESSAGE {
    background-color: #f4f4f5;
    color: #73767a;
}

.ERROR {
    background-color: #fef0f0;
    color: #c45656;
}

.r-toast-fade-enter-active {
    transition: all 0.3s ease-in;
}

.r-toast-fade-leave-active {
    transition: all 0.3s ease-out;
}

.r-toast-fade-enter-from,
.r-toast-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
