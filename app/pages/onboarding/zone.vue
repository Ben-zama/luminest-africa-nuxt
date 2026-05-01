<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <!-- In a real app, 'Odenigwe' would be dynamically passed from the previous screen's state -->
      <h1 class="title">What is Odenigwe to you?</h1>
      <p class="subtitle">Helps us show you the right updates</p>
    </div>

    <!-- Zone Types List -->
    <div class="zone-types">
      <button 
        v-for="type in zoneTypes" 
        :key="type.value"
        class="type-card"
        :class="{ 'is-active': selectedType === type.value }"
        @click="selectedType = type.value"
      >
        <div class="type-info">
          <div class="type-title">{{ type.label }}</div>
          <div class="type-desc">{{ type.description }}</div>
        </div>
        
        <!-- Radio-style check indicator -->
        <div class="check-circle">
          <Icon v-if="selectedType === type.value" name="material-symbols:check" />
        </div>
      </button>
    </div>

    <div class="spacer"></div>

    <!-- Private Transformer Toggle -->
    <div class="transformer-section">
      <div class="transformer-info">
        <div class="transformer-title">Private transformer?</div>
        <div class="transformer-desc">My building has its own supply</div>
      </div>
      
      <!-- Custom CSS Toggle Switch -->
      <label class="toggle-switch">
        <input type="checkbox" v-model="hasPrivateTransformer" />
        <span class="slider"></span>
      </label>
    </div>

    <!-- Bottom Action -->
    <div class="actions">
      <button 
        :disabled="!selectedType" 
        class="btn-primary" 
        @click="finishOnboarding"
      >
        Done
      </button>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

import { ref } from 'vue'

const selectedType = ref('home') // Default selection matching the wireframe
const hasPrivateTransformer = ref(false)

const zoneTypes = [
  { label: 'Home', value: 'home', description: 'Where I live' },
  { label: 'School', value: 'school', description: 'Where I study' },
  { label: 'Work', value: 'work', description: 'Where I work' },
  { label: 'Other', value: 'other', description: 'Another location' }
]

const finishOnboarding = () => {
  if (!selectedType.value) return
  
  // Here you would typically save the user's data to your backend
  // ...
  
  // Proceed to the Main App (Feed screen)
  navigateTo('/feed')
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

.zone-types {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.type-card {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
  text-align: left;

  .type-info {
    flex: 1;
  }

  .type-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .type-desc {
    font-size: 0.875rem;
    opacity: 0.6;
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
    color: var(--color-background);
    font-size: 0.875rem;
  }

  /* Active State Styling */
  &.is-active {
    border-color: var(--color-primary);
    

    .check-circle {
      border-color: var(--color-primary);
      background-color: var(--color-primary);
    }
  }
}

.spacer {
  flex: 1;
}

.transformer-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border); // Divider line as seen in wireframe

  .transformer-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .transformer-desc {
    font-size: 0.875rem;
    opacity: 0.6;
  }
}

/* Custom CSS Toggle Switch Implementation */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: var(--color-primary);
    }

    &:checked + .slider:before {
      transform: translateX(22px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(128, 128, 128, 0.3);
    transition: .3s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 24px;
      width: 24px;
      left: 2px;
      bottom: 2px;
      background-color: var(--color-background);
      transition: .3s;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  }
}

.actions {
  display: flex;
  flex-direction: column;
  width: 100%;

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
    transition: background-color 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--color-primary) 80%, #000);
    }

    &:disabled {
      background-color: rgba(128, 128, 128, 0.3);
      color: rgba(255, 255, 255, 0.5);
      cursor: not-allowed;
    }
  }
}
</style>