import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import ForgotView from './views/ForgotView.vue'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/recovery', component: ForgotView },
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()

  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
