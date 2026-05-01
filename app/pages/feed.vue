<template>
  <main class="feed-screen">

    <!-- Main Status Banner -->
    <section 
      class="status-banner" 
      :class="isLightOn ? 'is-on' : 'is-off'"
    >
      <div class="status-icon">
        <Icon :name="isLightOn ? 'material-symbols:lightbulb' : 'material-symbols:lightbulb-2-outline'" />
      </div>
      <h2 class="status-title">{{ isLightOn ? 'Light is up' : 'Light is off' }}</h2>
      <p class="status-meta">
        Last reported {{ lastReportedTime }} &bull; {{ activeReporters }} reports today
      </p>
    </section>

    <!-- Recent Reports Feed -->
    <section class="reports-section">
      <h3 class="section-title">Recent reports</h3>
      
      <div class="reports-list">
        <div 
          v-for="(report, index) in recentReports" 
          :key="index"
          class="report-card"
        >
          <div class="report-icon" :class="report.type === 'on' ? 'icon-on' : 'icon-off'">
            <Icon :name="report.type === 'on' ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:close'" />
          </div>
          
          <div class="report-content">
            <div class="report-title">
              Light {{ report.type === 'on' ? 'came on' : 'went off' }}
            </div>
            <div class="report-time">{{ report.time }}</div>
          </div>

          <div class="report-tag" :class="report.tag">
            {{ report.tag }}
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref } from 'vue'

// Mock Data for the current grid status
const isLightOn = ref(true) // Set to false to see the red "Light is off" state
const lastReportedTime = ref('4 mins ago')
const activeReporters = ref(3)

// Mock Data for the feed list
const recentReports = ref([
    { type: 'on', time: '8 mins ago', tag: 'checkin' },
    { type: 'off', time: '2 hrs ago', tag: 'realtime' },
    { type: 'on', time: '6 hrs ago', tag: 'realtime' },
])

</script>

<style lang="scss" scoped>
/* Define a local negative color variable for the "Off" states */
.feed-screen {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Status Banner[cite: 1] */
.status-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;

  .status-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .status-title {
    font-size: 1.75rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }

  .status-meta {
    font-size: 0.875rem;
    margin: 0;
    opacity: 0.9;
  }

  /* Dynamic States based on grid status */
  &.is-on {
    background-color: rgba(34, 197, 94, 0.15); /* Light positive tint */
    color: var(--color-positive);
  }

  &.is-off {
    background-color: rgba(239, 68, 68, 0.15); /* Light negative tint */
    color: var(--color-negative);
  }
}

/* Recent Reports Section */
.reports-section {
  display: flex;
  flex-direction: column;
  flex: 1; /* Pushes the layout up gracefully */

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem 0;
  }
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.report-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: rgba(128, 128, 128, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 12px;

  .report-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: white;

    &.icon-on {
      background-color: var(--color-positive);
    }
    
    &.icon-off {
      background-color: var(--color-negative);
    }
  }

  .report-content {
    flex: 1;

    .report-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-text);
      margin-bottom: 0.25rem;
    }

    .report-time {
      font-size: 0.875rem;
      opacity: 0.6;
      color: var(--color-text);
    }
  }

  .report-tag {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    text-transform: capitalize;

    /* Distinct styling for realtime vs checkin reports[cite: 1] */
    &.realtime {
      background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
      color: var(--color-primary);
    }

    &.checkin {
      background-color: color-mix(in srgb, var(--color-text) 30%, transparent);
      color: var(--color-text);
      opacity: 0.8;
    }
  }
}
</style>