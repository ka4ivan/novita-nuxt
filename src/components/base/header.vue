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
const isMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const activeSubmenu = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleSubmenu = (index) => {
  activeSubmenu.value = activeSubmenu.value === index ? null : index
}

const closeMenu = () => {
  isMenuOpen.value = false
  activeSubmenu.value = null
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
                      <NuxtLink class="header__submenu-link" to="/ai/txt2img">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Текст в зображення</h4>
                          <span class="header__submenu-badge">🔥 TOP</span>
                        </div>
                        <p class="header__submenu-description">
                          Генерувати зображення на основі текстового опису
                        </p>
                      </NuxtLink>
                    </li>
                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/img2img">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Зображення в зображення</h4>
                        </div>
                        <p class="header__submenu-description">
                          Генерувати зображення на основі інших зображень
                        </p>
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <li class="header__submenu-item">
                  <ul class="header__submenu-list">
                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/remove-background">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Видалити фон</h4>
                        </div>
                        <p class="header__submenu-description">
                          Виділіть об’єкти, видаливши фон із зображення
                        </p>
                      </NuxtLink>
                    </li>
<!--                    <li class="header__submenu-list-item">-->
<!--                      <NuxtLink class="header__submenu-link" to="/ai/replace-background">-->
<!--                        <div class="header__submenu-link-info">-->
<!--                          <h4 class="header__submenu-title">Замінити фон</h4>-->
<!--                        </div>-->
<!--                        <p class="header__submenu-description">-->
<!--                          Вставте новий фон замість наявного-->
<!--                        </p>-->
<!--                      </NuxtLink>-->
<!--                    </li>-->
                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/remove-text">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Видалити текст</h4>
                        </div>
                        <p class="header__submenu-description">
                          Видаліть текст із зображення, зберігаючи його фон
                        </p>
                      </NuxtLink>
                    </li>

                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/models">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Власні моделі</h4>
                        </div>
                        <p class="header__submenu-description">
                          Перегляньте моделі, що були створені вами
                        </p>
                      </NuxtLink>
                    </li>
                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/models/create">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Створити власну модель</h4>
                        </div>
                        <p class="header__submenu-description">
                          Створіть унікальну модель відповідно до ваших потреб
                        </p>
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <li class="header__submenu-item">
                  <ul class="header__submenu-list">
                    <li class="header__submenu-list-item">
                      <NuxtLink class="header__submenu-link" to="/ai/upscale">
                        <div class="header__submenu-link-info">
                          <h4 class="header__submenu-title">Upscale</h4>
                        </div>
                        <p class="header__submenu-description">
                          Підвищити роздільну здатність і чіткість зображення
                        </p>
                      </NuxtLink>
                    </li>
<!--                    <li class="header__submenu-list-item">-->
<!--                      <NuxtLink class="header__submenu-link" to="/ai/merge-face">-->
<!--                        <div class="header__submenu-link-info">-->
<!--                          <h4 class="header__submenu-title">З'єднати обличчя</h4>-->
<!--                        </div>-->
<!--                        <p class="header__submenu-description">-->
<!--                          Поєднайте риси обличчя з різних зображень в одне обличчя-->
<!--                        </p>-->
<!--                      </NuxtLink>-->
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

    <div class="header__container-mobile container">
      <NuxtLink to="/" class="header__logo">
        <BaseIconSvg
            icon-name="logo"
            customClass="icon-logo"
            width="3rem"
            height="3rem"
        />
      </NuxtLink>

      <div class="header__mobile-buttons">
        <div class="burger__menu" @click="toggleMobileMenu">
          <span :class="['burger__menu-line', { 'burger__menu-line-rotate': isMenuOpen }]"></span>
          <span :class="['burger__menu-line', { 'burger__menu-line-rotate': isMenuOpen }]"></span>
        </div>
      </div>

      <div :class="['mobile__menu', { 'mobile__menu-show': isMenuOpen }]">
        <div class="mobile__menu-wrapper">
          <div class="mobile__menu-container">
            <div class="mobile__menu-content">
              <div class="mobile__menu-navigation">
                <div class="mobile__menu-logo">
                  <NuxtLink to="/" class="header__logo" @click="closeMenu">
                    <BaseIconSvg
                        icon-name="logo"
                        customClass="icon-logo"
                        width="3rem"
                        height="3rem"
                    />
                  </NuxtLink>
                </div>
                <div class="mobile__menu-user"
                     v-if="authToken"
                >
                  <NuxtLink class="mobile__menu-user__link" to="/profile" @click="closeMenu">
                    <nuxt-img
                        format="webp"
                        densities="x1 x1"
                        placeholder="/images/noImg.webp"
                        :src="avatarUrl"
                        alt="profile"
                        width="36"
                        height="36"
                        class="mobile__menu-user__img"
                    >
                    </nuxt-img>
                    <span class="mobile__menu-user__text">
                      {{ profileStore.userProfile?.name || "Profile" }} {{ profileStore.userProfile?.lastname || ""}}
                    </span>
                  </NuxtLink>
                </div>
                <div class="mobile__menu-guest"
                    v-else
                >
                  <div class="mobile__menu-guest__links">
                    <button class="mobile__menu-guest__links-item"
                            aria-label="Увійти"
                            @click="modalStore.toggleSignInModal(); closeMenu()"
                    >
                      Увійти
                    </button>
                    <span class="mobile__menu-guest__links-separator">|</span>
                    <NuxtLink class="mobile__menu-guest__links-item" to="/sign-up" @click="closeMenu">Створити акаунт</NuxtLink>
                  </div>
                  <span class="mobile__menu-guest__text">Увійдіть щоб мати більше можливостей</span>
                </div>
                <ul class="mobile__menu-list">
                  <li
                      class="mobile__menu-item__has-children"
                      @click="toggleSubmenu(0)"
                  >
                    <span class="mobile__menu-link">
                      AI Generation
                      <BaseIconSvg
                          icon-name="eter-chevron-right"
                          class="mobile__menu-link__icon"
                          width="0.75rem"
                          height="0.75rem"
                      />
                    </span>
                    <ul
                        :class="[
                      'mobile__submenu-list',
                      { 'mobile__submenu-list-active': activeSubmenu === 0 }
                    ]"
                    >
                      <li class="mobile__submenu-item__back" @click.stop="activeSubmenu = null">
                        <BaseIconSvg
                            icon-name="arrow-right"
                            customClass="mobile__submenu-item__back-icon"
                            width="1rem"
                            height="1rem"
                        />
                        Назад до меню
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink class="mobile__submenu-link" to="/ai/txt2img" @click="closeMenu">
                          Текст в зображення
                          <p class="mobile__submenu-link__desc">
                            Генерувати зображення на основі текстового опису
                          </p>
                        </NuxtLink>
                      </li>


                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/img2img"
                            @click="closeMenu"
                        >
                          Зображення в зображення
                          <p class="mobile__submenu-link__desc">
                            Генерувати зображення на основі інших зображень
                          </p>
                        </NuxtLink>
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/remove-background"
                            @click="closeMenu"
                        >
                          Видалити фон
                          <p class="mobile__submenu-link__desc">
                            Виділіть об’єкти, видаливши фон із зображення
                          </p>
                        </NuxtLink>
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/remove-text"
                            @click="closeMenu"
                        >
                          Видалити текст
                          <p class="mobile__submenu-link__desc">
                            Видаліть текст із зображення, зберігаючи його фон
                          </p>
                        </NuxtLink>
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/models"
                            @click="closeMenu"
                        >
                          Власні моделі
                          <p class="mobile__submenu-link__desc">
                            Перегляньте моделі, що були створені вами
                          </p>
                        </NuxtLink>
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/models/create"
                            @click="closeMenu"
                        >
                          Створити власну модель
                          <p class="mobile__submenu-link__desc">
                            Створіть унікальну модель відповідно до ваших потреб
                          </p>
                        </NuxtLink>
                      </li>

                      <li class="mobile__submenu-item">
                        <NuxtLink
                            class="mobile__submenu-link"
                            to="/ai/upscale"
                            @click="closeMenu"
                        >
                          Upscale
                          <p class="mobile__submenu-link__desc">
                            Підвищити роздільну здатність і чіткість зображення
                          </p>
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li class="mobile__menu-item">
                    <NuxtLink class="mobile__menu-link" to="/about" @click="closeMenu">
                      Про Нас
                    </NuxtLink>
                  </li>
                  <li class="mobile__menu-item">
                    <NuxtLink class="mobile__menu-link" to="/contacts" @click="closeMenu">
                      Контакти
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div :class="['mobile__menu-overlay', { 'mobile__menu-overlay-show': isMenuOpen }]" @click="closeMenu"></div>
      </div>
    </div>
  </header>
</template>
