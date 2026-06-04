import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Edge 浏览器补丁
const isEdge = /Edg/.test(navigator.userAgent)
if (isEdge) {
    console.log('检测到 Edge 浏览器，应用最小化补丁')
  
    const originalReplaceState = window.history.replaceState
    window.history.replaceState = function(...args) {
    // 如果页面正在最小化，拦截调用
    if (document.visibilityState === 'hidden') {
      console.log('Edge 补丁: history.replaceState 被调用，已拦截')
      return
    }
    return originalReplaceState.apply(this, args)
  }
}

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
