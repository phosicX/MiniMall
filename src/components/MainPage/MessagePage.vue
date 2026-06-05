<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const conversations = computed(() => store.getters['messages/conversations'] || []);
const totalUnreadCount = computed(() => store.getters['messages/totalUnreadCount'] || 0);

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const date = new Date(timeStr);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 24 * 60 * 60 * 1000) { return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
  } else { return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }); }
};

const markAllRead = () => { store.dispatch('messages/markAllRead'); };

const openConversation = (conversation) => {
  if (!conversation) return;
  store.dispatch('messages/setCurrentConversation', conversation);
  store.dispatch('messages/markConversationRead', conversation.id);
  router.push(`/message/${conversation.id}`);
};

onMounted(() => { if (!store.getters['messages/isLoaded']) { store.dispatch('messages/initMessages'); }});
</script>

<template>
  <div class="message-page">
    <header>
      <h1>消息</h1>
      <button 
        class="all-read" 
        @click="markAllRead"
        :disabled="totalUnreadCount === 0"
      >
        一键已读
      </button>
    </header>

    <ul v-if="conversations && conversations.length > 0">
      <li 
        v-for="(conv, index) in conversations"
        :key="conv.id"
        class="message-item"
        :style="`animation-delay: ${ index * 0.1 }s;`"
        @click="openConversation(conv)"
      >
        <div v-if="conv.type === 'assistant'" class="assistant-icon"></div>
        <div v-else class="shop-icon"></div>

        <div class="message-info">
          <div class="message-header">
            <strong>{{ conv.name }}</strong>
            <span class="message-time">{{ formatTime(conv.lastTime) }}</span>
          </div>
          <p class="message-preview">{{ conv.lastMessage || '暂无消息' }}</p>
        </div>

        <div v-if="conv.unreadCount > 0" class="message-quantity">
          {{ conv.unreadCount > 99 ? '99+' : conv.unreadCount }}
        </div>
      </li>
    </ul>

    <div v-else class="empty-messages"><p>暂无消息</p></div>
  </div>
</template>

<style scoped>
h1 { font-size: 18px; }

ul { 
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.all-read {
  background-color: var(--btn-color);
  border: 1px solid var(--btn-border);
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 14px;
}

.all-read:disabled { 
  opacity: 0.5;
  cursor: not-allowed;
}

.message-item {
  background-color: var(--card-color);
  border: 1px solid var(--card-border);
  border-radius: 5px;
  padding: 12px;
  display: flex;
  gap: 12px;
  position: relative;
  opacity: 0;
  animation: fadeIn var(--duration-def) forwards;
}

.message-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-info strong { font-size: 16px; }

.message-time {
  font-size: 11px;
  color: var(--sub-text);
}

.message-preview { 
  font-size: 13px;
  color: var(--sub-text);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.message-quantity {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  text-align: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: white;
  background-color: var(--key-color);
}

.assistant-icon, .shop-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.empty-messages {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--sub-text);
}

.empty-messages p { font-size: 16px;}
</style>