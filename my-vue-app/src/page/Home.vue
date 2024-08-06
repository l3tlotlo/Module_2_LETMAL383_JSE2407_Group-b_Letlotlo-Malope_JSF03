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
</template>

