<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="title">What's your name?</h1>
      <p class="subtitle">So we know what to call you</p>
    </div>

    <!-- Input Section -->
    <div class="input-section">
      <input
        v-model="userName"
        type="text"
        placeholder="Chidi"
        class="text-input"
        @keyup.enter="submitName"
      />
      
      <div class="disclaimer">
        Only visible to you and the admin.<br />
        Not shown publicly.
      </div>
    </div>

    <div class="spacer"></div>

    <!-- Bottom Action -->
    <div class="actions">
      <!-- The spec notes this can be skipped, so the button remains enabled even if empty[span_2](start_span)[span_2](end_span) -->
      <button class="btn-primary" @click="submitName">
        Continue
      </button>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('')

const submitName = () => {
  // Proceed to the "Pick Your Area" screen[span_3](start_span)[span_3](end_span)
  navigateTo('/onboarding/area')
}
</script>

<style lang="scss" scoped>
.onboarding-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem; /* Padded for the 390px baseline[span_4](start_span)[span_4](end_span) */
}

.header-section {
  margin-bottom: 2rem;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
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

  .text-input {
    width: 100%;
    height: 48px;
    background-color: rgba(128, 128, 128, 0.05);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0 1rem;
    font-size: 1rem;
    color: var(--color-text);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    margin-bottom: 0.75rem;

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
  width: 100%;

  .btn-primary {
    width: 100%;
    background-color: var(--color-primary);
    color: white;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.875rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: color-mix( in srgb, var(--color-primary) 80%, #000);
    }
  }
}
</style>
