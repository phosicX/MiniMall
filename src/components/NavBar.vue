<script setup>
const navItems = [
  { path: '/home', name: '首页', icon: 'home' },
  { path: '/classify', name: '分类', icon: 'classify' },
  { path: '/message', name: '消息', icon: 'message' },
  { path: '/cart', name: '购物车', icon: 'cart' },
  { path: '/mine', name: '我的', icon: 'mine' },
];
</script>

<template>
  <nav class="web-nav">
    <router-link
      v-for="(item, index) in navItems"
      :key="item.path"
      :to="item.path"
      class="web-nav-item"
      active-class="active"
    >
      <div class="nav-icon" :class="item.icon"></div>
      {{ item.name }}
    </router-link>
  </nav>
</template>

<style>
.web-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.web-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.web-nav-item.active { 
  /* indicator-color */
  filter: brightness(0) saturate(100%) invert(43%) sepia(34%) saturate(7002%) hue-rotate(202deg) brightness(99%) contrast(95%);
}

.web-nav-item.active .nav-icon { animation: slightBounce var(--duration-def); }

.nav-icon {
	width: 24px;
  height: 24px;
}

.home { background-image: url('../assets/icon/home.svg');}
.classify { background-image: url('../assets/icon/classify.svg');}
.message { background-image: url('../assets/icon/message.svg');}
.cart { background-image: url('../assets/icon/cart-add-fill.svg');}
.mine { background-image: url('../assets/icon/mine.svg');}
</style>