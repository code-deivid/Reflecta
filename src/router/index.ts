import { createRouter, createWebHistory } from 'vue-router'
import { usuarioActual, authCargado } from '@/services/autentication'

import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import ForgotView from './views/ForgotView.vue'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/recovery',
      component: ForgotView,
    },
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
})

const esperarAuth = async () => {
  while (!authCargado.value) {
    await new Promise((r) => setTimeout(r, 10))
  }
}

router.beforeEach(async (to) => {
  await esperarAuth()

  if (to.meta.requiresAuth && !usuarioActual.value) {
    return '/login'
  }
})



export default router
