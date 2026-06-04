// store/modules/orders.js
const state = {
  orders: []
}

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
    const userId = state.userId || 'guest'
    localStorage.setItem(`orders_${userId}`, JSON.stringify(orders))
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
    const userId = state.userId || 'guest'
    localStorage.setItem(`orders_${userId}`, JSON.stringify(state.orders))
  },
  SET_USER_ID(state, userId) {
    state.userId = userId
    const savedOrders = localStorage.getItem(`orders_${userId || 'guest'}`)
    state.orders = savedOrders ? JSON.parse(savedOrders) : []
  },
  CLEAR_ORDERS(state) { state.orders = [] }
}

const actions = {
  initOrders({ commit, rootState }) {
    const userId = rootState.auth?.user?.id || 'guest'
    commit('SET_USER_ID', userId)
  },
  
  // 创建订单（结算时调用）
  createOrder({ commit }, { items, total }) {
    const order = {
      id: Date.now(),
      orderNumber: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imgPath: item.imgPath,
        shop: item.shop
      })),
      totalAmount: total,
      createTime: new Date().toISOString()
    }
    commit('ADD_ORDER', order)
    return order
  },
  
  clearOrders({ commit }) { commit('CLEAR_ORDERS') }
}

const getters = {
  allOrders: state => state.orders,
  orderCount: state => state.orders.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}