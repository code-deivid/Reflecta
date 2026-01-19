import { createRouter, createWebHistory } from 'vue-router'
import { usuarioActual } from '@/services/autentication'



import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import ForgotView from './views/ForgotView.vue'
import HomeView from './views/HomeView.vue'

const user = usuarioActual

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/recovery',
      component: ForgotView
    },
    {
      path: '/home',
      component: HomeView, meta: { requiresAuth: true }
    },
  ],
})


//Solo deja pasar si el usuario está autenticado
router.beforeEach(async (to, from, next) => {
  

  if (to.meta.requiresAuth && !user) {
    return next('/')
  }

  next()
})

export default router
