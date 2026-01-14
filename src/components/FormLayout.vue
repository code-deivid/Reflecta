<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()

const tienePrefooter = !!slots.prefooter //convierte booleano si existe
const tieneFooter = !!slots.footer //convierte booleano si existe
</script>

<template>
  <main>
    <div class="subtitle">
      <slot name="subtitle" />
    </div>

    <slot name="form" />

    <div v-if="tienePrefooter" class="prefooter">
      <slot name="prefooter" />
    </div>

    <footer>
      <div>
        <slot v-if="tieneFooter" name="footer" />
        <span v-else>Secured by Firebase</span>
      </div>
    </footer>
  </main>
</template>

<style>
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
      padding: 12px;
      border: none;
      border-radius: 10px;
      background-color: var(--button);
      &:hover {
        cursor: pointer;
      }
      &:disabled {
        color: var(--disabled-text);
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
      font-weight: bold;
    }
  }

  label {
    color: var(--label-text-color);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 13px;
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
    gap: 5px;
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

/* RESPONSIVE */
@media screen and (width < 738px) {
  main {
    padding: 16px;
    gap: 24px;
    height: 100dvh;
    form {
      width: 100%;
      max-width: 500px;
      padding: 24px;

      a {
        justify-content: center;
      }
    }
  }

  .subtitle {
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
}
</style>
