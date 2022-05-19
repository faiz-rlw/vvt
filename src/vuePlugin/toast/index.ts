import * as dto from "./dto";
import { types } from "./base";
import toastComponent from "./toast.vue";
import { App, createApp, Ref, ref } from "vue";

let zIndex: number = 1000;
const toast: dto.toast = (options: dto.options) => {
    let data = {
        ...options,
        zIndex: zIndex++,
    };
    const toastApp = createApp(toastComponent, data);
    showToast(toastApp, options.duration);
};

Object.values(types).forEach((item) => {
    toast[item] = (options: dto.options) => {
        options.type = item;
        return toast(options);
    };
});

let toastArr: Ref<Array<dto.toastArr>> = ref([]);
function showToast(app: App<DocumentFragment | Element>, duration: number) {
    const tFrag = document.createDocumentFragment();
    const vm: any = app.mount(tFrag);
    document.body.appendChild(tFrag);
    toastArr.value.push(vm);
    setVmTop(vm);
    vm.setVisible(true);
    watch(toastArr, () => setVmTop(vm));
    hideToast(app, vm, duration);
}

function hideToast(
    app: App<DocumentFragment | Element>,
    vm: any,
    duration: number
) {
    vm.timer = setTimeout(() => {
        vm.setVisible(false).then(() => {
            app.unmount();
            clearTimeout(vm.timer);
            vm.timer = null;
            toastArr.value = toastArr.value.filter((item) => item !== vm);
        });
    }, duration || 3000);
}

function setVmTop(vm: any) {
    const { height, margin, setTop } = vm;
    const findCurrenIndex = toastArr.value.findIndex((item) => item === vm);
    let top = findCurrenIndex * (height + margin);
    setTop(top);
}

export default toast;
