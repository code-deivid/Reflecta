<script setup lang="ts">
import { logout } from '@/services/autentication'
import { useRouter } from 'vue-router'
import { getUsuarioActual } from '@/services/autentication'

const router = useRouter()

const cerrarSesion = async () => {
  try {
    await logout()
    router.push('/')

    return {
      ok: true,
    }
  } catch (error) {
    alert('se ha producido un error al cerrar sesión')
  }
}
</script>

<template>
  <div>
    <h1>Hola</h1>
    <h2>{{ getUsuarioActual()?.email }}</h2>
    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<style scoped></style>
