App.vue

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

export default {
  components: {
    Header,
    Login
  },
  data() {
    return {
      showLogin: false, 
    };
  },
  methods: {
    handleLogin() {
      this.$router.push('/product-list'); 
      this.showLogin = false;
    }
  }
};
</script>