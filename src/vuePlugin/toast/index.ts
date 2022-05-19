import * as dto from "./dto";
import { types } from "./base";
import toastComponent from "./toast.vue";
import { App, createApp } from "vue";

let timer:any = null;

const toast: dto.toast = (options: dto.options) => {
    const toastApp = createApp(toastComponent, options);
    showToast(toastApp, options.duration);
};

Object.values(types).forEach((item) => {
    toast[item] = (options: dto.options) => {
        options.type = item;
        return toast(options);
    };
});

function showToast(app: any, duration: number) {
    const tFrag = document.createDocumentFragment();
    const vm: any = app.mount(tFrag);
    document.body.appendChild(tFrag);
    vm.setVisible(true);
    hideToast(app, vm, duration);
}

function hideToast(app: App<Element>, vm: any, duration: number) {
    timer = setTimeout(async () => {
        await vm.setVisible(false);
        app.unmount();
        clearTimeout(timer);
        timer = null;
    }, duration || 3000);
}

export default toast;
