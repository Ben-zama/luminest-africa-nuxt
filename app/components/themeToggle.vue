<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme" 
    aria-label="Toggle dark mode"
  >
    <div class="icon-wrapper">
      <!-- Sun Icon -->
      <Icon 
        v-if="colorMode.value === 'light'" 
        name="material-symbols:sunny-outline" 
        class="theme-icon sun" 
      />
      <!-- Moon Icon -->
      <Icon 
        v-else 
        name="material-symbols:nightlight-outline" 
        class="theme-icon moon" 
      />
    </div>
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleTheme = () => {
  // Toggle between light and dark
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  background: rgba(128, 128, 128, 0.1);
  border: 1px solid var(--color-border);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-text);

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  .icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .theme-icon {
    font-size: 1.5rem;
    /* CSS-only smooth transition for icon swap */
    animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    &.sun {
      color: #f59e0b; /* Amber-500 */
    }
    
    &.moon {
      color: #818cf8; /* Indigo-400 */
    }
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>