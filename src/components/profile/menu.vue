<script setup lang="ts">
import { useProfileStore } from '~/store/profile'

const profileStore = useProfileStore()
const router = useRouter()

const menuTabs = ref([
  {
    name: 'profile',
    label: 'Профіль',
    icon: 'profile',
    link: '/profile',
    width: '1.2rem',
    height: '1.2rem',
  },
  {
    name: 'favorites',
    label: 'Обрані',
    icon: 'heart',
    link: '/profile/favorites',
    width: '1.25rem',
    height: '1.25rem',
  },
  {
    name: 'jobs',
    label: 'Роботи',
    icon: 'image',
    link: '/profile/jobs',
    width: '1.5rem',
    height: '1.5rem',
  },
  {
    name: 'logout',
    label: 'Вийти',
    icon: 'logout',
    link: '/logout',
    width: '1.5rem',
    height: '1.5rem',
  },
])

async function logOut() {
  try {
    const authToken = useCookie('auth_token')
    if (authToken.value) {
      await $api().auth.logOut({
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken.value}` },
      })
    }
    authToken.value = null
    profileStore.resetProfile?.()
    await router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<template>
  <nav class="profile__menu">
    <ul class="profile__menu-list">
      <li
          v-for="item in menuTabs"
          :key="item.name"
          class="profile__menu-item"
      >
        <!-- Logout -->
        <button
            v-if="item.name === 'logout'"
            class="profile__menu-link"
            @click="logOut"
        >
          <BaseIconSvg
              :icon-name="item.icon"
              class="profile__menu-link-icon"
              :width="item.width"
              :height="item.height"
          />
          {{ item.label }}
        </button>

        <!-- Link -->
        <NuxtLink
            v-else
            class="profile__menu-link"
            :to="item.link"
            active-class="is-active"
        >
          <BaseIconSvg
              :icon-name="item.icon"
              class="profile__menu-link-icon"
              :width="item.width"
              :height="item.height"
          />
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>