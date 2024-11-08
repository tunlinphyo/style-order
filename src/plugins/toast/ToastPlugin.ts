import { type App, type Plugin } from 'vue'
import { init, Toast, Toasts } from './Toast'

const toastNode = init()

export const showToast = (text: string) => {
    return Toast(toastNode, text)
}

export const showToasts = (texts: string[], wait?: number) => {
    return Toasts(toastNode, texts, wait)
}

const ToastPlugin: Plugin = {
    install(app: App) {

        app.config.globalProperties.$showToast = showToast

        app.config.globalProperties.$showToasts = showToasts
    },
}

export default ToastPlugin