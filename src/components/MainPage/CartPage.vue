<script setup>
import { computed, inject, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()

const cartItems = computed(() => store.getters['cart/cartItems'])
const selectedTotal = computed(() => store.getters['cart/selectedTotal'])
const isCartEmpty = computed(() => store.getters['cart/isCartEmpty'])
const selectedItems = computed(() => store.getters['cart/selectedItems'])
const hasSelected = computed(() => store.getters['cart/hasSelected'])

const isAllSelected = computed({
  get: () => store.getters['cart/isAllSelected'],
  set: (value) => { store.dispatch('cart/selectAll', value) }
})

const updateQuantity = (item, delta) => {
  const newQuantity = item.quantity + delta
  if (newQuantity >= 1) {
    store.dispatch('cart/updateQuantity', {
      productId: item.id,
      quantity: newQuantity
    })
  }
}

const removeItem = (productId) => { store.dispatch('cart/removeFromCart', productId) }

const toggleSelectItem = (productId) => { store.dispatch('cart/toggleSelectItem', productId) }

const toggleSelectAll = () => { store.dispatch('cart/selectAll', !isAllSelected.value) }

const toast = inject('toast')

const checkout = async () => {
  try {
    const result = await store.dispatch('cart/checkout')
    if (result && result.success) { toast.show('&check;<br>结算成功') } 
    else if (result && result.message) { toast.show('&check;<br>结算成功') }
  } catch (error) { toast.show('X<br>结算失败') }
}

onMounted(() => { store.dispatch('cart/initCart') })
</script>

<template>
  <div class="cart-page">

    <header>
      <h1>购物车</h1>
    </header>

    <ul v-if="!isCartEmpty">
      <li 
        v-for="(item, index) in cartItems"
        :key="item.id"
        :style="`animation-delay: ${ index * 0.1 }s;`"
        class="cart-item"
      >
        <div class="checkbox-wrapper">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              :checked="selectedItems.includes(item.id)"
              @change="toggleSelectItem(item.id)"
            />
            <span class="checkmark"></span>
          </label>
        </div>

        <img :src="formatImagePath(item.imgPath)" :alt="item.title" class="product-img">
        
        <div class="product-info">
          <div class="product-title">{{ item.title }}</div>
          <span>单价：</span><span class="product-price">¥{{ item.price }}</span>
        </div>
        
        <div class="purchase-quantity">
          <span>数量</span>
          <button @click="updateQuantity(item, -1)">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="updateQuantity(item, 1)">+</button>
        </div>
        
        <button class="delete-product" @click="removeItem(item.id)">
          <div class="delete-icon"></div>
        </button>
      </li>
    </ul>

    <div v-else class="empty-cart">
      <p>购物车空空如也~</p>
      <button @click="router.push('/classify')">去逛逛</button>
    </div>

    <div v-if="!isCartEmpty" class="cart-footer" >
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          :checked="isAllSelected"
          @change="toggleSelectAll"
        />
        <span class="checkmark"></span>
        <span>全选</span>
      </label>
      <div class="settlement-container">
        <div class="amount-unit">
          <span>合计：</span><span class="settlement-amount">￥{{ selectedTotal }}</span>
        </div>
        <button 
          @click="checkout" 
          :class="{ 'disabled': !hasSelected }"
          :disabled="!hasSelected"
        >
          结算
        </button>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.cart-page { 
  position: relative;
  height: 100%;
}

h1 { font-size: 18px; }

ul { 
  padding: 20px 12px;
  padding-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: var(--card-color);
  border: 1px solid var(--card-border);
  border-radius: 5px;
  padding: 10px;
  position: relative;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.checkbox-wrapper { margin: auto 0; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkmark {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: var(--bg-color);
  border: 2px solid var(--btn-border);
  border-radius: 5px;
  position: relative;
  transition: var(--duration-def);
}

.checkbox-label input:checked ~ .checkmark {
  background-color: var(--indicator-color);
  border-color: var(--indicator-color);
  border-radius: 5px;
}

.checkbox-label input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.product-img {
  width: 100%;
  height: 100%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: inherit;
}

.product-info {
  padding: 5px;
  font-size: 14px;
  flex: 1;
}

.product-info > * { padding-bottom: 5px; }

.product-title { 
  font-weight: 500;
  font-size: 16px;
}

.product-info span { font-size: 14px; }

.product-price, .settlement-amount { 
  font-weight: 500;
  color: var(--key-color);
}

.purchase-quantity {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  font-size: 14px;
}

.purchase-quantity button {
  width: 20px;
  height: 20px;
  font-size: 20px;
  display: grid;
  place-content: center;
  background-color: var(--btn-color);
  border: 1px solid var(--btn-border);
  border-radius: 5px;
}

.delete-product {
  position: absolute;
  top: 10px;
  right: 10px;
}

.delete-icon {
  width: 14px;
  height: 14px;
  background-image: url('../../assets/icon/delete.svg');
}

.cart-footer {
  position: fixed;
  bottom: 53px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-color);
}

.settlement-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.settlement-container button {
  font-size: 16px;
  background-color: var(--key-color);
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  transition: var(--duration-def);
}

.settlement-container button.disabled { 
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-cart {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.empty-cart p { 
  color: var(--sub-text);
  font-size: 16px; 
  margin-bottom: 10px;
}

.empty-cart button { 
  font-size: 14px;
  color: var(--indicator-color);
}
</style>