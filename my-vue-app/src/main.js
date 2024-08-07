import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/tailwind.css';
import store from './store/index'; 
import process from 'process';

// Expose Node.js process to the global window object
window.process = process;

/**
 * Entry point of the Vue.js application.
 * Initializes and mounts the Vue application with the main App component.
 * Configures the application with router, store, and global styles.
 */
createApp(App)
  .use(router)  // Registers the router instance with the application
  .use(store)   // Registers the Vuex store instance with the application
  .mount('#app');  // Mounts the Vue application to the DOM element with id 'app'
