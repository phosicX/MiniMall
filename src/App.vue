<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Toast from './components/Toast.vue'
import { useToast } from './utils/useToast'
import { provide } from 'vue'

const store = useStore()
const route = useRoute()
const { showToast, toastMessage, show } = useToast()

const showNavBar = () => { return !route.meta?.noNav }

onMounted(() => { store.dispatch('cart/initCart') } )

provide('toast', { show })
</script>

<template>
  <div class="app-container">

    <div class="main-display">
      <router-view v-slot="{ Component }">
        <keep-alive :include="['HomePage', 'ClassifyPage']">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <footer v-if="showNavBar()"><NavBar /></footer>

    <Toast :message="toastMessage" :model-value="showToast" />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.main-display {
  padding-top: 45px;
  padding-bottom: 55px;
  height: 100vh;
  max-width: 450px;
  overflow: auto;
}

footer {
  position: fixed;
  height: 55px;
  bottom: 0;
  background-color: var(--nav-color);
  box-shadow: var(--shadow-sm) var(--shadow-color);
  backdrop-filter: blur(30px);
  width: 100%;
  padding: 5px 30px;
  max-width: 450px;
  z-index: 5;
}
</style>