<script setup>
import { useHeaderState } from '~/composables/useHeaderState'
import { useModalStore } from "~/store/modal";
import { ref, onMounted, onUnmounted } from 'vue'

const { isCustom } = useHeaderState()
const { isFixed } = useHeaderState()
const isScrolled = ref(false)
const modalStore = useModalStore();
const authToken = useCookie("auth_token");
const store = $store();
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { 'header--custom': isCustom && !isScrolled, 'header--fixed': isFixed }]">
    <div class="header__container container">
      <div class="header__links">
        <NuxtLink to="/" class="header__logo">
          <BaseIconSvg
              icon-name="logo"
              customClass="icon-logo"
              width="4rem"
              height="4rem"
          />
        </NuxtLink>

        <nav class="header__nav">
          <ul class="header__menu">
            <li class="header__menu-item-primary">
              <NuxtLink class="header__menu-link-primary" to="/contacts">Контакти</NuxtLink>
            </li>
            <li class="header__menu-item-primary">
              <NuxtLink class="header__menu-link-primary" to="/about">Про Нас</NuxtLink>
            </li>
            <li class="header__menu-item-secondary">
              <NuxtLink class="header__menu-link-secondary" to="/ai">
                AI Generation
                <BaseIconSvg
                    icon-name="circle-dots"
                    customClass="icon-circle-dots"
                    width="16px"
                    height="16px"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header__profile">
        <nav class="header__nav">
          <ul class="header__menu"
              v-if="!authToken"
          >
            <li class="header__menu-item-primary">
              <button class="header__menu-link-primary"
                      aria-label="Увійти"
                      @click="modalStore.toggleSignInModal()"
              >
                Увійти
              </button>
            </li>
            <li class="header__menu-item-secondary">
              <NuxtLink class="header__menu-link-secondary" to="/sign-up">Створити акаунт</NuxtLink>
            </li>
          </ul>
          <div class="header__profile"
               v-else
          >
            <NuxtLink class="header__profile-link" to="/profile">
              <div class="header__profile-link-text">
                <span class="header__profile-link-text-name">
                  {{ store.profile.userProfile?.name || "Profile" }}
                </span>
                <span class="header__profile-link-text-email">
                  {{ store.profile.userProfile?.email || "" }}
                </span>
              </div>
              <nuxt-img
                  format="webp"
                  densities="x1 x1"
                  placeholder="/images/noImg.webp"
                  :src="store.profile.userProfile?.avatar?.url"
                  alt="profile"
                  width="36"
                  height="36"
                  class="header__profile-link-img"
              >
              </nuxt-img>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
