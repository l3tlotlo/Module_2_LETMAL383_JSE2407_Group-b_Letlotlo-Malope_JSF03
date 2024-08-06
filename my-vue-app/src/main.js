import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/tailwind.css'
import store from './store/index'; // import Vuex store
import cart from '../src/page/Cart.vue';
import Wishlist from '../src/page/Wishlist.vue';



import process from 'process';
window.process = process;



createApp(App)
  .use(router)
  .use(store) 
  .mount('#app'); 