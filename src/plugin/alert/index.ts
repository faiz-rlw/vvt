import * as dto from "./dto";
import { types } from "./base";
import alertComponent from "./alert.vue";
import { App, createApp, Ref, ref } from "vue";

let zIndex: number = 1000;
const alert: dto.alert = (options: dto.options | string) => {
    let optionsData = getOptions(options);
    let data = {
        ...(optionsData as dto.options),
        zIndex: zIndex++,
    };
    const toastApp = createApp(alertComponent, data);
    showToast(toastApp, (optionsData as dto.options).duration || 3000);
};

Object.values(types).forEach((item) => {
    alert[item] = (options: dto.options) => {
        let optionsData = getOptions(options);
        (optionsData as dto.options).type = item;
        return alert(optionsData);
    };
});

let alertArr: Ref<Array<dto.alertArr>> = ref([]);
function showToast(app: App<DocumentFragment | Element>, duration: number) {
    const tFrag = document.createDocumentFragment();
    const vm: any = app.mount(tFrag);
    document.body.appendChild(tFrag);
    alertArr.value.push(vm);
    setVmTop(vm);
    vm.setVisible(true);
    watch(alertArr, () => setVmTop(vm));
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
            alertArr.value = alertArr.value.filter((item) => item !== vm);
        });
    }, duration);
}

function setVmTop(vm: any) {
    const { height, margin, setTop } = vm;
    const findCurrenIndex = alertArr.value.findIndex((item) => item === vm);
    let top = findCurrenIndex * (height + margin);
    setTop(top);
}

function getOptions(val: unknown) {
    if (Object.prototype.toString.call(val) == "[object String]") {
        return {
            message: val,
        };
    } else {
        return val;
    }
}

export default alert;
