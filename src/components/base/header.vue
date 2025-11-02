<script setup>
import { useHeaderState } from '~/composables/useHeaderState'
import { ref, onMounted, onUnmounted } from 'vue'

const { isCustom } = useHeaderState()
const isScrolled = ref(false)

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
  <header :class="['header', { 'header--custom': isCustom && !isScrolled }]">
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
          <ul class="header__menu">
            <li class="header__menu-item-primary">
              <NuxtLink class="header__menu-link-primary" to="/sign-in">Увійти</NuxtLink>
            </li>
            <li class="header__menu-item-secondary">
              <NuxtLink class="header__menu-link-secondary" to="/sign-up">Створити акаунт</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
