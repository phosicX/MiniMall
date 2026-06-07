// store/modules/search.js
export default {
  namespaced: true,
  
  state: {
    keyword: '',
    results: [],
    isSearching: false
  },
  
  mutations: {
    SET_KEYWORD(state, keyword) {
      state.keyword = keyword
    },
    SET_RESULTS(state, results) {
      state.results = results
    },
    SET_SEARCHING(state, isSearching) {
      state.isSearching = isSearching
    },
    CLEAR_SEARCH(state) {
      state.keyword = ''
      state.results = []
      state.isSearching = false
    }
  },
  
  actions: {
    async performSearch({ commit, rootState }, keyword) {
      if (!keyword.trim()) {
        commit('SET_RESULTS', [])
        return []
      }
      
      commit('SET_KEYWORD', keyword)
      commit('SET_SEARCHING', true)
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const products = rootState.products?.items || []
          const results = products.filter(product => 
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
          commit('SET_RESULTS', results)
          commit('SET_SEARCHING', false)
          resolve(results)
        }, 300)
      })
    },
    
    clearSearch({ commit }) {
      commit('CLEAR_SEARCH')
    }
  },
  
  getters: {
    keyword: state => state.keyword,
    results: state => state.results,
    isSearching: state => state.isSearching,
    hasResults: state => state.results.length > 0,
    resultCount: state => state.results.length
  }
}