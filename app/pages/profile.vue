<template>
  <main class="profile-screen">

    <!-- Profile Header -->
    <section class="profile-header">
      <NuxtLink to="/settings/profile" class="avatar-link">
        <div class="avatar">
          <span class="avatar-initial">K</span>
        </div>
      </NuxtLink>
      
      <div class="user-info">
        <h1 class="user-name">Kanayo O. Kanayo</h1>
        <p class="user-phone">+234 0812 345 6788</p>
      </div>

      <!-- Assuming you have this component migrated or will build it next -->
      <ThemeToggle />
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat-item">
        <div class="stat-value text-positive">47</div>
        <div class="stat-label">Reports</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">2</div>
        <div class="stat-label">Zones</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">14</div>
        <div class="stat-label">Days</div>
      </div>
    </section>

    <!-- Zones Section -->
    <section class="zones-section">
      <h2 class="section-title">My zones</h2>

      <div class="zone-list">
        <!-- Primary Zone -->
        <div class="zone-card primary-zone">
          <div class="zone-info">
            <div class="zone-name">Odenigwe</div>
            <div class="zone-desc">Home - Primary zone</div>
          </div>
          <div class="zone-badge">active</div>
        </div>

        <!-- Secondary Zone -->
        <div class="zone-card">
          <div class="zone-info">
            <div class="zone-name">UNN Main Campus</div>
            <div class="zone-desc">School - Campus grid</div>
          </div>
          <div class="zone-badge">active</div>
        </div>
      </div>

      <button class="btn-add-zone">
        + Add another zone
      </button>
    </section>

    <!-- Settings List -->
    <nav class="settings-list">
      <NuxtLink to="/settings/notifications" class="setting-item">
        Notification settings
      </NuxtLink>
      <NuxtLink to="/policy" class="setting-item">
        Privacy policy
      </NuxtLink>
      <button class="setting-item text-negative">
        Delete account
      </button>
    </nav>

  </main>
</template>

<script setup>
definePageMeta({
    layout: 'profile'
})
</script>

<style lang="scss" scoped>
.profile-screen {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Profile Header */
.profile-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;

  .avatar-link {
    text-decoration: none;
  }

  .avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: var(--color-info);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-initial {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .user-info {
    flex: 1;

    .user-name {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--color-text);
      margin: 0 0 0.125rem 0;
    }

    .user-phone {
      font-size: 0.875rem;
      color: var(--color-text);
      opacity: 0.6;
      margin: 0;
    }
  }
}

/* Stats Section */
.stats-section {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-text);

    &.text-positive {
      color: var(--color-primary);
    }
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text);
    opacity: 0.6;
  }
}

/* Zones Section */
.zones-section {
  padding: 0 1.5rem 1.5rem 1.5rem;

  .section-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    opacity: 0.6;
    margin: 0 0 1rem 0;
  }

  .zone-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .zone-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background-color: transparent;

    .zone-info {
      display: flex;
      flex-direction: column;
    }

    .zone-name {
      font-size: 1rem;
      font-weight: bold;
      color: var(--color-text);
      margin-bottom: 0.125rem;
    }

    .zone-desc {
      font-size: 0.75rem;
      color: var(--color-text);
      opacity: 0.6;
    }

    .zone-badge {
      background-color: color-mix(in srgb, var(--color-text) 20%, transparent);
      color: var(--color-text);
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }

    /* Primary Zone overrides */
    &.primary-zone {
      background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
      border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);

      .zone-badge {
        background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
        color: var(--color-primary);
      }
    }
  }

  .btn-add-zone {
    display: block;
    width: fit-content;
    margin: 1.5rem auto 0 auto;
    background: transparent;
    border: none;
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);
    }
  }
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  .setting-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    border-bottom: 1px solid var(--color-border);
    font-size: 1rem;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    text-align: left;
    transition: opacity 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: color-mix(in srgb, var(--color-text) 10%, transparent);
    }

    &.text-negative {
      color: var(--color-negative);
    }
  }
}
</style>