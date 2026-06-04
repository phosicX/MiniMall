import { ref } from 'vue'

const showToast = ref(false)
const toastMessage = ref('')
let timer = null

export function useToast() {
  const show = (message, duration = 1500) => {
    if (timer) clearTimeout(timer)
    toastMessage.value = message
    showToast.value = true
    timer = setTimeout(() => {
      showToast.value = false
      toastMessage.value = ''
      timer = null
    }, duration)
  }

  const hide = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    showToast.value = false
    toastMessage.value = ''
  }

  return {
    showToast,
    toastMessage,
    show,
    hide
  }
}