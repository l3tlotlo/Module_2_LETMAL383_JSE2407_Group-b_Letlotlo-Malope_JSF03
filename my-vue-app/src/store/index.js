import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: [],
    cart: [],
    wishlist: [],
    isLoggedIn: false
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
});

export default store; 