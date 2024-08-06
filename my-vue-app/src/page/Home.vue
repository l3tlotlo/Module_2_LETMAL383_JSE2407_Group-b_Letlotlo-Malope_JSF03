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
      <select class="p-2 border rounded bg-white text-gray-800" v-model="sortOrder" @change="sortProducts">
        <option value="default">Sort by: Default</option>
        <option value="price-asc">Sort by: Price - Low to High</option>
        <option value="price-desc">Sort by: Price - High to Low</option>
      </select>      
    </div>    
  </div>
 
  <div v-if="loading" class="flex items-center justify-center">
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
     </svg>
 </div>

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
</div> 
</template>

