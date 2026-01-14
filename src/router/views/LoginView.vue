<script setup lang="ts">
import { computed, ref } from 'vue'
import { login } from '@/services/autentication'
import FormLayout from '@/components/FormLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const puedeEnviar = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0
})

const iniciar_sesion = async () => {
  const resultado = await login(email.value, password.value)

  if (resultado.ok) {
    console.log(`Usuario logeado ${resultado.usuario?.email}`)
    router.push('/home')
  }
}
</script>

<template>
  <FormLayout>
    <template #subtitle>
      <h1>Reflecta</h1>
      <p>Un espacio para tus notas y reflexiones</p>
    </template>

    <template #form>
      <form @submit.prevent="iniciar_sesion">
        <label>
          <p>Correo electrónico</p>
          <input v-model="email" placeholder="email@example.com" type="text" />
        </label>

        <label>
          <p>Contraseña</p>
          <input v-model="password" placeholder="contraseña" type="password" />
        </label>

        <button type="submit" :disabled="!puedeEnviar">Iniciar sesión</button>
        <router-link to="/recovery">¿Olvidaste la contraseña?</router-link>
      </form>
    </template>

    <template #prefooter>
      <p>No tienes cuenta?</p>
      <router-link to="/register">Registrarse</router-link>
    </template>
  </FormLayout>
</template>
