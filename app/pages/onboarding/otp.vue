<template>
  <main class="onboarding-screen">
    
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="title">Enter the code</h1>
      <p class="subtitle">Sent to +234 0812 345 6789</p>
    </div>

    <!-- OTP Input Row -->
    <div class="otp-container">
      <input
        v-for="(digit, index) in otp"
        :key="index"
        :ref="(el) => (otpInputs[index] = el)"
        v-model="otp[index]"
        type="tel"
        maxlength="1"
        class="otp-input"
        :class="{ 'is-filled': digit !== '' }"
        @input="moveToNext(index)"
        @keydown.delete="moveToPrevious(index)"
      />
    </div>

    <div class="spacer"></div>

    <!-- Bottom Actions -->
    <div class="actions">
      <button
        :disabled="!isOtpComplete"
        @click="verifyCode"
        class="btn-primary"
      >
        Verify
      </button>

      <div class="resend-section">
        <div class="resend-text">
          Didn't get it? <span class="countdown">Resend in 0:47</span>
        </div>
        <div class="expiry-text">
          Code expires in 5 minutes
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

import { ref, computed } from 'vue'

// Array to hold the 6 digits[cite: 1]
const otp = ref(['', '', '', '', '', ''])

// Array to hold references to the native DOM inputs for focusing
const otpInputs = ref([])

// Button is active only when all 6 digits are entered
const isOtpComplete = computed(() => {
  return otp.value.every(digit => digit !== '')
})

const moveToNext = (index) => {
  // Move to next input if there's a digit and it's not the last box
  if (otp.value[index] && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const moveToPrevious = (index) => {
  // Move to previous input on backspace only if the current box is already empty
  if (!otp.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

const verifyCode = () => {
  navigateTo('/onboarding/name')
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

.otp-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
}

.otp-input {
  width: 45px;
  height: 55px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;

  /* Focus state */
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  /* Active/Filled state (Turns green as digits are entered)[cite: 1] */
  &.is-filled {
    border-color: var(--color-positive);
    background-color: color-mix(in srgb, var(--color-positive) 20%, transparent);
    color: var(--color-positive);
  }
}

.spacer {
  flex: 1;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
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
    margin-bottom: 1.5rem;
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

.resend-section {
  text-align: center;

  .resend-text {
    font-size: 0.875rem;
    color: var(--color-text);
    margin-bottom: 0.25rem;

    .countdown {
      font-weight: bold;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  .expiry-text {
    font-size: 0.75rem;
    color: var(--color-text);
    opacity: 0.6;
  }
}
</style>