<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()

const showDetail = ref(true)
const drawerEl = ref(null)

const conversation = computed(() => store.getters['messages/currentConversation']);

const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const closeDrawer = () => {
  showDetail.value = false;
  setTimeout(() => { router.back(); }, 300)
}

const handleOverlayClick = () => { closeDrawer(); };

onMounted(() => { document.body.style.overflow = 'hidden' });

onUnmounted(() => { document.body.style.overflow = '' });
</script>

<template>
  <Teleport to="body">
    <div class="drawer-overlay" @click="handleOverlayClick">
      <div 
        class="drawer-container" 
        :class="{ show: showDetail }"
        @click.stop
        ref="drawerEl"
      >
        <div class="drawer-header">
          <button class="back-btn" @click="closeDrawer"><div class="down-arrow-icon"></div></button>
          <h2>{{ conversation?.name || '对话详情' }}</h2>
        </div>
        
        <div class="drawer-content">
          <div v-if="conversation && conversation.messages.length > 0" class="message-list">
            <div 
              v-for="msg in conversation.messages" 
              :key="msg.id"
              class="message-item"
              :class="msg.sender === 'assistant' ? 'assistant-msg' : 'merchant-msg'"
            >
              <div class="message-time">{{ formatTime(msg.time) }}</div>
              <div class="message-bubble">
                <div class="message-avatar">
                  <div v-if="msg.sender === 'assistant'" class="assistant-icon"></div>
                  <div v-else class="shop-icon"></div>
                </div>
                <div class="message-content">{{ msg.content }}</div>
              </div>
            </div>
          </div>
          <div v-else class="empty-detail"><p>暂无消息记录</p></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: flex-end;
}

.drawer-container {
  background-color: var(--bg-color);
  width: 100%;
  border-radius: 5px 5px 0 0;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  width: 100%;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--card-color);
  position: relative;
  border-radius: inherit;
}

h2 { font-size: 18px; }

.back-btn {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.down-arrow-icon {
  width: 18px;
  height: 18px;
  rotate: 90deg;
}

.drawer-content {
  flex: 1;
  padding: 20px 15px;
  overflow: auto;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.message-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-bubble {
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-content { 
  font-size: 14px;
  background-color: var(--card-color);
  border-radius: 5px;
  padding: 10px;
  box-shadow: var(--shadow-xs) var(--shadow-color);
  max-width: 70%;
}

.message-time {
  font-size: 10px;
  color: var(--sub-text);
  text-align: center;
}

.assistant-icon, .shop-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.empty-detail {
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--sub-text);
}

.empty-detail p { font-size: 14px; }
</style>