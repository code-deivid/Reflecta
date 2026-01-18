<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { registrar } from '@/services/autentication'
import type { IAuthResponse } from '@/models/authResponse'
import FormLayout from '@/components/FormLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = useTemplateRef('FORM_ELEMENT')

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

const register = async (): Promise<IAuthResponse> => {
  try {
    if (!coinciden.value) {
      return {
        ok: false,
        mensaje: 'Las contraseñas no coinciden',
        usuario: null,
      }
    }

    const user = await registrar(email.value, password.value)
    form.value?.reset()
    await router.push('/home')

    return {
      ok: true,
      mensaje: 'Se ha registrado correctamente',
      usuario: user.usuario,
    }
  } catch (error) {
    form.value?.reset()
    return {
      ok: false,
      mensaje: 'Ha habido un error al crear un usuario',
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
      <form ref="FORM_ELEMENT" @submit.prevent="register" class="flex flex-col gap-3 items-left">
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
