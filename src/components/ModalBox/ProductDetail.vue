<script setup>
import { ref, onMounted, watch, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()
const route = useRoute()

const toast = inject('toast')

const product = ref(null)
const fromPage = ref('home') 

const loadProduct = (productId) => {
  const id = parseInt(productId)
  if (id && !isNaN(id)) {
    const foundProduct = store.getters['products/getProductById'](id)
    if (foundProduct) {
      product.value = {
        ...foundProduct,
        imgPath: formatImagePath(foundProduct.imgPath)
      }
    }
  }
}

const getProductIdFromUrl = () => {
  const idFromParam = route.params.id
  return idFromParam
}

const goBack = () => { router.back() }

onMounted(() => {
  fromPage.value = route.query.from || 'home'
  const productId = getProductIdFromUrl()
  if (productId) { loadProduct(productId) } 
  else { goBack() }
})

watch(() => route.params.id, (newId) => { if (newId) { loadProduct(newId) } })

const addToCart = () => {
  if (product.value) {
    store.dispatch('cart/addToCart', {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      imgPath: product.value.imgPath,
      genre: product.value.genre,
      shop: product.value.shop
    })
    toast.show('&check;<br>添加成功')
  }
}

const buyNow = () => {
  if (product.value) {
    store.dispatch('cart/addToCart', {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      imgPath: product.value.imgPath,
      genre: product.value.genre,
      shop: product.value.shop
    })
    router.push('/cart')
  }
}
</script>

<template>
  <div class="product-detail">

    <header>
      <button class="back-btn" @click="goBack"><div class="down-arrow-icon"></div></button>
      <div class="header-right">
        <button class="service-btn"><div class="service-icon"></div></button>
        <button class="share-btn"><div class="share-icon"></div></button>
      </div>
    </header>
    
    <div v-if="product" class="product-content">
      <div class="product-img"><img :src="formatImagePath(product.imgPath)" :alt="product.title"></div>

      <div class="product-info">
        <h2 class="product-title">{{ product.title }}</h2>
        <span class="product-price">￥{{ product.price }}</span>
      </div>

      <div class="product-shop">
        <div class="shop-icon"></div>
        <span>{{ product.shop }}</span>
      </div>

      <div class="product-operate">
        <div class="operate-left">
          <router-link to="/cart"><button class="to-cart"><div class="cart-icon"></div></button></router-link>
        </div>
        <div class="operate-right">
          <button class="add-to-cart" @click="addToCart">加入购物车</button>
          <button class="purchase-now" @click="buyNow">立即购买</button>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>商品不存在</p>
      <button @click="goBack">返回首页</button>
    </div>

  </div>
</template>

<style scoped>
.header-right {
  display: flex;
  gap: 10px;
}

.down-arrow-icon, .service-icon, .share-icon, .cart-icon {
  width: 20px;
  height: 20px;
}

.down-arrow-icon { rotate: 90deg; }

.share-icon { background-image: url('../../assets/icon/share.svg'); }
.cart-icon { background-image: url('../../assets/icon/cart.svg'); }

.product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px;
  background-color: var(--card-color);
  box-shadow: var(--shadow-sm) var(--shadow-color);
}

.product-title { font-size: 22px;}

.product-price {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  color: var(--key-color);
}

.product-img { aspect-ratio: 3 / 4; }

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-operate {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  max-width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operate-left {
  box-shadow: var(--shadow-sm) var(--shadow-color);
  border-radius: 0 5px 0 0;
}

.operate-right {
  box-shadow: var(--shadow-sm) var(--shadow-color);
  border-radius: 5px 0 0 0;
  overflow: hidden;
}

.product-operate button {
  padding: 10px 20px;
  color: white;
  font-size: 16px;
}

.add-to-cart { background-color: rgb(251, 133, 49);}
.purchase-now { background-color: var(--key-color);}

.not-found {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.not-found p { font-size: 16px;}

.not-found button {
  font-size: 14px;
  color: var(--indicator-color);
}

.product-shop {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  margin: 50px 12px 10px;
  padding: 10px;
  background-color: var(--card-color);
  border: 1px solid var(--card-border);
  border-radius: 5px;
}

.shop-icon {
  width: 30px;
  height: 30px;
}
</style>