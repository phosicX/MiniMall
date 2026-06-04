<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 1500
  }
})

const visible = ref(false)
let timer = null

watch(() => props.message, (newMsg) => { if (newMsg) { show() } })

const show = () => {
  if (timer) clearTimeout(timer)
  visible.value = true
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

defineExpose({ show })
</script>

<template>
  <Transition name="toast-fade">
    <div v-if="visible" class="toast-overlay">
      <div class="toast-message" v-html="message"></div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  pointer-events: none;
  z-index: 100;
}

.toast-message {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
  box-shadow: var(--shadow-md) var(--shadow-color);
}

.toast-fade-enter-active, .toast-fade-leave-active { transition: var(--duration-def); }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; }
</style>