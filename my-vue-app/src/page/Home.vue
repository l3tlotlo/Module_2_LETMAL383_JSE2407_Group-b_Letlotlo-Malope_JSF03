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
</template>

