<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="title">Where do you live?</h1>
      <p class="subtitle">Select your location to get local power updates</p>
    </div>

    <!-- Selection Form -->
    <div class="form-section">
      
      <!-- 1. State Selection -->
      <div class="select-group">
        <label class="select-label">State</label>
        <div class="select-wrapper" :class="{ 'is-loading': loadingStates }">
          <select 
            v-model="selectedState" 
            class="custom-select"
            :disabled="loadingStates || states.length === 0"
          >
            <option :value="null" disabled>Select your state</option>
            <option v-for="state in states" :key="state.alias" :value="state">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- 2. LGA Selection -->
      <div class="select-group">
        <label class="select-label">Local Government Area (LGA)</label>
        <div class="select-wrapper" :class="{ 'is-loading': loadingLgas }">
          <select 
            v-model="selectedLga" 
            class="custom-select"
            :disabled="!selectedState || loadingLgas || lgas.length === 0"
          >
            <option :value="null" disabled>
              {{ !selectedState ? 'Select a state first' : 'Select your LGA' }}
            </option>
            <option v-for="lga in lgas" :key="lga.alias" :value="lga">
              {{ lga.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- 3. City/Area Selection (Now dependent on State, not LGA) -->
      <div class="select-group">
        <label class="select-label">City / Neighbourhood</label>
        <div class="select-wrapper" :class="{ 'is-loading': loadingCities }">
          <select 
            v-model="selectedCity" 
            class="custom-select"
            :disabled="!selectedState || loadingCities || cities.length === 0"
          >
            <option :value="null" disabled>
              {{ !selectedState ? 'Select a state first' : 'Select your area' }}
            </option>
            <option v-for="city in cities" :key="city.alias" :value="city">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>

    </div>

    <div class="spacer"></div>

    <!-- Bottom Action -->
    <div class="actions">
      <!-- Button enables only when a city is selected -->
      <button 
        :disabled="!selectedCity" 
        class="btn-primary" 
        @click="submitArea"
      >
        Continue {{ selectedCity ? 'with ' + selectedCity.name : '' }}
      </button>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})

import { ref, watch, onMounted } from 'vue'

const config = useRuntimeConfig()

// Data Arrays
const states = ref([])
const lgas = ref([])
const cities = ref([])

// Selected Models
const selectedState = ref(null)
const selectedLga = ref(null)
const selectedCity = ref(null)

// Loading States
const loadingStates = ref(false)
const loadingLgas = ref(false)
const loadingCities = ref(false)

// Helper function to build API options
const getApiOptions = () => {
  const headers = new Headers()
  headers.append("X-Api-Key", config.public.toneflixApiKey)
  headers.append("Accept", "application/json")
  headers.append("Content-Type", "application/json")

  return { method: "GET", headers, redirect: "follow" }
}

// 1. Fetch States on page load
const fetchStates = async () => {
  loadingStates.value = true
  try {
    const response = await fetch(`https://naija-places.toneflix.com.ng/api/v1/states`, getApiOptions())
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    states.value = data.data || data || []
  } catch (error) {
    console.error('Failed to fetch states:', error)
  } finally {
    loadingStates.value = false
  }
}

// 2. Fetch LGAs for a specific State
const fetchLgas = async (stateAlias) => {
  loadingLgas.value = true
  try {
    const response = await fetch(`https://naija-places.toneflix.com.ng/api/v1/states/${stateAlias}/lgas`, getApiOptions())
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    lgas.value = data.data || data || []
  } catch (error) {
    console.error('Failed to fetch LGAs:', error)
  } finally {
    loadingLgas.value = false
  }
}

// 3. Fetch Cities for a specific State
const fetchCities = async (stateAlias) => {
  loadingCities.value = true
  try {
    // Corrected endpoint: Cities belong to the state
    const response = await fetch(`https://naija-places.toneflix.com.ng/api/v1/states/${stateAlias}/cities`, getApiOptions())
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    cities.value = data.data || data || []
  } catch (error) {
    console.error('Failed to fetch Cities:', error)
  } finally {
    loadingCities.value = false
  }
}

// Single Watcher: When State changes, fetch both LGAs and Cities
watch(selectedState, (newState) => {
  // Reset downstream selections
  selectedLga.value = null
  selectedCity.value = null
  lgas.value = []
  cities.value = []
  
  if (newState && (newState.alias || newState.id)) {
    const identifier = newState.alias || newState.id
    // Trigger both fetches concurrently
    fetchLgas(identifier)
    fetchCities(identifier)
  }
})

// Lifecycle hook
onMounted(() => {
  fetchStates()
})

const submitArea = () => {
  if (!selectedCity.value) return
  navigateTo('/onboarding/zone')
}
</script>

<style lang="scss" scoped>
/* (Keep the exact same styles from the previous code block here) */
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

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.select-group {
  display: flex;
  flex-direction: column;

  .select-label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }

  .select-wrapper {
    position: relative;
    width: 100%;

    &::after {
      content: "▼";
      font-size: 0.7rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0.5;
      color: var(--color-text);
    }

    &.is-loading::after {
      content: "⏳";
      animation: pulse 1s infinite alternate;
    }

    .custom-select {
      width: 100%;
      height: 52px;
      background-color: rgba(128, 128, 128, 0.05);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 0 2.5rem 0 1rem;
      font-size: 1rem;
      color: var(--color-text);
      outline: none;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: rgba(128, 128, 128, 0.1);
      }
      
      &:invalid {
        color: rgba(128, 128, 128, 0.5);
      }
    }
  }
}

@keyframes pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.spacer {
  flex: 1;
}

.actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;

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