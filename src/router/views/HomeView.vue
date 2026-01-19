<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { logout, usuarioActual } from '@/services/autentication'

const router = useRouter()

// Si quieres acceder fácil al email, etc.
const user = computed(() => usuarioActual.value)

const cerrarSesion = async () => {
  const res = await logout()

  if (!res.ok) {
    alert('Se ha producido un error al cerrar sesión')
    return
  }

  router.push('/')
}
</script>

<template>
  <div v-if="user">
    <h1>Hola 👋</h1>
    <h2>{{ user.email }}</h2>

    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>

  <div v-else>
    <p>No hay sesión activa</p>
    <button @click="$router.push('/login')">Ir a login</button>
  </div>
</template>

<style scoped></style>
