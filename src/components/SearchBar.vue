<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const searchKeyword = ref(store.getters['search/keyword'] || '')

const updateKeyword = (value) => { store.commit('search/SET_KEYWORD', value) }

const performSearch = async () => {
  if (!searchKeyword.value.trim()) return
  
  await store.dispatch('search/performSearch', searchKeyword.value)
  router.push({
    path: '/search',
    query: { keyword: searchKeyword.value }
  })
}

const handleKeyup = (e) => { if (e.key === 'Enter') { performSearch() } }

// 如果在搜索结果页，监听路由参数变化
if (route.path === '/search') {
  watch(() => route.query.keyword, (newKeyword) => {
    if (newKeyword && newKeyword !== searchKeyword.value) {
      searchKeyword.value = newKeyword
      store.dispatch('search/performSearch', newKeyword)
    }
  })
}
</script>

<template>
  <div class="search-container">
    <label for="search" @click="performSearch">
      <div class="search-icon"></div>
    </label>
    <input 
      type="text" 
      id="search" 
      v-model="searchKeyword"
      @input="updateKeyword(searchKeyword)"
      @keyup="handleKeyup"
      :placeholder="route.path === '/search' ? '搜索商品...' : '请输入商品名'"
    >
  </div>    
</template>

<style scoped>
.search-container { position: relative; }

.search-container label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
}

.search-icon {
  width: 16px;
  height: 16px;
}

#search {
  border: 1px solid var(--border-color);
  padding: 2px 5px 2px 22px;
  border-radius: 5px;
  width: 150px;
  transition: var(--duration-def);
  outline: none;
  font-size: 14px;
}

#search:focus {
  outline-color: var(--indicator-color);
  border-width: 2px;
  border-color: var(--indicator-color);
  width: 210px;
}
</style>