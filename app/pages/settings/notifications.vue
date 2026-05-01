<template>
  <main class="notification-screen">
    
    <!-- Header Toolbar -->
    <header class="settings-header">
      <h1 class="header-title">Notifications</h1>
      <NuxtLink to="/profile" class="btn-back">
        <Icon name="material-symbols:chevron-left" /> Back
      </NuxtLink>
    </header>

    <div class="settings-list">
      <!-- Section 1: Odenigwe -->
      <section class="settings-group">
        <h2 class="group-title">For Odenigwe (home)</h2>

        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Light expected soon</div>
            <div class="setting-desc">Alert ~30 mins before light is due</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.odenigwe.expected" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Light came on</div>
            <div class="setting-desc">Alert when community reports light up</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.odenigwe.cameOn" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Light went off</div>
            <div class="setting-desc">Alert when community reports light off</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.odenigwe.wentOff" />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">Low data warning</div>
            <div class="setting-desc">Alert if area has too few reports</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.odenigwe.lowData" />
            <span class="slider"></span>
          </label>
        </div>
      </section>

      <!-- Section 2: Campus -->
      <section class="settings-group">
        <h2 class="group-title">For UNN Main Campus (school)</h2>

        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-label">All campus alerts</div>
            <div class="setting-desc">On/off for all campus notifications</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.campus.allAlerts" />
            <span class="slider"></span>
          </label>
        </div>
      </section>
    </div>

    <!-- Footer Note -->
    <footer class="settings-footer">
      <p class="footer-note">
        Notifications work when browser is open or app is bookmarked on home screen.
      </p>
    </footer>

  </main>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})

import { reactive } from 'vue'

// State exactly matching the design specification
const settings = reactive({
  odenigwe: {
    expected: true,
    cameOn: true,
    wentOff: false, 
    lowData: true
  },
  campus: {
    allAlerts: true
  }
})
</script>

<style lang="scss" scoped>
.notification-screen {
  min-height: 100dvh;
  background-color: var(--color-background);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}

/* Header Toolbar */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--color-border);

  .header-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .btn-back {
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    border-radius: 12px;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;

    &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
    }
  }
}

/* Settings List */
.settings-list {
  padding: 1rem 0;
}

.settings-group {
  margin-bottom: 2rem;

  .group-title {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0 1rem 0.75rem;
    opacity: 0.8;
  }
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  transition: background-color 0.2s ease;

  &:active {
    background-color: rgba(128, 128, 128, 0.05);
  }

  .setting-info {
    flex: 1;
    padding-right: 1rem;
  }

  .setting-label {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .setting-desc {
    font-size: 0.9rem;
    opacity: 0.6;
  }
}

/* Custom CSS Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: var(--color-primary);
    }

    &:checked + .slider:before {
      transform: translateX(24px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(128, 128, 128, 0.3);
    transition: 0.3s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}

/* Footer Styling */
.settings-footer {
  margin-top: auto;
  padding: 2rem 1.5rem;
  text-align: center;

  .footer-note {
    font-size: 0.8rem;
    opacity: 0.5;
    max-width: 280px;
    margin: 0 auto;
    line-height: 1.4;
  }
}
</style>