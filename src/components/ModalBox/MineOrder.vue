<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()

const orders = computed(() => store.getters['orders/allOrders'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const goBack = () => { router.back() }

onMounted(() => { store.dispatch('orders/initOrders') })
</script>

<template>
  <div class="orders-page">
    
    <header>
      <button class="back-btn" @click="goBack"><div class="down-arrow-icon"></div></button>
      <h1>我的订单</h1>
      <button class="filter-btn"><div class="filter-icon"></div></button>
    </header>

    <div v-if="orders.length === 0" class="empty-orders">
      <p>暂无订单记录</p>
      <button @click="router.push('/classify')">去逛逛</button>
    </div>

    <div v-else class="orders-list">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="order-card"
      >
        <div class="order-header">
          <span class="order-date">{{ formatDate(order.createTime) }}</span>
          <span class="order-status">已完成</span>
        </div>
        
        <div class="order-items">
          <div 
            v-for="(item, idx) in order.items" 
            :key="idx"
            class="order-item"
          >
            <img :src="formatImagePath(item.imgPath)" :alt="item.title" class="item-img">
            <div class="item-info">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-price-container">
                <span class="item-price">¥{{ item.price }}</span>
                <span class="item-quantity">× {{ item.quantity }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-footer">
          <div class="order-total">
            共 <span class="total-count">{{ order.items.reduce((sum, i) => sum + i.quantity, 0) }}</span> 件商品
            合计：<span class="total-amount">¥{{ order.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.down-arrow-icon, .filter-icon {
  width: 20px;
  height: 20px;
}

.down-arrow-icon { rotate: 90deg; }

h1 { font-size: 18px; }

.empty-orders {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.empty-orders p {
  font-size: 16px;
  color: var(--sub-text);
  margin-bottom: 10px;
}

.empty-orders button {
  font-size: 14px;
  color: var(--indicator-color);
}

.orders-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-card {
  background-color: var(--card-color);
  border-radius: 5px;
  padding: 12px;
  box-shadow: var(--shadow-sm) var(--shadow-color);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--btn-border);
  font-size: 12px;
}

.order-date { color: var(--sub-text); }

.order-status { color: var(--success-color); }

.order-items { padding: 10px 0; }

.order-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
}

.item-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 14px;
  font-weight: 500;
  color: var(--key-color);
}

.item-quantity {
  font-size: 12px;
  color: var(--sub-text);
}

.order-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid var(--btn-border);
}

.order-total {
  font-size: 14px;
  color: var(--sub-text);
}

.total-count {
  font-weight: 600;
  color: var(--text-color);
  margin: 0 3px;
}

.total-amount {
  font-size: 16px;
  font-weight: bold;
  color: var(--key-color);
}
</style>