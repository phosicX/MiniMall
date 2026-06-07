const state = {
  items: [],
  selectedItems: []
}

const mutations = {
  SET_CART(state, cart) {
    state.items = [...cart]
    localStorage.setItem(`cart_${state.userId || 'guest'}`, JSON.stringify(state.items))
    state.selectedItems = []
  },
  ADD_TO_CART(state, product) {
    const existing = state.items.find(item => item.id === product.id)
    if (existing) { 
      existing.quantity++ 
      state.items = [...state.items]
    } else {
      state.items = [...state.items, {
        ...product,
        quantity: 1
      }]
      state.selectedItems = [...state.selectedItems, product.id]
    }
    const userId = state.userId || 'guest'
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items))
  },
  REMOVE_FROM_CART(state, productId) {
    state.items = state.items.filter(item => item.id !== productId)
    state.selectedItems = state.selectedItems.filter(id => id !== productId)
    const userId = state.userId || 'guest'
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items))
  },
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.items.find(item => item.id === productId)
    if (item && quantity > 0) { 
      item.quantity = quantity
      state.items = [...state.items]
      if (!state.selectedItems.includes(productId)) {
        state.selectedItems = [...state.selectedItems, productId]
      }
    } else if (item && quantity <= 0) { 
      state.items = state.items.filter(item => item.id !== productId)
      state.selectedItems = state.selectedItems.filter(id => id !== productId)
    }
    const userId = state.userId || 'guest'
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items))
  },
  CLEAR_CART(state) {
    state.items = []
    state.selectedItems = []
    const userId = state.userId || 'guest'
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items))
  },
  SET_USER_ID(state, userId) {
    state.userId = userId
    const savedCart = localStorage.getItem(`cart_${userId || 'guest'}`)
    state.items = savedCart ? JSON.parse(savedCart) : []
    state.selectedItems = []
  },
  TOGGLE_SELECT_ITEM(state, productId) {
    const index = state.selectedItems.indexOf(productId)
    if (index > -1) {
      state.selectedItems = state.selectedItems.filter(id => id !== productId)
    } else {
      state.selectedItems = [...state.selectedItems, productId]
    }
  },
  SELECT_ALL(state, isSelected) {
    if (isSelected) {
      state.selectedItems = [...state.items.map(item => item.id)]
    } else {
      state.selectedItems = []
    }
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
    return { success: true, message: '已添加到购物车' }
  },
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId)
    return { success: true }
  },
  updateQuantity({ commit }, { productId, quantity }) {
    commit('UPDATE_QUANTITY', { productId, quantity })
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
  },
  initCart({ commit, rootState }) {
    const userId = rootState.auth?.user?.id || 'guest'
    commit('SET_USER_ID', userId)
  },
  toggleSelectItem({ commit }, productId) {
    commit('TOGGLE_SELECT_ITEM', productId)
  },
  selectAll({ commit }, isSelected) {
    commit('SELECT_ALL', isSelected)
  },
  checkout({ commit, state, rootState, dispatch }) {
    const selectedItemsList = state.items.filter(item => state.selectedItems.includes(item.id))
    
    if (selectedItemsList.length === 0) {
      return { success: false, message: '请选择要结算的商品' }
    }
    
    const total = selectedItemsList.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    // 创建订单
    dispatch('orders/createOrder', {
      items: selectedItemsList,
      total: total
    }, { root: true })
    
    selectedItemsList.forEach(item => {
      dispatch('messages/sendOrderMessage', {
        shopName: item.shop,
        productTitle: item.title,
        orderId: Date.now()
      }, { root: true })
    })
    
    const remainingItems = state.items.filter(item => !state.selectedItems.includes(item.id))
    commit('SET_CART', remainingItems)
    
    return { success: true, total, message: '购买成功' }
  }
}

const getters = {
  cartItems: state => state.items,
  cartTotal: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  cartCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
  isCartEmpty: state => state.items.length === 0,
  selectedItems: state => state.selectedItems,
  selectedTotal: (state, getters) => {
    return state.items
      .filter(item => state.selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  isAllSelected: (state, getters) => {
    return state.items.length > 0 && state.selectedItems.length === state.items.length
  },
  hasSelected: state => state.selectedItems.length > 0,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}