import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUser()
  const { isAuthenticated } = storeToRefs(userStore)

  if (!to.meta.requiresAuth && isAuthenticated.value) return { name: 'home', replace: true }
  if (to.meta.requiresAuth && !isAuthenticated.value) return { name: 'login', replace: true }
})

export default router
