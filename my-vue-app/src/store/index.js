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
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(product => product.id !== productId);
    },
  },
});

export default store; 