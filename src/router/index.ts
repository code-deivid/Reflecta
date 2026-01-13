import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from './views/RegisterView.vue'
import PerfilView from './views/PerfilView.vue'
import HomeView from './views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },
    {
      path: "/register",
      component: RegisterView
    },
    {
      path: "/perfil",
      component: PerfilView
    }
  ],
})

export default router
