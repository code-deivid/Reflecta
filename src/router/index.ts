import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import ForgotView from './views/ForgotView.vue'
import HomeView from './views/HomeView.vue'

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

//Para que aunque hagas F5 no cierre la sesión
const auth = getAuth()
let authReady = false
let cachedUser: User | null = null

const waitAuthReady = () =>
  new Promise<User | null>((resolve) => {
    if (authReady) return resolve(cachedUser)

    const unsub = onAuthStateChanged(auth, (user) => {
      cachedUser = user
      authReady = true
      unsub()
      resolve(user)
    })
  })

//Solo deja pasar si el usuario está autenticado
router.beforeEach(async (to, from, next) => {
  const user = await waitAuthReady()

  if (to.meta.requiresAuth && !user) {
    return next('/')
  }

  next()
})

export default router
