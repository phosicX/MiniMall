<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselData = ref([
	{
		id: 1,
		imgUrl: new URL('../../assets/carousel/jimeng-2026-05-19-3329.webp', import.meta.url).href
	},
	{
		id: 2,
		imgUrl: new URL('../../assets/carousel/jimeng-2026-05-19-4610.webp', import.meta.url).href
	},
	{
		id: 3,
		imgUrl: new URL('../../assets/carousel/jimeng-2026-05-19-6785.webp', import.meta.url).href
	},
	{
		id: 4,
		imgUrl: new URL('../../assets/carousel/jimeng-2026-05-19-8631.webp', import.meta.url).href
	}
])

const currentIndex = ref(0); 
const isTransitioning = ref(false); 
let autoPlayInterval = null;

function prevCarousel() {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
        
  currentIndex.value = currentIndex.value === 0 
		? carouselData.value.length - 1 
		: currentIndex.value - 1;
        
  setTimeout(() => { isTransitioning.value = false;}, 300);
}

function nextCarousel() {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
        
  currentIndex.value = currentIndex.value === carouselData.value.length - 1 
    ? 0 
    : currentIndex.value + 1;
        
  setTimeout(() => { isTransitioning.value = false;}, 300);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => { nextCarousel();}, 5000); 
}

function stopAutoPlay() {
	if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

onMounted(() => { startAutoPlay();});
onUnmounted(() => { stopAutoPlay();});
</script>

<template>
  <div 
    class="carousel"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
		<ul 
			class="carousel-inner"
			:style="{ transform: `translateX(-${currentIndex * 100}%)` }"
		>
			<li 
				v-for="item in carouselData"
				:key="item.id"
				class="carousel-item"
			>
				<img :src="item.imgUrl" alt="carousel-img">
			</li>
		</ul>

		<button class="carousel-btn prev" @click="prevCarousel"><div class="down-arrow-icon prev"></div></button>
		<button class="carousel-btn next" @click="nextCarousel"><div class="down-arrow-icon next"></div></button>
  </div>
</template>

<style scoped>
.carousel {
  margin: 0 auto;
  aspect-ratio: 21 / 9;
  overflow: hidden;
  box-shadow: var(--shadow-sm) var(--shadow-color);
  position: relative;
}

.carousel-inner {
  width: 100%;
  height: 100%;
  display: flex;
  transition: var(--duration-def);
}

.carousel-item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  backdrop-filter: blur(15px);
  box-shadow: var(--shadow-sm) var(--shadow-color);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  color: white;
  display: grid;
  place-items: center;
}

.carousel-btn.prev { left: 10px;}
.carousel-btn.next { right: 10px;}

.down-arrow-icon {
  width: 16px;
  height: 16px;
  filter: invert(100%);
}

.down-arrow-icon.prev { rotate: 90deg; }
.down-arrow-icon.next { rotate: -90deg; }
</style>