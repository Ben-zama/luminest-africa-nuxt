<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="title">Enter your number</h1>
      <p class="subtitle">We'll send you a one-time code</p>
    </div>

    <!-- Input Section -->
    <div class="input-section">
      <div class="input-row">
        
        <div class="country-code">
          +234
        </div>

        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="812 3456 789"
          class="phone-input"
        />
      </div>

      <div class="disclaimer">
        We use your number to verify your account.<br />
        We never share it.
      </div>
    </div>

    <div class="spacer"></div>

    <!-- Bottom Action -->
    <div class="actions">
      <button
        :disabled="!phoneNumber"
        @click="submitNumber"
        class="btn-primary"
      >
        Send code
      </button>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

import { ref } from 'vue'

const phoneNumber = ref('')

const submitNumber = () => {
  if (!phoneNumber.value) return
  navigateTo('/onboarding/otp')
}
</script>

<style lang="scss" scoped>
.onboarding-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem;
}

.header-section {
  margin-bottom: 1.5rem;

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 0 0.25rem 0;
  }

  .subtitle {
    font-size: 1rem;
    opacity: 0.7;
    margin: 0;
  }
}

.input-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .input-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .country-code {
    width: 72px;
    height: 40px;
    background-color: rgba(128, 128, 128, 0.1);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }

  .phone-input {
    flex: 1;
    height: 40px;
    background-color: rgba(128, 128, 128, 0.1);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0 0.75rem;
    font-size: 1rem;
    color: var(--color-text);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: var(--color-text);
      opacity: 0.4;
    }

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px var(--color-primary);
    }
  }

  .disclaimer {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--color-text);
    opacity: 0.6;
    line-height: 1.4;
  }
}

.spacer {
  flex: 1;
}

.actions {
  display: flex;
  flex-direction: column;
  margin-top: auto;

  .btn-primary {
    width: 100%;
    background-color: var(--color-primary);
    color: var(--color-background);
    font-weight: bold;
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-primary) 80%, #000);
    }

    &:disabled {
      background-color: rgba(128, 128, 128, 0.5);
      color: rgba(255, 255, 255, 0.5);
      cursor: not-allowed;
    }
  }
}
</style>