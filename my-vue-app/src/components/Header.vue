<template>
  <header class="sticky top-0 bg-gray-500 z-50">
    <nav class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
        <span class="text-2xl font-semibold text-white">SwiftCart</span>
      </router-link>
      
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style scoped>

</style>