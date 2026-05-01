<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="title">Choose appearance</h1>
      <p class="subtitle">How do you want the app to look?</p>
    </div>

    <!-- Theme Selection Cards -->
    <div class="theme-options">
      <button 
        v-for="theme in themes" 
        :key="theme.value"
        class="theme-card"
        :class="{ 'is-active': colorMode.preference === theme.value }"
        @click="colorMode.preference = theme.value"
      >
        <div class="icon-wrapper">
          <Icon :name="theme.icon" class="theme-icon" />
        </div>
        <span class="theme-label">{{ theme.label }}</span>
        
        <!-- Radio-style check indicator -->
        <div class="check-circle">
          <Icon v-if="colorMode.preference === theme.value" name="material-symbols:check" />
        </div>
      </button>
    </div>

    <div class="spacer"></div>

    <!-- Bottom Action -->
    <div class="actions">
      <button class="btn-primary" @click="goToNextStep">
        Continue
      </button>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

import { useColorMode } from '#imports'

const colorMode = useColorMode()

const themes = [
  { label: 'System default', value: 'system', icon: 'material-symbols:android' },
  { label: 'Light mode', value: 'light', icon: 'material-symbols:light-mode' },
  { label: 'Dark mode', value: 'dark', icon: 'material-symbols:dark-mode' }
]

const goToNextStep = () => {
  navigateTo('/onboarding/phone')
}
</script>

<style lang="scss" scoped>
.onboarding-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem;
}

.header-section {
  margin-bottom: 2.5rem;

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

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.theme-card {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: color-mix(in srgb, var(--color-text) 30%, transparent);
    border-radius: 50%;
    margin-right: 1rem;

    .theme-icon {
      font-size: 1.25rem;
    }
  }

  .theme-label {
    font-size: 1rem;
    font-weight: 500;
    flex: 1;
    text-align: left;
  }

  .check-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: white;
    font-size: 0.875rem;
  }

  /* Active State Styling */
  &.is-active {
    border-color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);

    .icon-wrapper {
      background-color: var(--color-primary);
      color: white;
    }

    .check-circle {
      border-color: var(--color-primary);
      background-color: var(--color-primary);
    }
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
    padding: 0.875rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: color-mix(in srgb, var(--color-primary) 80%, #000);
    }
  }
}
</style>