<script setup lang="ts">
import { types, findTypesKey, iconSvg } from "./base";
let timer: NodeJS.Timeout;
const props = defineProps({
    type: {
        type: String,
        default: types.SUCCESS,
        validator(val: string) {
            return Object.values(types).includes(val);
        },
    },
    message: {
        type: String,
        default: types.SUCCESS,
    },
    zIndex: {
        type: Number,
        default: 1,
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

const setTop = (top: number) => {
    state.top = top + 20;
};

defineExpose({
    setVisible,
    setTop,
    height: 40,
    margin: 20,
});

const type = computed(() => {
    return findTypesKey(props.type);
});
const styleClass = computed(() => ["r-alert", type.value]);
const svgHtml = computed(() => iconSvg[ type.value as keyof typeof types]);
</script>

<template>
    <transition name="r-alert-fade">
        <div
            :class="styleClass"
            v-show="state.visible"
            :style="{
                top: state.top + 'px',
                zIndex: props.zIndex,
            }"
        >
            <div v-html="svgHtml" class="icon_area_style"></div>
            {{ props.message }}
        </div>
    </transition>
</template>
<style scoped>
.r-alert {
    position: fixed;
    left: 50%;
    padding: 0 10px;
    margin-left: -190px;
    display: flex;
    align-items: center;
    min-width: 380px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    transition: top 0.3 ease-out;
    box-sizing: border-box;
}

.icon_area_style{
    margin-right: 6px;
    display: flex;
    align-items: center;
}

.icon-style {
    width: 20px;
    height: 20px;
    background-color: red;
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

.r-alert-fade-enter-active {
    transition: all 0.3s ease-in;
}

.r-alert-fade-leave-active {
    transition: all 0.3s ease-out;
}

.r-alert-fade-enter-from,
.r-alert-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
