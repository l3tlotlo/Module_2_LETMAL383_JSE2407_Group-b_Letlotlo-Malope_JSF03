import { createStore } from 'vuex';

export default createStore({
  /**
   * The initial state of the Vuex store.
   * @returns {Object} The initial state.
   */
  state() {
    return {
      cart: []
    };
  },
  /**
   * The mutations to change the state of the Vuex store.
   */
  mutations: {
    /**
     * Adds a product to the cart. If the product already exists, increments the quantity.
     * @param {Object} state - The current state of the Vuex store.
     * @param {Object} product - The product to add to the cart.
     */
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    /**
     * Removes a product from the cart by its ID.
     * @param {Object} state - The current state of the Vuex store.
     * @param {number} productId - The ID of the product to remove from the cart.
     */
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  /**
   * The getters to access the state of the Vuex store.
   */
  getters: {
    /**
     * Returns the items in the cart.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {Array} The items in the cart.
     */
    cartItems(state) {
      return state.cart;
    }
  }
});
