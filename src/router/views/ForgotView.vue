<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref<string>('')
</script>

<template>
  <main>
    <div class="subtitle">
      <h1>Restablecer contraseña</h1>
      <p>
        Introduce tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
      </p>
    </div>

    <form @submit.prevent="() => {}" class="flex flex-col gap-3 items-left">
      <label>
        Email de recuperación
        <input type="email" v-model="email" placeholder="email@example.com" />
      </label>

      <button type="submit" :disabled="!(email.trim().length > 0)">Enviar</button>
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
    justify-content: center;
    width: 100%;
    gap: 20px;
    max-width: 500px;
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
@media screen and (width < 738px) {
  main {
    padding: 16px;
    gap: 24px;
    height: 100dvh;

    form {
      width: 100%;
      max-width: 500px;
      padding: 24px;
    }

    .subtitle {
      font-size: 0.9rem;
      width: 100%;
    }
  }
}
</style>
