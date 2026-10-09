import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useSessionStore } from '@/stores/LoginStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/licenses',
      name: 'LicensesView',
      component: () => import('../views/LicensesView.vue'),
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue'),
    },
        {
      path: '/licenses/:id',
      name: 'LicenseDetailView',
      component: () => import('../views/LicenseDetailView.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to)=>{
  const sessionStore = useSessionStore();
  if (!sessionStore.session && to.name!=='LoginView'){
    return ({name:"LoginView"});
  }
})

export default router
