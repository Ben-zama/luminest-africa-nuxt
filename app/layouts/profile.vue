<template>
  <div class="app-layout">

    <!-- Page Container -->
    <main class="page-container">
      <NuxtPage />
    </main>

    <!-- Footer / Bottom Navigation -->
    <footer class="app-footer">
      <nav class="bottom-nav">
        
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="nav-item"
          active-class="active-tab"
        >
          <Icon :name="tab.icon" class="nav-icon" />
          <span class="nav-label">{{ tab.label }}</span>
        </NuxtLink>

      </nav>
    </footer>

  </div>
</template>

<script setup>
const tabs = [
  { to: '/feed', icon: 'ic:baseline-dynamic-feed', label: 'Feed' },
  { to: '/schedule', icon: 'ic:outline-calendar-month', label: 'Schedule' },
  { to: '/report', icon: 'ic:outline-offline-bolt', label: 'Report' },
  { to: '/profile', icon: 'ic:baseline-person-pin', label: 'Profile' }
]
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Main Content Area */
.page-container {
  flex: 1;
  overflow-y: auto;
}

/* Footer / Navigation Styles */
.app-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid var(--color-border);
  background-color: transparent;
  margin-top: auto;
  padding-bottom: env(safe-area-inset-bottom); /* iOS safe area handling */
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  opacity: 0.5;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  .nav-icon {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .nav-label {
    font-size: 0.75rem;
  }
}

/* Active State applied by NuxtLink's active-class */
.active-tab {
  opacity: 1 !important;
  color: var(--color-primary);
}
</style>