import { createStore } from 'vuex';

const store = createStore({
  /**
   * The initial state of the Vuex store.
   * @type {Object}
   * @property {Array} products - List of products.
   * @property {Array} cart - List of products in the cart.
   * @property {Array} wishlist - List of products in the wishlist.
   * @property {boolean} isLoggedIn - User login status.
   */
  state: {
    products: [],
    cart: [],
    wishlist: [],
    isLoggedIn: false
  },
  /**
   * The mutations to change the state of the Vuex store.
   */
  mutations: {
    /**
     * Sets the products state.
     * @param {Object} state - The current state of the Vuex store.
     * @param {Array} products - The products to set.
     */
    setProducts(state, products) {
      state.products = products;
    },
    /**
     * Adds a product to the cart.
     * @param {Object} state - The current state of the Vuex store.
     * @param {Object} product - The product to add to the cart.
     */
    addToCart(state, product) {
      state.cart.push(product);
    },
    /**
     * Removes a product from the cart by its ID.
     * @param {Object} state - The current state of the Vuex store.
     * @param {number} productId - The ID of the product to remove from the cart.
     */
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(product => product.id !== productId);
    },
    /**
     * Adds a product to the wishlist.
     * @param {Object} state - The current state of the Vuex store.
     * @param {Object} product - The product to add to the wishlist.
     */
    addToWishlist(state, product) {
      state.wishlist.push(product);
    },
    /**
     * Removes a product from the wishlist by its ID.
     * @param {Object} state - The current state of the Vuex store.
     * @param {number} productId - The ID of the product to remove from the wishlist.
     */
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(product => product.id !== productId);
    },
    /**
     * Sets the user login status.
     * @param {Object} state - The current state of the Vuex store.
     * @param {boolean} status - The login status to set.
     */
    setIsLoggedIn(state, status) {
      state.isLoggedIn = status; 
    }
  },
  /**
   * The actions to perform asynchronous operations and commit mutations.
   */
  actions: {
    /**
     * Fetches products from an API and commits the setProducts mutation.
     * @param {Object} context - The Vuex context object.
     */
    async fetchProducts({ commit }) {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      commit('setProducts', products);
    }
  },
  /**
   * The getters to access the state of the Vuex store.
   */
  getters: {
    /**
     * Returns the list of products.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {Array} The list of products.
     */
    products: (state) => state.products,
    /**
     * Returns the list of products in the cart.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {Array} The list of products in the cart.
     */
    cart: (state) => state.cart,
    /**
     * Returns the list of products in the wishlist.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {Array} The list of products in the wishlist.
     */
    wishlist: (state) => state.wishlist,
    /**
     * Returns the user login status.
     * @param {Object} state - The current state of the Vuex store.
     * @returns {boolean} The user login status.
     */
    isLoggedIn: (state) => state.isLoggedIn
  }
});

export default store;
