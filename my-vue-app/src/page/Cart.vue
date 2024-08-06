<template>
    <div class="p-4 bg-[#caf0f8]">
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
      
      
    </div>
  </template>
  
 