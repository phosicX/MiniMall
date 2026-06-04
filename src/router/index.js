// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomePage from '../components/MainPage/HomePage.vue'
import ClassifyPage from '../components/MainPage/ClassifyPage.vue'
import MessagePage from '../components/MainPage/MessagePage.vue'
import CartPage from '../components/MainPage/CartPage.vue'
import MinePage from '../components/MainPage/MinePage.vue'
import LogIn from '../components/ModalBox/LogIn.vue'
import SignUp from '../components/ModalBox/SignUp.vue'
import ProductDetail from '../components/ModalBox/ProductDetail.vue'
import MessageDetail from '../components/ModalBox/MessageDetail.vue'
import SearchResult from '../components/ModalBox/SearchResult.vue'
import MineOrder from '../components/ModalBox/MineOrder.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomePage, meta: { requiresAuth: false } },
  { path: '/classify', name: 'classify', component: ClassifyPage, meta: { requiresAuth: false } },
  { path: '/message', name: 'message', component: MessagePage, meta: { requiresAuth: true } },
  { path: '/cart', name: 'cart', component: CartPage, meta: { requiresAuth: true } },
  { path: '/mine', name: 'mine', component: MinePage, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LogIn, meta: { guestOnly: true, noNav: true } },
  { path: '/signup', name: 'signup', component: SignUp, meta: { guestOnly: true, noNav: true } },
  { path: '/product/:id', name: 'productDetail', component: ProductDetail, meta: { requiresAuth: false, noNav: true } },
  { path: '/message/:id', name: 'messageDetail', component: MessageDetail, meta: { requiresAuth: true, noNav: true } },
  { path: '/search', name: 'searchResult', component: SearchResult, meta: { requiresAuth: false, noNav: true } },
  { path: '/orders', name: 'orders', component: MineOrder, meta: { requiresAuth: true, noNav: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!store.state.auth.isAuthenticated && store.state.auth.user === null) {
    store.dispatch('auth/initAuth')
  }
  
  const isAuthenticated = store.getters['auth/isAuthenticated']
  
  if (to.meta.requiresAuth && !isAuthenticated) { next('/login') } 
  else if (to.meta.guestOnly && isAuthenticated) { next('/mine') } 
  else { next() }
})

export default router