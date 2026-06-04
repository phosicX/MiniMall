<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SearchBar from '../SearchBar.vue'
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()

const products = computed(() => store.state.products?.items || [])

const categories = computed(() => {
  const genreMap = {
    'Digital': '数码',
    'Mobilephone': '手机',
    'ComputerComponents': '电脑配件',
    'SportsOutdoor': '运动户外',
    'FoodBeverage': '食品饮料',
    'HomeAppliance': '家电'
  }

  const categoryList = []
  const genreSet = new Set()
  
  products.value.forEach(product => {
    if (!genreSet.has(product.genre)) {
      genreSet.add(product.genre)
      categoryList.push({
        id: product.genre,
        name: genreMap[product.genre] || product.genre,
        genre: product.genre
      })
    }
  })
  return categoryList
})

const productsByCategory = computed(() => {
  const grouped = {}
  categories.value.forEach(category => {
    grouped[category.genre] = products.value.filter(
      product => product.genre === category.genre
    )
  })
  return grouped
})

const categoryRefs = ref({})
const navRefs = ref({})

const showIndicator = ref(true)
const activeGenre = ref('')

const indicatorStyle = computed(() => {
  const activeNav = navRefs.value[activeGenre.value]
  if (!activeNav) return {}
  
  const rect = activeNav.getBoundingClientRect()
  const navContainer = document.querySelector('.classify-nav')
  const containerRect = navContainer?.getBoundingClientRect()
  
  if (!containerRect) return {}
  
  return {
    top: `${rect.top - containerRect.top}px`,
    height: `${rect.height}px`,
    display: 'block'
  }
})

const scrollToCategory = (genre) => {
  const element = categoryRefs.value[genre]
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }
}

const goToProductDetail = (product) => { router.push(`/product/${product.id}`)}

const observer = ref(null)

onMounted(() => {
  if (categories.value.length > 0) { activeGenre.value = categories.value[0].genre}
  
  observer.value = new IntersectionObserver((entries) => {
    const visibleCategories = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    
    if (visibleCategories.length > 0) {
      const firstVisible = visibleCategories[0].target
      const genre = Object.keys(categoryRefs.value).find(
        key => categoryRefs.value[key] === firstVisible
      )
      if (genre && genre !== activeGenre.value) { activeGenre.value = genre}
    }
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50% 0px'
  })

  Object.values(categoryRefs.value).forEach(el => { observer.value.observe(el)})
})

onUnmounted(() => { if (observer.value) { observer.value.disconnect()}})
</script>

<template>
  <div class="classify-page">

    <header>
      <div class="title-container">
        <div class="logo-icon"></div>
        <h1>商城</h1>
      </div>
      <SearchBar />
      <div class="locate-container">
        <span>福建</span>
        <div class="locate-icon"></div>
      </div>
    </header>

    <main>
      <nav class="classify-nav">
        <div
          v-for="category in categories"
          :key="category.id"
          :ref="el => navRefs[category.genre] = el"
          class="classify-nav-item"
          :class="{ active: activeGenre === category.genre }"
          @click="scrollToCategory(category.genre)"
        >
          {{ category.name }}
        </div>
        <div v-if="showIndicator" class="indicator" :style="indicatorStyle"></div>
      </nav>    
          
      <div class="products-list">
        <div
          v-for="category in categories"
          :key="category.id"
          :ref="el => categoryRefs[category.genre] = el"
          class="category-section"
        >
          <h2>{{ category.name }}</h2>
          <div class="product-grid">
            <div
              v-for="(product, index) in productsByCategory[category.genre]"
              :key="product.id"
              class="product-card"
              :style="`animation-delay: ${ Math.floor((index + 2) / 2) * 0.1 }s;`"
              @click="goToProductDetail(product)"
            >
              <div class="product-img"><img :src="formatImagePath(product.imgPath)" :alt="product.title"></div>
              <div class="product-info">
                <span class="product-title">{{ product.title }}</span>
                <span class="product-price">¥{{ product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </main>

  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.title-container h1 { font-size: 18px;}

.logo-icon {
  width: 20px;
  height: 20px;
}

.locate-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  font-weight: bolder;
  line-height: 20px;
}

.locate-icon {
  width: 20px;
  height: 20px;
}

main {
  display: flex;
  flex-direction: row;
}

.classify-nav {
  position: sticky;
  top: 0px;
  background-color: var(--bg-color);
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 6px;
  font-size: 16px;
  height: fit-content;
  text-align: center;
}

.classify-nav-item.active { color: var(--indicator-color);}

.indicator {
  position: absolute;
  left: 0%;
  width: 3px;
  background-color: var(--indicator-color);
  border-radius: 3px;
  transition: var(--duration-def);
}

h2 {
  font-size: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 2px;
  margin-bottom: 15px;
}

.products-list {
  padding: 20px 10px 20px 0;
  flex: 1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding-bottom: 30px;
}

.product-card { 
  box-shadow: var(--shadow-sm) var(--shadow-color);
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.product-img { aspect-ratio: 3 / 4;}

.product-card img {
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
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.product-price {
  text-align: right;
  color: var(--key-color);
}
</style>