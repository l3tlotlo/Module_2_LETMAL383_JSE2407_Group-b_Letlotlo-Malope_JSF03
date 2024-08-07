import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../src/page/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../../src/page/Cart.vue';
import Wishlist from '../../src/page/Wishlist.vue';

/**
 * The route definitions for the application.
 * @type {Array.<{path: string, name: string, component: Object, props?: boolean}>}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  }
];

/**
 * Creates the Vue Router instance.
 * @returns {Router} The router instance.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
