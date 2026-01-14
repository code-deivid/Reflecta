<script setup lang="ts">
import { ref, computed } from 'vue'
import { register } from '@/services/autentication'
import type { IAuthResponse } from '@/services/autentication'
import FormLayout from '@/components/FormLayout.vue'

const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const coinciden = computed((): boolean => confirmPassword.value === password.value)

const puedeEnviar = computed(() => {
  return (
    email.value.trim().length > 0 &&
    password.value.trim().length > 0 &&
    confirmPassword.value.trim().length > 0 &&
    coinciden.value
  )
})

const registrarUsuario = async (): Promise<IAuthResponse> => {
  try {
    if (!coinciden.value) {
      return { ok: false, mensaje: 'Las contraseñas no coinciden', usuario: null }
    }

    return await register(email.value, password.value)
  } catch (error) {
    return { ok: false, mensaje: 'No se ha podido registrar', usuario: null }
  } finally {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
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
      <form @submit.prevent="registrarUsuario" class="flex flex-col gap-3 items-left">
        <label>
          Email
          <input type="email" v-model="email" placeholder="email@example.com" />
        </label>

        <label>
          Contraseña
          <input type="password" v-model="password" placeholder="contraseña" />
        </label>

        <label>
          Confirmar contraseña
          <input type="password" v-model="confirmPassword" placeholder="repite tu contraseña" />
        </label>

        <button type="submit" :disabled="!puedeEnviar">Registrarse</button>

        <p v-if="!coinciden && password.length > 0">No coinciden las contraseñas</p>
      </form>
    </template>

    <template #prefooter>
      <p>¿Ya tienes cuenta?</p>
      <router-link to="/">Inicia sesión</router-link>
    </template>
  </FormLayout>
</template>
