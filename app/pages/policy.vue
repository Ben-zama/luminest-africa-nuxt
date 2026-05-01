<template>
  <main class="privacy-screen">
    
    <!-- Sticky Header -->
    <header class="privacy-header">
      <div class="header-content">
        <NuxtLink to="/profile" class="btn-back">
          <Icon name="material-symbols:chevron-left" /> Back
        </NuxtLink>
        <h1 class="header-title">Privacy Policy</h1>
        <div class="header-spacer"></div>
      </div>
    </header>

    <!-- Content Area -->
    <div class="privacy-content">
      <p class="last-updated">Last updated: April 2026</p>

      <section class="policy-section">
        <h2 class="section-title">1. Introduction</h2>
        <p class="section-text">
          Welcome to the Power Schedule App. We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our web application.
        </p>
      </section>

      <section class="policy-section">
        <h2 class="section-title">2. Information We Collect</h2>
        <p class="section-text">We only collect the minimum amount of information required to make the app function:</p>
        <ul class="policy-list">
          <li><strong>Phone Number:</strong> We use your number solely to verify your account via OTP. We never share it.</li>
          <li><strong>Display Name:</strong> Your name is only visible to you and the system administrator. It is not shown publicly.</li>
          <li><strong>Location Zones:</strong> We record the neighbourhoods (zones) you select so we can show you relevant power updates.</li>
        </ul>
      </section>

      <section class="policy-section">
        <h2 class="section-title">3. Anonymity of Reports</h2>
        <p class="section-text">
          When you tap to report that the light just came on or went off, that data is submitted anonymously. No name is attached to your report in the public area feed. Your reports are used strictly to calculate the schedule patterns for your community.
        </p>
      </section>

      <section class="policy-section">
        <h2 class="section-title">4. Data Deletion and NDPR Compliance</h2>
        <p class="section-text">
          In compliance with the Nigeria Data Protection Regulation (NDPR), you have the right to request the deletion of your personal data. You can permanently delete your account and all associated personal identifiers at any time directly from the Profile screen.
        </p>
      </section>

      <section class="policy-section">
        <h2 class="section-title">5. Push Notifications</h2>
        <p class="section-text">
          We use the Web Push API to deliver timely alerts to your device. We do not track your background location. Notifications only function based on the explicit preferences you toggle in your settings.
        </p>
      </section>

      <section class="policy-section">
        <h2 class="section-title">6. Contact Us</h2>
        <p class="section-text">
          If you have any questions about this Privacy Policy or how your data is handled, please contact the system administrator (Uncle Dee).
        </p>
      </section>
    </div>

  </main>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})
</script>

<style lang="scss" scoped>
.privacy-screen {
  min-height: 100dvh;
  background-color: var(--color-background);
  color: var(--color-text);
}

/* Sticky Header */
.privacy-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-primary);

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    height: 64px;
  }

  .header-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-background);
    margin: 0;
  }

  .btn-back {
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    color: var(--color-background);
    border-radius: 12px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    gap: 0.25rem;

    &:hover {
        background-color: color-mix(in srgb, var(--color-background) 35%, transparent);
    }
  }

  .header-spacer {
    width: 60px;
  }
}

/* Privacy Content */
.privacy-content {
  padding: 1.5rem;
  line-height: 1.6;

  .last-updated {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-bottom: 2rem;
  }
}

.policy-section {
  margin-bottom: 2rem;

  .section-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .section-text {
    font-size: 1rem;
    opacity: 0.8;
    margin-bottom: 1rem;
  }
}

.policy-list {
  padding-left: 1.25rem;
  margin-bottom: 1rem;
  opacity: 0.8;

  li {
    margin-bottom: 0.75rem;
    list-style-type: disc;
    
    strong {
      font-weight: 700;
      opacity: 1;
    }
  }
}
</style>