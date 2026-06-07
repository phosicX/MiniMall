// store/modules/messages.js
const state = {
  conversations: [],
  currentConversation: null,
  conversationsLoaded: false
}

const generateId = () => Date.now() + '-' + Math.random().toString(36).substr(2, 9)

const getStorageKey = (userId) => `messages_${userId || 'guest'}`

const loadMessagesFromStorage = (userId) => {
  const key = getStorageKey(userId)
  const saved = localStorage.getItem(key)
  if (saved) {
    try { return JSON.parse(saved) } 
    catch (e) { return [] }
  }
  return []
}

const saveMessagesToStorage = (userId, conversations) => {
  const key = getStorageKey(userId)
  localStorage.setItem(key, JSON.stringify(conversations))
}

const getRandomWelcomeMessage = () => {
  const messages = [
    '欢迎回来！今日有新品上架，快来看看吧~',
    '欢迎回来！限时折扣正在进行中，不要错过哦！',
    '欢迎回来！为你推荐了几款好物~',
    '欢迎回来！最近有什么想买的吗？',
    '欢迎回来！祝您购物愉快~'
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

const mutations = {
  SET_CONVERSATIONS(state, { conversations, userId }) {
    state.conversations = conversations
    state.conversationsLoaded = true
    if (userId) { saveMessagesToStorage(userId, conversations) }
  },
  
  ADD_MESSAGE(state, { conversationId, message, userId }) {
    const conversation = state.conversations.find(c => c.id === conversationId)
    if (conversation) {
      conversation.messages.push(message)
      conversation.lastMessage = message.content
      conversation.lastTime = message.time
      if (!message.isRead) { conversation.unreadCount = (conversation.unreadCount || 0) + 1 }
      conversation.updatedAt = message.time
    }
    if (userId) { saveMessagesToStorage(userId, state.conversations) }
  },
  
  // 创建新会话
  CREATE_CONVERSATION(state, { conversation, userId }) {
    state.conversations.unshift(conversation)
    if (userId) { saveMessagesToStorage(userId, state.conversations) }
  },
  
  // 标记会话为已读
  MARK_CONVERSATION_READ(state, { conversationId, userId }) {
    const conversation = state.conversations.find(c => c.id === conversationId)
    if (conversation) {
      conversation.unreadCount = 0
      // 标记所有消息为已读
      if (conversation.messages) {
        conversation.messages.forEach(msg => { msg.isRead = true })
      }
    }
    if (userId) { saveMessagesToStorage(userId, state.conversations) }
  },
  
  // 标记所有会话为已读
  MARK_ALL_READ(state, { userId }) {
    state.conversations.forEach(conversation => {
      conversation.unreadCount = 0
      if (conversation.messages) {
        conversation.messages.forEach(msg => { msg.isRead = true })
      }
    })
    if (userId) { saveMessagesToStorage(userId, state.conversations) }
  },
  
  SET_CURRENT_CONVERSATION(state, conversation) { state.currentConversation = conversation },
  
  // 清除当前用户数据
  CLEAR_USER_MESSAGES(state) {
    state.conversations = []
    state.currentConversation = null
    state.conversationsLoaded = false
  }
}

const actions = {
  // 初始化消息（用户登录时调用）
  initMessages({ commit, state, rootState }) {
    const userId = rootState.auth?.user?.id || 'guest'
    const savedConversations = loadMessagesFromStorage(userId)
    
    if (savedConversations.length > 0) {
      commit('SET_CONVERSATIONS', { conversations: savedConversations, userId })
      
      const welcomeMessage = {
        id: generateId(),
        sender: 'assistant',
        senderName: '商城小助手',
        content: getRandomWelcomeMessage(),
        time: new Date().toISOString(),
        isRead: false
      }
      
      // 查找或创建助手会话
      let assistantConv = state.conversations.find(c => c.id === 'assistant')
      if (assistantConv) {
        commit('ADD_MESSAGE', { conversationId: 'assistant', message: welcomeMessage, userId })
      } else {
        // 如果没有助手会话，创建一个
        const newAssistantConv = {
          id: 'assistant',
          type: 'assistant',
          name: '商城小助手',
          avatar: 'assistant',
          unreadCount: 1,
          messages: [welcomeMessage],
          lastMessage: welcomeMessage.content,
          lastTime: welcomeMessage.time,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        commit('CREATE_CONVERSATION', { conversation: newAssistantConv, userId })
      }
    } else {
      // 新用户，创建默认的助手会话（包含欢迎消息）
      const assistantConversation = {
        id: 'assistant',
        type: 'assistant',
        name: '商城小助手',
        avatar: 'assistant',
        unreadCount: 1,
        messages: [
          {
            id: generateId(),
            sender: 'assistant',
            senderName: '商城小助手',
            content: getRandomWelcomeMessage(),
            time: new Date().toISOString(),
            isRead: false
          }
        ],
        lastMessage: '欢迎回来，来看看有什么需要的吧~',
        lastTime: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      commit('CREATE_CONVERSATION', { conversation: assistantConversation, userId })
    }
  },
  
  // 发送订单消息（下单时调用）
  sendOrderMessage({ commit, rootState }, { shopName, productTitle, orderId }) {
    const userId = rootState.auth?.user?.id || 'guest'
    const conversationId = `shop_${shopName}`
    
    // 检查是否已有该商家的会话
    const existingConversation = state.conversations.find(c => c.id === conversationId)
    
    const message = {
      id: generateId(),
      sender: 'merchant',
      senderName: shopName,
      content: `${productTitle} 下单成功，请注意查收商品`,
      time: new Date().toISOString(),
      isRead: false
    }
    
    if (existingConversation) { commit('ADD_MESSAGE', { conversationId, message, userId }) }
    else {
      // 创建新的商家会话
      const newConversation = {
        id: conversationId,
        type: 'merchant',
        name: shopName,
        avatar: 'shop',
        unreadCount: 1,
        messages: [message],
        lastMessage: message.content,
        lastTime: message.time,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      commit('CREATE_CONVERSATION', { conversation: newConversation, userId })
    }
  },
  
  // 发送自定义助手消息
  sendAssistantMessage({ commit, rootState }, content) {
    const userId = rootState.auth?.user?.id || 'guest'
    const conversationId = 'assistant'
    
    const message = {
      id: generateId(),
      sender: 'assistant',
      senderName: '商城小助手',
      content: content,
      time: new Date().toISOString(),
      isRead: false
    }
    
    commit('ADD_MESSAGE', { conversationId, message, userId })
  },
  
  // 标记会话为已读
  markConversationRead({ commit, rootState }, conversationId) {
    const userId = rootState.auth?.user?.id || 'guest'
    commit('MARK_CONVERSATION_READ', { conversationId, userId })
  },
  
  // 标记所有为已读
  markAllRead({ commit, rootState }) {
    const userId = rootState.auth?.user?.id || 'guest'
    commit('MARK_ALL_READ', { userId })
  },
  
  // 设置当前会话
  setCurrentConversation({ commit }, conversation) { commit('SET_CURRENT_CONVERSATION', conversation) },
  
  // 清除用户消息（登出时）
  clearUserMessages({ commit }) { commit('CLEAR_USER_MESSAGES') }
}

const getters = {
  // 获取所有会话
  conversations: state => state.conversations,
  
  // 获取未读消息总数
  totalUnreadCount: state => { return state.conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0) },
  
  // 获取当前会话
  currentConversation: state => state.currentConversation,
  
  // 会话是否已加载
  isLoaded: state => state.conversationsLoaded
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}