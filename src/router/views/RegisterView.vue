<script setup lang="ts">
import { ref, computed } from 'vue'
import { register } from '@/services/autentication'
import { RouterLink } from 'vue-router'
import type { IAuthResponse } from '@/services/autentication'

const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const verPassword = ref(false)
const verConfirmPassword = ref(false)

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
      return {
        ok: false,
        mensaje: 'Las contraseñas no coinciden',
        usuario: null,
      }
    }

    return await register(email.value, password.value)
  } catch (error) {
    return {
      ok: false,
      mensaje: 'No se ha podido registrar',
      usuario: null,
    }
  } finally {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    verPassword.value = false
    verConfirmPassword.value = false
  }
}
</script>

<template>
  <main>
    <div class="subtitle">
      <h1>Reflecta</h1>
      <p>Un espacio para tus notas y reflexiones</p>
    </div>

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

    <div class="prefooter">
      <p>¿Ya tienes cuenta?</p>
      <router-link to="/">Inicia sesión</router-link>
    </div>

    <footer>
      <div>
        <span>Secured by Firebase</span>
      </div>
    </footer>
  </main>
</template>

<style scoped>
main {
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--background-card);
  gap: 50px;

  form {
    color: var(--label-text-color);
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    gap: 20px;
    width: 100%;
    max-width: 500px;

    button {
      color: white;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: var(--button);
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        color: #8a8a8a;
        background-color: var(--disabled-button);

        &:hover {
          cursor: not-allowed;
        }
      }
    }
    a {
      color: var(--button);
      text-decoration: none;
      display: flex;
      flex-direction: row-reverse;
      font-weight: bold;
    }
  }

  label {
    color: var(--label-text-color);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-weight: 600;

    input {
      outline: none;
      padding: 12px;
      font-size: 0.9rem;
      border: 1px solid var(--label-text-color);
      border-radius: 10px;

      &::placeholder {
        color: var(--label-text-color);
      }
      &:focus {
        border: 1px solid var(--input-focus);
      }
    }
  }

  .subtitle {
    align-items: center;
    display: flex;
    flex-direction: column;
    p {
      color: var(--label-text-color);
    }
  }
  .prefooter {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    color: var(--label-text-color);
    a {
      color: var(--button);
      text-decoration: none;
      display: flex;
      flex-direction: row-reverse;
      font-weight: bold;
    }
  }
  footer {
    position: absolute;
    bottom: 20px;
    color: var(--label-text-color);
  }
}
</style>
