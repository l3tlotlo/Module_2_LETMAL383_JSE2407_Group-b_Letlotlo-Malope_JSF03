<template>
  <div>
    <!-- Product list component with event binding for product selection -->
    <ProductList @select-product="selectProduct" />
    <!-- Login component, conditionally rendered based on showLogin flag -->
    <Login v-if="showLogin" @login="handleLogin" @cancel="showLogin = false" />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import Login from '../../src/components/Login.vue';

export default {
  components: {
    ProductList,
    Login
  },
  data() {
    return {
      /**
       * Flag to show or hide the login component.
       * @type {Boolean}
       */
      showLogin: false
    };
  },
  methods: {
    /**
     * Handles the login action, setting the user as logged in and hiding the login component.
     */
    handleLogin() {
      this.$store.commit('setIsLoggedIn', true);
      this.showLogin = false;
    },
    /**
     * Handles product selection, navigating to the product details page.
     * @param {Object} product - The selected product object.
     * @param {Number} product.id - The ID of the selected product.
     */
    selectProduct(product) {
      this.$router.push({ name: 'ProductDetails', params: { id: product.id } });
    }
  }
};
</script>
