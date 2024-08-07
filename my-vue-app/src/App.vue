<template>
  <div id="app">
    <Header @toggle-login="showLogin = !showLogin" />
    <router-view></router-view> 
    <Login v-if="showLogin" @login="handleLogin" @cancel="showLogin = false" />
  </div>
</template>

<script>
import Header from '../src/components/Header.vue';
import Login from '../src/components/Login.vue';

/**
 * The root component of the application.
 * It includes a header, a router view for rendering different routes,
 * and a login modal that toggles based on user interaction.
 */
export default {
  components: {
    Header,
    Login
  },
  data() {
    return {
      /**
       * Controls the visibility of the login modal.
       * @type {boolean}
       */
      showLogin: false, 
    };
  },
  methods: {
    /**
     * Handles the login action.
     * This method is called when the login is successful.
     * It navigates to the '/product-list' route and hides the login modal.
     * @fires router.push
     */
    handleLogin() {
      this.$router.push('/product-list'); 
      this.showLogin = false;
    }
  }
};
</script>
