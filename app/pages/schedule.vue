<template>
  <main class="schedule-screen">
    
    <!-- 7-Day Average Summary Card -->
    <div class="summary-card">
      <div class="card-content">
        <div class="subtitle">7-day average</div>
        <div class="main-stat">8.5 hrs / day</div>
        <div class="meta-stat">134 reports used</div>
      </div>
    </div>

    <!-- Bar Chart Section -->
    <section class="chart-section">
      <h2 class="section-title">This week's pattern</h2>

      <div class="chart-container">
        <div 
          v-for="day in scheduleData" 
          :key="day.day" 
          class="chart-row"
        >
          <!-- Day Label -->
          <div class="day-label">{{ day.day }}</div>

          <!-- The Bar Track & Fill -->
          <div class="bar-track">
            <!-- Inline style used here because the width must be dynamically calculated per row based on data -->
            <div 
              class="bar-fill"
              :style="{ width: `${(day.hours / 12) * 100}%` }"
            ></div>
          </div>

          <!-- Hours Label -->
          <div class="hours-label">{{ day.hours }}h</div>
        </div>
      </div>
    </section>

    <!-- Expected Windows Card -->
    <div class="forecast-card">
      <h3 class="forecast-title">Today — expected windows</h3>
      <p class="forecast-times">
        6:00am – 1:30pm &nbsp; &bull; &nbsp; 6:00pm – 11:00pm
      </p>
      <div class="forecast-alert">
        Next light expected in ~2 hrs
      </div>
    </div>

  </main>
</template>

<script setup>
// Mock data reflecting the exact bar chart hours from the MVP screen spec[cite: 1]
const scheduleData = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 7 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 10 },
  { day: 'Sun', hours: 6 }
]
</script>

<style lang="scss" scoped>
.schedule-screen {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100%;
}

/* 7-Day Average Card */
.summary-card {
  background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .card-content {
    display: flex;
    flex-direction: column;
  }

  .subtitle {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .main-stat {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.25rem 0;
    color: var(--color-text);
  }

  .meta-stat {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-primary);
    opacity: 0.8;
  }
}

/* Chart Section */
.chart-section {
  display: flex;
  flex-direction: column;

  .section-title {
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-text);
    opacity: 0.7;
    margin: 0 0 1rem 0;
  }
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chart-row {
  display: flex;
  align-items: center;
  width: 100%;

  .day-label {
    width: 36px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    margin-right: 0.5rem;
  }

  /* Bar Visuals */
  .bar-track {
    flex: 1;
    height: 24px;
    background-color: rgba(128, 128, 128, 0.1); /* Subtle track background */
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    background-color: var(--color-primary);
    border-radius: 12px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth load-in animation */
    position: absolute;
    left: 0;
    top: 0;
  }

  .hours-label {
    width: 28px;
    font-size: 0.875rem;
    color: var(--color-text);
    opacity: 0.7;
    text-align: right;
    margin-left: 0.5rem;
  }
}

/* Expected Windows Card */
.forecast-card {
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0;

  .forecast-title {
    font-size: 0.875rem;
    font-weight: bold;
    color: var(--color-text);
    margin: 0 0 0.25rem 0;
  }

  .forecast-times {
    font-size: 0.875rem;
    color: var(--color-text);
    opacity: 0.7;
    margin: 0 0 0.5rem 0;
  }

  .forecast-alert {
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--color-primary);
  }
}
</style>