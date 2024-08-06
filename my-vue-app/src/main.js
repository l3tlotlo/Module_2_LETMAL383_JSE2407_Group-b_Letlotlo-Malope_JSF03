import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/tailwind.css'
import store from './store/index'; 


import process from 'process';
window.process = process;

createApp(App)
  .use(router)
  .use(store) 
  .mount('#app');  