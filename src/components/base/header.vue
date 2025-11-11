<script setup>
import { useHeaderState } from '~/composables/useHeaderState'
import { useModalStore } from "~/store/modal";
import { useProfileStore } from "~/store/profile";
import { ref, onMounted, onUnmounted } from 'vue'

const { isCustom } = useHeaderState()
const { isFixed } = useHeaderState()
const isScrolled = ref(false)
const modalStore = useModalStore();
const authToken = useCookie("auth_token");
const profileStore = useProfileStore();
const avatarUrl = computed(() => profileStore.userProfile?.avatar?.url || '/images/noImg.webp')
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}
const isHoveredSubmenu = ref(false)
const handleMouseEnter = () => {
  isHoveredSubmenu.value = true
}
const handleMouseLeave = () => {
  isHoveredSubmenu.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
    () => useCookie('auth_token').value,
    async (newVal) => {
      if (newVal) {
        await profileStore.getUserProfile()
      }
    },
    { immediate: true }
)
</script>

<template>
  <header
      :class="[
    'header',
    {
      'header--fixed': isFixed,
      'header--custom': isCustom && !isScrolled && !isHoveredSubmenu,
    },
  ]"
  >
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
            <li
                class="header__menu-item-secondary"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
            >
              <NuxtLink class="header__menu-link-secondary" to="/ai/txt2img">
                AI Generation
                <BaseIconSvg
                    icon-name="circle-dots"
                    customClass="icon-circle-dots"
                    width="16px"
                    height="16px"
                />
              </NuxtLink>
              <ul class="header__submenu">
                <li class="header__submenu-item">
                  <ul class="header__submenu-list">
                    <li class="header__submenu-list-item">
                      <a href="/ai/txt2img" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Текст в зображення</h4>
                          <span class="header__submenu-badge">🔥 TOP</span>
                        </div>
                        <p class="header__submenu-description">
                          Генерувати зображення на основі текстового опису
                        </p>
                      </a>
                    </li>
                    <li class="header__submenu-list-item">
                      <a href="/ai/img2img" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Зображення в зображення</h4>
                        </div>
                        <p class="header__submenu-description">
                          Генерувати зображення на основі інших зображень
                        </p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="header__submenu-item">
                  <ul class="header__submenu-list">
                    <li class="header__submenu-list-item">
                      <a href="/ai/remove-background" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Видалити фон</h4>
                        </div>
                        <p class="header__submenu-description">
                          Виділіть об’єкти, видаливши фон із зображення
                        </p>
                      </a>
                    </li>
<!--                    <li class="header__submenu-list-item">-->
<!--                      <a href="/ai/replace-background" class="header__submenu-link">-->
<!--                        <div class="header__submenu-link-info">-->
<!--                          <h4 class="header__submenu-title">Замінити фон</h4>-->
<!--                        </div>-->
<!--                        <p class="header__submenu-description">-->
<!--                          Вставте новий фон замість наявного-->
<!--                        </p>-->
<!--                      </a>-->
<!--                    </li>-->
                    <li class="header__submenu-list-item">
                      <a href="/ai/replace-background" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Видалити текст</h4>
                        </div>
                        <p class="header__submenu-description">
                          Видаліть текст із зображення, зберігаючи його фон
                        </p>
                      </a>
                    </li>

                    <li class="header__submenu-list-item">
                      <a href="/ai/models" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Власні моделі</h4>
                        </div>
                        <p class="header__submenu-description">
                          Перегляньте моделі, що були створені вами
                        </p>
                      </a>
                    </li>
                    <li class="header__submenu-list-item">
                      <a href="/ai/models/create" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Створити власну модель</h4>
                        </div>
                        <p class="header__submenu-description">
                          Створіть унікальну модель відповідно до ваших потреб
                        </p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="header__submenu-item">
                  <ul class="header__submenu-list">
                    <li class="header__submenu-list-item">
                      <a href="/ai/upscale" class="header__submenu-link">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Upscale</h4>
                        </div>
                        <p class="header__submenu-description">
                          Підвищити роздільну здатність і чіткість зображення
                        </p>
                      </a>
                    </li>
<!--                    <li class="header__submenu-list-item">-->
<!--                      <a href="/ai/merge-face" class="header__submenu-link">-->
<!--                        <div class="header__submenu-link-info">-->
<!--                          <h4 class="header__submenu-title">З'єднати обличчя</h4>-->
<!--                        </div>-->
<!--                        <p class="header__submenu-description">-->
<!--                          Поєднайте риси обличчя з різних зображень в одне обличчя-->
<!--                        </p>-->
<!--                      </a>-->
<!--                    </li>-->
                  </ul>
                </li>
              </ul>
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
                  {{ profileStore.userProfile?.name || "Profile" }} {{ profileStore.userProfile?.lastname || ""}}
                </span>
                <span class="header__profile-link-text-email">
                  {{ profileStore.userProfile?.email || "" }}
                </span>
              </div>
              <nuxt-img
                  format="webp"
                  densities="x1 x1"
                  placeholder="/images/noImg.webp"
                  :src="avatarUrl"
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
