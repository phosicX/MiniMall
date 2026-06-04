<script setup>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userName = computed(() => store.getters['auth/userName'])

const cartCount = computed(() => store.getters['cart/cartCount'])

const toast = inject('toast')

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  router.replace('/home')
  toast.show('退出登录成功')
}
</script>

<template>
	<div class="mine-page">

    <header>
        <h1>我的</h1>
        <div class="console-container">
            <button class="service-btn"><div class="service-icon"></div></button>
            <button class="setting-btn"><div class="setting-icon"></div></button>
        </div>
    </header>

    <main>
        <div class="user-info">
            <img src="../../assets/icon/user-avatar.svg" alt="" class="user-avatar">
            <strong class="user-name">{{ userName || '未登录' }}</strong>
        </div>
        <div class="product-operate">
          <button @click="router.push('/orders')">
            <div class="product-operate-icon my-order"></div>
            <span>订单</span>
          </button>
          <router-link to="/cart">
            <button>
              <div class="product-operate-icon pending-payment"></div>
              <span>待付款</span>
              <div class="cart-count" v-if="cartCount">{{ cartCount }}</div>
            </button>
          </router-link>
          <button><div class="product-operate-icon to-be-harvested"></div><span>待收货</span></button>
          <button><div class="product-operate-icon return-exchage"></div><span>退换</span></button>
        </div>
        <div class="user-operate">
            <button><div class="user-operate-icon personal-info"></div>个人信息</button>
            <button @click="handleLogout"><div class="logout-icon"></div>退出登录</button>
        </div>
    </main>

	</div>
</template>

<style scoped>
h1 { font-size: 18px;}

.console-container {
  display: flex;
  gap: 10px;
}

.service-icon, .setting-icon {
  width: 24px;
  height: 24px;
}

.setting-icon { background-image: url('../../assets/icon/setting.svg');}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info {
  display: grid;
  place-items: center;
  width: 100%;
  gap: 5px;
  padding: 50px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #d4e1f1 100%);
}

.user-avatar {
  width: 128px;
  height: 128px;
}

.user-name { font-size: 32px;}

.product-operate {
  display: flex;
  justify-content: space-around;
}

.product-operate button {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  gap: 3px;
  position: relative;
}

.product-operate-icon {
  width: 36px;
  height: 36px;
}

.my-order { background-image: url('../../assets/icon/my-order.svg'); }
.pending-payment { background-image: url('../../assets/icon/pending-payment.svg'); }
.to-be-harvested { background-image: url('../../assets/icon/to-be-harvested.svg'); }
.return-exchage { background-image: url('../../assets/icon/return-exchange.svg'); }

.cart-count {
  color: white;
  background-color: var(--key-color);
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  font-size: 13px;
}

.user-operate {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-operate button {
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: var(--card-color);
  box-shadow: var(--shadow-xs) var(--shadow-color);
}

.user-operate-icon, .logout-icon {
  width: 24px;
  height: 24px;
}

.personal-info { background-image: url('../../assets/icon/personal-info.svg');}
</style>