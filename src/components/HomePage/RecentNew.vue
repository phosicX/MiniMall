<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()

const products = computed(() => store.getters['products/getNewProducts'])

const goToProductDetail = (product) => { router.push(`/product/${product.id}`) }
</script>

<template>
  <div class="recent-new">

    <h2>近期上新</h2>
    <ul>
      <li
        v-for="(item, index) in products"
        :key="item.id"
        class="recent-new-item"
        :style="`animation-delay: ${ Math.floor((index + 2) / 2) * 0.1 }s;`"
        @click="goToProductDetail(item)"
      >
        <div class="product-img"><img :src="formatImagePath(item.imgPath)" :alt="item.title"></div>
        <div class="product-info">
          <span class="product-title">{{ item.title }}</span>
          <span class="product-price">¥{{ item.price }}</span>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<style scoped>
h2 {
  font-size: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 5%;
  margin-bottom: 15px;
}

.recent-new ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 10px;
}

.recent-new-item { 
  box-shadow: var(--shadow-xs) var(--shadow-color);
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.product-img { aspect-ratio: 3 / 4;}

.recent-new-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
}

.product-title {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.product-price {
  text-align: right;
  color: var(--key-color);
}
</style>