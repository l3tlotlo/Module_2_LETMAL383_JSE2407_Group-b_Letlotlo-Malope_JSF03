import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: [],
    cart: [],
    wishlist: [],
    isLoggedIn: false
  },
 
});

export default store; 