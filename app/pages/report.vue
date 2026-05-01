<template>
  <main class="report-screen">
    <!-- Zone Selector Toolbar -->
    <div class="zone-selector">
      <span class="label">Reporting for</span>
      <button class="btn-zone">Odenigwe (home)</button>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <!-- ON Button -->
      <button class="report-btn btn-on" @click="submitReport('on')">
        <div class="icon-circle bg-positive">
          <Icon name="material-symbols:keyboard-arrow-up" />
        </div>
        <div class="btn-title">Light just came on</div>
        <div class="btn-subtitle text-positive">Tap to report</div>
      </button>

      <!-- OFF Button -->
      <button class="report-btn btn-off" @click="submitReport('off')">
        <div class="icon-circle bg-negative">
          <Icon name="material-symbols:close" />
        </div>
        <div class="btn-title">Light just went off</div>
        <div class="btn-subtitle text-negative">Tap to report</div>
      </button>
    </div>

    <!-- Footer Help Text -->
    <div class="help-text">
      <p class="checkin-prompt">
        Just got home? Tell us what you met.<br />
        Even a check-in helps.
      </p>
      <p class="privacy-notice">
        Reports are anonymous. Offline reports saved automatically.
      </p>
    </div>
  </main>
</template>

<script setup>
const submitReport = (status) => {
  // Logic for handling the report submission and offline queueing
  // will go here as per MVP spec: "If network is unavailable, report is saved locally"[cite: 1]
  console.log(`Report submitted: ${status}`);
};
</script>

<style lang="scss" scoped>
.report-screen {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Zone Selector Toolbar */
.zone-selector {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: color-mix(in srgb, var(--color-text) 15%, transparent);
  border-radius: 12px;
  margin-bottom: 2rem;

  .label {
    font-size: 1rem;
    color: var(--color-text);
    opacity: 0.7;
  }

  .btn-zone {
    background: transparent;
    color: var(--color-primary);
    border: none;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* Action Buttons Container */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Base Button Styles[cite: 1] */
.report-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2.5rem 1rem;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    opacity: 0.9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 0.75rem;
    font-size: 2rem;
  }

  .btn-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 0.25rem;
  }

  .btn-subtitle {
    font-size: 0.875rem;
    font-weight: 500;
  }
}

/* Specific styling for the 'ON' button[cite: 1] */
.btn-on {
  background-color: rgba(34, 197, 94, 0.1);
  border: 2px solid var(--color-positive);

  .bg-positive {
    background-color: var(--color-positive);
  }

  .text-positive {
    color: var(--color-positive);
  }
}

.btn-off {
  background-color: rgba(239, 68, 68, 0.1);
  border: 2px solid var(--color-negative);

  .bg-negative {
    background-color: var(--color-negative);
  }

  .text-negative {
    color: var(--color-negative);
  }
}

/* Footer Text */
.help-text {
  text-align: center;
  margin-top: auto;
  padding: 1rem 0;

  .checkin-prompt {
    font-size: 0.875rem;
    color: var(--color-text);
    opacity: 0.7;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .privacy-notice {
    font-size: 0.75rem;
    color: var(--color-text);
    opacity: 0.5;
    margin: 0;
  }
}
</style>