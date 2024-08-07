<template>
    <div class="p-4 bg-[#caf0f8]">
      <!-- Title and Back Button -->
      <h1 class="text-2xl font-semibold mb-4">Cart</h1>
      <button @click="$router.push('/')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4">Back to Products</button>
  
      <!-- Sorting and Filtering Controls -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <select class="p-2 border rounded bg-white text-gray-800" v-model="sortOrder" @change="sortItems">
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Sort by: Price - Low to High</option>
            <option value="price-desc">Sort by: Price - High to Low</option>
          </select>
        </div>
        <div class="flex-1 mx-4">
          <input type="text" placeholder="Search items..." class="w-full p-2 border rounded bg-white text-gray-800" v-model="searchQuery" @input="filterItems" />
        </div>
      </div>
  
      <!-- Cart Items or Empty Message -->
      <div v-if="filteredCart.length === 0" class="text-center text-gray-600">Your cart is empty.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredCart" :key="product.id" class="product-card border shadow p-4 bg-white">
          <img :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
          <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
          <p class="text-gray-500 mb-2">{{ product.category }}</p>
          <p class="text-blue-500 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
          <button @click="removeFromCart(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        /**
         * Current sorting order for cart items.
         * @type {String}
         */
        sortOrder: 'default',
        /**
         * Search query for filtering cart items.
         * @type {String}
         */
        searchQuery: '',
        /**
         * List of filtered cart items based on search and sort criteria.
         * @type {Array<Object>}
         */
        filteredCart: []
      };
    },
    computed: {
      /**
       * List of items in the cart from the store.
       * @returns {Array<Object>}
       */
      cart() {
        return this.$store.getters.cart;
      }
    },
    watch: {
      /**
       * Watcher for cart changes to update the filtered cart items.
       */
      cart: 'updateFilteredCart',
      /**
       * Watcher for sort order changes to sort the filtered cart items.
       */
      sortOrder: 'sortItems',
      /**
       * Watcher for search query changes to filter the cart items.
       */
      searchQuery: 'filterItems'
    },
    methods: {
      /**
       * Updates the filtered cart items based on the current cart, sort order, and search query.
       */
      updateFilteredCart() {
        this.filteredCart = [...this.cart];
        this.sortItems();
        this.filterItems();
      },
      /**
       * Sorts the filtered cart items based on the selected sorting order.
       */
      sortItems() {
        if (this.sortOrder === 'price-asc') {
          this.filteredCart.sort((a, b) => a.price - b.price);
        } else if (this.sortOrder === 'price-desc') {
          this.filteredCart.sort((a, b) => b.price - a.price);
        }
      },
      /**
       * Filters the cart items based on the search query.
       */
      filterItems() {
        this.filteredCart = this.cart.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        this.sortItems();
      },
      /**
       * Removes the specified product from the cart.
       * @param {Number} productId - The ID of the product to remove from the cart.
       */
      removeFromCart(productId) {
        this.$store.commit('removeFromCart', productId);
      }
    },
    created() {
      this.updateFilteredCart();
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    border-radius: 15px;
    overflow: hidden;
  }
  </style>
  