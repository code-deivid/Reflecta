<script setup lang="ts">
import type { IAuthResponse } from '@/models/authResponse'
import { login } from '@/services/autentication'

import FormLayout from '@/components/FormLayout.vue'
import { useRouter } from 'vue-router'
import { computed, ref, useTemplateRef } from 'vue'

const router = useRouter()

const form = useTemplateRef('FORM_ELEMENT')

const email = ref<string>('')
const password = ref<string>('')

const puedeEnviar = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0
})

const iniciarSesion = async (): Promise<IAuthResponse> => {
  try {
    const perfil = await login(email.value, password.value)
    form.value?.reset()   
    await router.push('/home')

    return {
      ok: true,
      mensaje: 'Has iniciado sesión enhorabuena',
      usuario: perfil.usuario,
    }
  } catch (error) {
    form.value?.reset()
    return {
      ok: false,
      mensaje: `No se ha podido inicar sesión, ${error}`,
      usuario: null,
    }
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
      <form ref="FORM_ELEMENT" @submit.prevent="iniciarSesion">
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
