<script setup>
import { inject, ref } from 'vue'
import Carousel from '../HomePage/Carousel.vue'
import RecentHot from '../HomePage/RecentHot.vue'
import RecentNew from '../HomePage/RecentNew.vue'
import SearchBar from '../SearchBar.vue'
import { formatImagePath } from '../../utils/imageHelper'

const recentHotRef = ref(null)
const recentNewRef = ref(null)

const scrollToElement = (elementRef) => {
  if (elementRef.value) {
    elementRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const toast = inject('toast')

const handleActivityClick = (item) => {
  if (item.name === '热门') { scrollToElement(recentHotRef) } 
  else if (item.name === '上新') { scrollToElement(recentNewRef) } 
  else if (item.name === '秒杀') { toast.show('活动暂未开启') } 
  else if (item.name === '礼品') { toast.show('活动暂未开启') }
}

const activities = ref([
  { id: 1, name: '热门', imgPath: formatImagePath('../../assets/icon/hot-product.svg') },
  { id: 2, name: '上新', imgPath: formatImagePath('../../assets/icon/new-product.svg') },
  { id: 3, name: '秒杀', imgPath: formatImagePath('../../assets/icon/seckill.svg') },
  { id: 4, name: '礼品', imgPath: formatImagePath('../../assets/icon/gift.svg') },
])
</script>

<template>
  <div class="home-page">
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
      <section><Carousel /></section>
      <section class="activity">
        <button 
          v-for="item in activities"
          :key="item.id"
          class="activity-item"
          @click="handleActivityClick(item)"
        >
          <img :src="item.imgPath" :alt="item.name">
          <span>{{ item.name }}</span>
        </button>
      </section>
      <section ref="recentHotRef"><RecentHot /></section>
      <section ref="recentNewRef"><RecentNew /></section>
    </main>

  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.title-container h1 { font-size: 18px; }

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
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity {
  display: flex;
  justify-content: space-around;
}

.activity-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
  font-weight: 500;
}

.activity img {
  width: 42px;
  height: 42px;
}
</style>