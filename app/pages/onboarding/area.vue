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

      <!-- 3. City/Area Selection -->
      <div class="select-group">
        <label class="select-label">City / Neighbourhood</label>
        <div class="select-wrapper" :class="{ 'is-loading': loadingCities }">
          <select 
            v-model="selectedCity" 
            class="custom-select"
            :disabled="!selectedState || loadingCities || cities.length === 0"
          >
            <option :value="null" disabled>
              {{ !selectedState ? 'Select an LGA first' : 'Select your area' }}
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
      <!-- Button enables only when all three steps are completed -->
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
import { ref, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'empty'
})

// --- Dummy Data ---
const dummyStates = [
  { id: 1, name: 'Lagos', alias: 'lagos' },
  { id: 2, name: 'Abuja', alias: 'abuja' },
  { id: 3, name: 'Rivers', alias: 'rivers' }
]

const dummyLgas = {
  1: [
    { id: 101, name: 'Ikeja', alias: 'ikeja' },
    { id: 102, name: 'Surulere', alias: 'surulere' },
    { id: 103, name: 'Eti-Osa', alias: 'eti-osa' }
  ],
  2: [
    { id: 201, name: 'Garki', alias: 'garki' },
    { id: 202, name: 'Bwari', alias: 'bwari' },
    { id: 203, name: 'Abaji', alias: 'abaji' }
  ],
  3: [
    { id: 301, name: 'Port Harcourt', alias: 'port-harcourt' },
    { id: 302, name: 'Obio-Akpor', alias: 'obio-akpor' },
    { id: 303, name: 'Eleme', alias: 'eleme' }
  ]
}

const dummyCities = {
  1: [
    { id: 1001, name: 'Yaba', alias: 'yaba' },
    { id: 1002, name: 'Victoria Island', alias: 'victoria-island' },
    { id: 1003, name: 'Maryland', alias: 'maryland' }
  ],
  2: [
    { id: 2001, name: 'Maitama', alias: 'maitama' },
    { id: 2002, name: 'Wuse 2', alias: 'wuse-2' },
    { id: 2003, name: 'Asokoro', alias: 'asokoro' }
  ],
  3: [
    { id: 3001, name: 'GRA Phase 1', alias: 'gra-phase-1' },
    { id: 3002, name: 'Trans Amadi', alias: 'trans-amadi' },
    { id: 3003, name: 'Rumuola', alias: 'rumuola' }
  ]
}
// ------------------

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

// Helper to simulate API delay so the UI loading states still work visually
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 1. Fetch States on page load
const fetchStates = async () => {
  loadingStates.value = true
  try {
    await delay(600) // Simulate network request
    states.value = dummyStates
  } catch (error) {
    console.error('Failed to fetch states:', error)
  } finally {
    loadingStates.value = false
  }
}

// 2. Fetch LGAs for the selected state
const fetchLgas = async (stateId) => {
  loadingLgas.value = true
  try {
    await delay(500)
    lgas.value = dummyLgas[stateId] || []
  } catch (error) {
    console.error('Failed to fetch LGAs:', error)
  } finally {
    loadingLgas.value = false
  }
}

// 3. Fetch Cities for the selected state
const fetchCities = async (stateId) => {
  loadingCities.value = true
  try {
    await delay(500)
    cities.value = dummyCities[stateId] || []
  } catch (error) {
    console.error('Failed to fetch Cities:', error)
  } finally {
    loadingCities.value = false
  }
}

// Watcher triggers both mock API calls concurrently when State changes
watch(selectedState, (newState) => {
  // Reset downstream selections to prevent invalid data
  selectedLga.value = null
  selectedCity.value = null
  lgas.value = []
  cities.value = []
  
  if (newState && newState.id) {
    fetchLgas(newState.id)
    fetchCities(newState.id)
  }
})

// Initialization
onMounted(() => {
  fetchStates()
})

const submitArea = () => {
  if (!selectedCity.value) return
  navigateTo('/onboarding/zone')
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

    /* Custom Dropdown Arrow */
    &::after {
      content: "▼";
      font-size: 0.7rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none; /* Allows clicking through the arrow */
      opacity: 0.5;
      color: var(--color-text);
    }

    &.is-loading::after {
      content: "⏳"; /* Visual indicator that it's fetching data */
      animation: pulse 1s infinite alternate;
    }

    .custom-select {
      width: 100%;
      height: 52px; /* Slightly taller for easy tapping */
      background-color: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 0 2.5rem 0 1rem; /* Extra padding on right to avoid text overlapping the arrow */
      font-size: 1rem;
      color: var(--color-text);
      outline: none;
      cursor: pointer;
      appearance: none; /* Removes native OS styling */
      -webkit-appearance: none;
      -moz-appearance: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

      option {
        /* Use your solid background variable, NOT a transparent rgba value */
        background-color: var(--color-background); 
        color: var(--color-text);
      }

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: rgba(128, 128, 128, 0.1);
      }
      
      /* Target the placeholder-like disabled option */
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