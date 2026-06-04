// store/modules/auth.js
const state = {
  user: null,
  isAuthenticated: false
}

const mutations = {
  SET_USER(state, user) {
  	state.user = user
    state.isAuthenticated = !!user
    if (user) { localStorage.setItem('user', JSON.stringify(user))
    } else { localStorage.removeItem('user')}
  },
  CLEAR_USER(state) {
    state.user = null
    state.isAuthenticated = false
    localStorage.removeItem('user')
  },
  INIT_AUTH(state) {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      state.user = JSON.parse(savedUser)
      state.isAuthenticated = true
    }
  }
}

const actions = {
  login({ commit, dispatch }, { nickname, password }) { 
  	const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.nickname === nickname && u.password === password)
        
    if (user) {
      const { password, ...userWithoutPassword } = user
      commit('SET_USER', userWithoutPassword)
      dispatch('cart/initCart', null, { root: true })
      dispatch('messages/initMessages', null, { root: true })
      dispatch('orders/initOrders', null, { root: true })
      return { success: true, message: '登录成功' }
    } else { return { success: false, message: '用户名或密码错误' }}
  },
  
  signup({ commit, dispatch }, { nickname, password }) { 
    const users = JSON.parse(localStorage.getItem('users') || '[]')
        
    const userExists = users.some(u => u.nickname === nickname)
    if (userExists) { return { success: false, message: '用户名已存在' }} 
      const newUser = { nickname, password, id: Date.now() }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
        
      // 自动登录
      const { password: _, ...userWithoutPassword } = newUser
      commit('SET_USER', userWithoutPassword)
      dispatch('cart/initCart', null, { root: true })  
      dispatch('messages/initMessages', null, { root: true })
      dispatch('orders/initOrders', null, { root: true })
      return { success: true, message: '注册成功' }
  },
  
  logout({ commit, dispatch }) { 
    commit('CLEAR_USER')
    dispatch('cart/initCart', null, { root: true })
    dispatch('messages/clearUserMessages', null, { root: true })
    dispatch('orders/initOrders', null, { root: true })
    return { success: true }
  },
  
  initAuth({ commit }) { commit('INIT_AUTH') }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user,
  userName: state => state.user?.nickname || ''
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}