<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import FormLayout from '@/components/FormLayout.vue'
import { forgotPassord } from '@/services/autentication'

const form = useTemplateRef('FORM_ELEMENT')

const resetPassword = async () => {
  try {
    await forgotPassord(email.value)
    form.value?.reset()
    
  } catch (error) {
    form.value?.reset()
    alert(`Error al enviar correo, ${error}`)
  }
}

const email = ref<string>('')
</script>

<template>
  <FormLayout>
    <template #subtitle>
      <h1>Restablecer contraseña</h1>
      <p>
        Introduce tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
      </p>
    </template>

    <template #form>
      <form
        ref="FORM_ELEMENT"
        @submit.prevent="resetPassword"
        class="flex flex-col gap-3 items-left"
      >
        <label>
          Email de recuperación
          <input type="email" v-model="email" placeholder="email@example.com" />
        </label>

        <button type="submit" :disabled="!(email.trim().length > 0)">Enviar</button>
      </form>
    </template>

    <template #prefooter>
      <p>¿Ya tienes cuenta?</p>
      <router-link to="/">Inicia sesión</router-link>
    </template>
  </FormLayout>
</template>
