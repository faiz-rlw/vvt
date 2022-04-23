import { notification } from 'ant-design-vue/es/components';

function toast(msg: string):void {
    notification.success({
        message: "系统提示",
        description: msg,
        duration: 1
    });
}

toast.fail = (msg: string):void => {
    return notification.error({
        message: "系统提示",
        description: msg,
        duration: 1
    });
}

export default toast