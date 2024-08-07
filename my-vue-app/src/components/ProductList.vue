<template>
    <div class="p-4 bg-[#caf0f8]">
      <!-- Category filter, search bar, and sort dropdown -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <select class="p-2 border rounded bg-white text-gray-800" v-model="selectedCategory" @change="getProduct">
            <option value="all">All categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="flex-1 mx-4">
          <input type="text" placeholder="Search products..." class="w-full p-2 border rounded bg-white text-gray-800" v-model="searchQuery" @input="filterProducts" />
        </div>
        <div>
          <select class="p-2 border rounded bg-white text-gray-800" v-model="sortOrder" @change="sortProducts">
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Sort by: Price - Low to High</option>
            <option value="price-desc">Sort by: Price - High to Low</option>
          </select>
        </div>
      </div>
  
      <!-- Loading spinner -->
      <div v-if="loading" class="flex items-center justify-center">
        <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
  
      <!-- Render product list -->
      <template v-if="!loading && !selectedProduct">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in products" :key="product.id" @click="handleProductClick(product)" class="product-card border shadow p-4 bg-white cursor-pointer">
            <img :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
            <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
            <p class="text-gray-500 mb-2">{{ product.category }}</p>
            <p class="text-blue-500 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
            <div class="flex gap-2">
              <button @click.stop="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
              <button @click.stop="addToWishlist(product)" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Add to Wishlist</button>
            </div>
            
            <div class="flex items-center mb-2">
              <svg v-for="star in 5" :key="star" :class="star <= product.rating.rate ? 'text-yellow-500' : 'text-gray-300'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049.999a1 1 0 011.902 0l2.462 5.004 5.511.8a1 1 0 01.554 1.706l-3.989 3.886.942 5.484a1 1 0 01-1.451 1.054L10 15.347l-4.926 2.59a1 1 0 01-1.451-1.054l.942-5.484-3.989-3.886a1 1 0 01.554-1.706l5.511-.8 2.462-5.004z"></path>
              </svg>
              <span class="text-gray-600 ml-2">{{ `(${product.rating.count} reviews)` }}</span>
            </div>
          </div>
        </div>
      </template>
  
      <!-- Render selected product details -->
      <template v-if="selectedProduct">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <button @click="selectedProduct = null" class="mb-4 text-blue-500 hover:underline">&larr; Back to products</button>
          <img :src="selectedProduct.image" :alt="selectedProduct.title" class="h-64 w-full object-contain mb-4" />
          <h2 class="text-2xl font-semibold mb-2">{{ selectedProduct.title }}</h2>
          <div class="flex items-center mb-2">
            <svg v-for="star in 5" :key="star" :class="star <= selectedProduct.rating.rate ? 'text-yellow-500' : 'text-gray-300'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049.999a1 1 0 011.902 0l2.462 5.004 5.511.8a1 1 0 01.554 1.706l-3.989 3.886.942 5.484a1 1 0 01-1.451 1.054L10 15.347l-4.926 2.59a1 1 0 01-1.451-1.054l.942-5.484-3.989-3.886a1 1 0 01.554-1.706l5.511-.8 2.462-5.004z"></path>
            </svg>
            <span class="text-gray-600 ml-2">{{ `(${selectedProduct.rating.count} reviews)` }}</span>
          </div>
          <p class="text-gray-500 mb-2">{{ selectedProduct.description }}</p>
          <p class="text-blue-500 font-bold mb-2">${{ selectedProduct.price.toFixed(2) }}</p>
          <div class="flex gap-4">
            <button @click="addToCart(selectedProduct)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
            <button @click="addToWishlist(selectedProduct)" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Add to Wishlist</button>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        /**
         * List of products fetched from the API.
         * @type {Array<Object>}
         */
        products: [],
        /**
         * List of product categories fetched from the API.
         * @type {Array<String>}
         */
        categories: [],
        /**
         * Currently selected product category.
         * @type {String}
         */
        selectedCategory: 'all',
        /**
         * Search query for filtering products.
         * @type {String}
         */
        searchQuery: '',
        /**
         * Current sorting order for products.
         * @type {String}
         */
        sortOrder: 'default',
        /**
         * Indicates whether the data is being loaded.
         * @type {Boolean}
         */
        loading: false,
        /**
         * Currently selected product for detailed view.
         * @type {Object|null}
         */
        selectedProduct: null,
      };
    },
    methods: {
      /**
       * Fetches the list of product categories from the API.
       */
      async getCategories() {
        try {
          const response = await fetch('https://fakestoreapi.com/products/categories');
          this.categories = await response.json();
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      /**
       * Fetches and filters the list of products from the API based on the selected category.
       */
      async getProduct() {
        this.loading = true;
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const allProducts = await response.json();
          this.products = allProducts.filter(product => this.selectedCategory === 'all' || product.category === this.selectedCategory);
          this.filterProducts();
          this.sortProducts();
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          this.loading = false;
        }
      },
      /**
       * Filters the list of products based on the search query.
       */
      filterProducts() {
        this.products = this.products.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      },
      /**
       * Sorts the list of products based on the selected sorting order.
       */
      sortProducts() {
        if (this.sortOrder === 'price-asc') {
          this.products.sort((a, b) => a.price - b.price);
        } else if (this.sortOrder === 'price-desc') {
          this.products.sort((a, b) => b.price - a.price);
        }
      },
      /**
       * Handles the click event on a product to show its detailed view.
       * @param {Object} product - The clicked product.
       */
      handleProductClick(product) {
        this.selectedProduct = product;
      },
      /**
       * Adds the specified product to the cart.
       * @param {Object} product - The product to add to the cart.
       */
      addToCart(product) {
        alert(`Added ${product.title} to cart!`);
        this.$store.commit('addToCart', product);
      },
      /**
       * Adds the specified product to the wishlist.
       * @param {Object} product - The product to add to the wishlist.
       */
      addToWishlist(product) {
        alert(`Added ${product.title} to wishlist!`);
        this.$store.commit('addToWishlist', product);
      },
      /**
       * Removes the specified product from the cart.
       * @param {Number} productId - The ID of the product to remove from the cart.
       */
      removeFromCart(productId) {
        this.$store.commit('removeFromCart', productId);
      },
      /**
       * Removes the specified product from the wishlist.
       * @param {Number} productId - The ID of the product to remove from the wishlist.
       */
      removeFromWishlist(productId) {
        this.$store.commit('removeFromWishlist', productId);
      }
    },
    created() {
      this.getCategories();
      this.getProduct();
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    border-radius: 15px;
    overflow: hidden;
  }
  </style>
  