import { createStore } from 'vuex';

export default createStore({
  /**
   * The initial state of the Vuex store.
   * @returns {Object} The state object.
   * @property {Array} wishlist - List of products in the wishlist.
   */
  state() {
    return {
      wishlist: []
    };
  },
  /**
   * The mutations to change the state of the Vuex store.
   */
  mutations: {
    /**
     * Adds a product to the wishlist if it's not already present.
     * @param {Object} state - The current state of the Vuex store.
     * @param {Object} product - The product to add to the wishlist.
     */
    addToWishlist(state, product) {
      if (!state.wishlist.find(item => item.id === product.id)) {
        state.wishlist.push(product);
      }
    },
    /**
     * Removes a product from the wishlist by its ID.
     * @param {Object} state - The current state of the Vuex store.
     * @param {number} productId - The ID of the product to remove from the wishlist.
     */
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
    }
  },
  /**
   * The getters to access the state of the Vuex store.
   */
  getters: {
    /**
     * Returns the list of products in the wishlist.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {Array} The list of products in the wishlist.
     */
    wishlistItems(state) {
      return state.wishlist;
    }
  }
});
