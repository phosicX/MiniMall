import { createStore } from 'vuex'
import products from './modules/products' 
import auth from './modules/auth'
import cart from './modules/cart'
import messages from './modules/messages'
import search from './modules/search'
import orders from './modules/orders'

export default createStore({
  modules: {
    products,
    auth,
    cart,
    messages,
    search,
    orders,
  }
})