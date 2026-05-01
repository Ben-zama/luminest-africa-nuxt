<template>
  <main class="edit-profile-screen">
    <!-- Top Toolbar -->
    <header class="settings-header">
      <NuxtLink to="/profile" class="btn-text">
        <Icon name="material-symbols:chevron-left" /> Back
      </NuxtLink>
      <h1 class="header-title">Edit Profile</h1>
      <button class="btn-text bold text-primary" @click="saveProfile">
        Save
      </button>
    </header>

    <!-- Avatar Upload Section -->
    <section class="avatar-upload-section">
      <div class="avatar-container">
        <div class="avatar-circle">
          <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="Profile" />
          <span v-else class="initial">{{ user.name.charAt(0) || "U" }}</span>
        </div>
        <button class="camera-btn" aria-label="Change picture">
          <Icon name="material-symbols:photo-camera" />
        </button>
      </div>
      <p class="upload-hint">Tap to change picture</p>
    </section>

    <!-- Form Section -->
    <div class="form-content">
      <!-- Full Name Input -->
      <section class="input-group">
        <label class="input-label">Full Name</label>
        <div class="input-wrapper">
          <input
            v-model="user.name"
            type="text"
            placeholder="What should we call you?"
            class="custom-input"
          />
        </div>
        <p class="input-hint">
          Only visible to you and the admin. Not shown publicly.
        </p>
      </section>

      <!-- Zones Management -->
      <section class="zones-management">
        <div class="section-header">
          <h2 class="section-subtitle">Registered Zones</h2>
          <button class="btn-add-zone">+ Add zone</button>
        </div>

        <div class="zones-list">
          <div
            v-for="(zone, index) in user.zones"
            :key="index"
            class="zone-card"
            :class="{ 'primary-zone': zone.isPrimary }"
          >
            <div class="zone-info">
              <div class="zone-name">{{ zone.name }}</div>
              <div class="zone-desc">{{ zone.description }}</div>
            </div>
            <div v-if="zone.isActive" class="active-badge">active</div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "empty",
});

const user = reactive({
  name: "Kanayo O. Kanayo",
  avatarUrl: "",
  zones: [
    {
      name: "Odenigwe",
      description: "Home - Primary zone",
      isActive: true,
      isPrimary: true,
    },
    {
      name: "UNN Main Campus",
      description: "School - Campus grid",
      isActive: true,
      isPrimary: false,
    },
  ],
});

const saveProfile = () => {
  console.log("Saving user data...", user);
  // Add GSAP success animation or logic here
};
</script>

<style lang="scss" scoped>
.edit-profile-screen {
  min-height: 100dvh;
  background-color: var(--color-background);
  color: var(--color-text);
}

/* Header Toolbar */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);

  .header-title {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .btn-text {
    padding: 0.25rem 0.5rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
    }

    &.bold {
      font-weight: 700;
    }
  }
}

/* Avatar Section */
.avatar-upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  .avatar-container {
    position: relative;
    margin-bottom: 0.75rem;
  }

  .avatar-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initial {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--color-background);
    }
  }

  .camera-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    background-color: var(--color-primary);
    color: var(--color-background);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .upload-hint {
    font-size: 0.8rem;
    opacity: 0.6;
  }
}

/* Form Styling */
.form-content {
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  .input-label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .custom-input {
    width: 100%;
    height: 50px;
    padding: 0 1rem;
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text);
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: var(--color-primary);
    }
  }

  .input-hint {
    font-size: 0.75rem;
    opacity: 0.5;
    margin-top: 0.5rem;
  }
}

/* Zone Management */
.zones-management {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1rem;
    font-weight: 500;
    font-weight: 700;
  }

  .btn-add-zone {
    padding: 0.25rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 16px;
    color: var(--color-primary);
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: color-mix(
        in srgb,
        var(--color-primary) 25%,
        transparent
      );
    }
  }

  .zones-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .zone-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;

    .zone-name {
      font-weight: 700;
      font-size: 1rem;
    }

    .zone-desc {
      font-size: 0.8rem;
      opacity: 0.6;
    }

    .active-badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      background-color: color-mix(in srgb, var(--color-text) 25%, transparent);
      color: var(--color-text);
      border-radius: 10px;
    }

    &.primary-zone {
      background-color: color-mix(
        in srgb,
        var(--color-primary) 15%,
        transparent
      );
      border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
      .active-badge {
        background-color: color-mix(
          in srgb,
          var(--color-primary) 25%,
          transparent
        );
        color: var(--color-primary);
      }
    }
  }
}
</style>