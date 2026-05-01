<template>
  <main class="splash-screen">
    
    <div class="spacer"></div>

    <div class="hero-content">
      <div class="logo-box">
        <img src="~/assets/logo.svg" alt="App Logo" />
      </div>

      <h1 class="title">Know when light is coming</h1>
      <p class="subtitle">Community-powered schedules for your area</p>
    </div>

    <div class="spacer"></div>

    <div class="actions">
      <button class="btn-primary" @click="goToNextStep">
        Get started
      </button>
      <div class="disclaimer">
        Free. Works on any Android phone.
      </div>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})

const goToNextStep = () => {
  navigateTo('/onboarding/theme')
}
</script>

<style lang="scss">
.splash-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  background: #020403;
  color: #f8f8f7;
}

.spacer {
  flex: 1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  .logo-box {
    width: 192px;
    height: 192px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin: 0 0 0.5rem 0;
  }

  .subtitle {
    font-size: 0.875rem;
    text-align: center;
    opacity: 0.7;
    padding: 0 0.5rem;
    margin: 0;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;

  .btn-primary {
    width: 100%;
    background-color: #dcf238;
    color: #020403;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken(#dcf238, 20%);
    }
  }

  .disclaimer {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: 1rem;
  }
}
</style>