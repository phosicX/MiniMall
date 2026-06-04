<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import SearchBar from '../SearchBar.vue'
import { formatImagePath } from '../../utils/imageHelper'

const store = useStore()
const router = useRouter()
const route = useRoute()

const results = computed(() => store.getters['search/results'])
const isSearching = computed(() => store.getters['search/isSearching'])
const keyword = computed(() => store.getters['search/keyword'])

const goToProductDetail = (product) => { router.push(`/product/${product.id}`) }

const performSearch = async (searchKeyword) => {
  if (searchKeyword && searchKeyword.trim()) {
    await store.dispatch('search/performSearch', searchKeyword)
  }
}

const VIEW_MODE_KEY = 'search_view_mode'
const isList = ref(true)

const toggleView = () => {
  isList.value = !isList.value
  localStorage.setItem(VIEW_MODE_KEY, isList.value)
}

const loadViewMode = () => {
  const savedMode = localStorage.getItem(VIEW_MODE_KEY)
  if (savedMode !== null) {
    isList.value = savedMode === 'true'
  }
}

watch(() => route.query.keyword, (newKeyword) => {
  if (newKeyword) { performSearch(newKeyword) }
}, { immediate: true })

onMounted(() => {
  const urlKeyword = route.query.keyword
  if (urlKeyword) { performSearch(urlKeyword) }
  loadViewMode()
})

</script>

<template>
  <div class="search-result">

    <header>
      <button class="back-btn" @click="router.back()"><div class="down-arrow-icon"></div></button>
      <SearchBar />
      <button class="view-btn" @click="toggleView"><div class="view-icon" :class="{ list: isList, grid: !isList }"></div></button>
    </header>

    <main>
      <div v-if="isSearching" class="loading-state">
        <div class="loading-spinner"></div>
        <p>搜索中...</p>
      </div>

      <div v-else-if="results.length > 0" class="results-container">
        <div class="result-info">找到 <strong>{{ results.length }}</strong> 件相关商品</div>
        
        <ul class="results-list" :class="{ list: isList, grid: !isList }">
          <li 
            v-for="(item, index) in results"
            :key="item.id"
            class="result-item"
            :class="{ list: isList, grid: !isList }"
            :style="isList 
              ? { animationDelay: `${index * 0.1}s` }
              : { animationDelay: `${Math.floor((index + 2) / 2) * 0.1}s` }"
            @click="goToProductDetail(item)"
          >
            <div class="product-img" :class="{ list: isList, grid: !isList }">
              <img :src="formatImagePath(item.imgPath)" :alt="item.title">
            </div>
            <div class="product-info" :class="{ list: isList, grid: !isList }">
              <div class="product-title" :class="{ list: isList, grid: !isList }">{{ item.title }}</div>
              <div class="product-price">¥{{ item.price }}</div>
            </div>
          </li>
        </ul>
      </div>

      <div v-else-if="keyword && !isSearching" class="empty-state">
        <div class="empty-icon"></div>
        <p>没有找到 "{{ keyword }}" 的相关商品</p>
        <button class="back-home-btn" @click="router.push('/home')">返回首页</button>
      </div>

      <div v-else class="initial-state"><p>输入关键词搜索商品</p></div>
    </main>

  </div>
</template>

<style scoped>
.search-result {
  min-height: 100%;
  background-color: var(--bg-color);
  position: relative;
}

.down-arrow-icon, .view-icon {
  width: 20px;
  height: 20px;
}

.down-arrow-icon { rotate: 90deg;}

.view-icon.list { background-image: url('../../assets/icon/list.svg'); }
.view-icon.grid { background-image: url('../../assets/icon/grid.svg'); }

main { padding: 12px; }

.result-info {
  padding-bottom: 5px;
  font-size: 14px;
  color: var(--sub-text);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 15px;
}

.result-info strong {
  color: var(--key-color);
  font-size: 16px;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-price {
  text-align: right;
  margin-top: auto;
  font-weight: bold;
  color: var(--key-color);
}

/* list视图 */
.results-list.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item.list {
  display: flex;
  gap: 10px;
  background-color: var(--card-color);
  border: 1px solid var(--card-border);
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.product-img.list {
  width: 90px;
  height: 120px;
}

.product-info.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.product-title { font-weight: 500; }


/* grid视图 */
.results-list.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.result-item.grid {
  box-shadow: var(--shadow-xs) var(--shadow-color);
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.product-img.grid { aspect-ratio: 3 / 4; }

.product-info.grid { 
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-title.grid {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.loading-state, .empty-state, .initial-state {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  color: var(--sub-text);
  font-size: 15px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 5px solid var(--border-color);
  border-top-color: var(--indicator-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.back-home-btn {
  margin-top: 20px;
  padding: 8px 20px;
  background-color: var(--indicator-color);
  color: white;
  border-radius: 5px;
  font-size: 14px;
}
</style>