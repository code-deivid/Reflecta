import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import ForgotView from './views/ForgotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView
    },
    {
      path: "/register",
      component: RegisterView
    },
    {
      path: "/recovery",
      component: ForgotView
    },

  ],
})

export default router
