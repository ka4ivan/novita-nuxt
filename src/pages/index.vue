<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useHeaderState } from '~/composables/useHeaderState'

const { isCustom } = useHeaderState()

onMounted(() => {
  isCustom.value = true
})

onUnmounted(() => {
  isCustom.value = false
});
</script>

<template>
  <main class="main">
    <section class="main__hero">
      <div class="main__hero-background">
        <video class="main__hero-background-video" autoplay muted loop>
          <source src="/video/background.mp4" type="video/mp4">
        </video>
      </div>
      <div class="main__hero-container container">
        <div class="main__hero-title">
          <h1 class="main__hero-title-text">
            Унікальні <span>зображення</span> та <span>інструменти ШІ</span>, що надихають на творчість
          </h1>
          <div class="main__hero-buttons">
            <NuxtLink class="main__hero-buttons-link main__hero-buttons-link-try" to="/ai/txt2img">
              Генерувати фото
              <BaseIconSvg
                  icon-name="arrow-right"
                  customClass="main__hero-buttons-link-arrow-right-icon"
                  width="1.5rem"
                  height="1.5rem"
              />
            </NuxtLink>
            <NuxtLink class="main__hero-buttons-link main__hero-buttons-link-library" to="/my/library">
              Бібліотека
            </NuxtLink>
          </div>
        </div>
        <div class="main__hero-featured">
          <div class="main__hero-featured-container">
            <span class="main__hero-featured-title">Рекомендовані інструменти ШІ</span>
            <div class="main__hero-featured-links">
              <NuxtLink class="main__hero-featured-link" to="/ai/txt2img">
                <NuxtImg
                    class="main__hero-featured-link-img"
                    :src="'/images/main/main__hero-featured-link-1.jpg'"
                />
                <span class="main__hero-featured-link-gradient"></span>
                <div class="main__hero-featured-link-description">
                  <span class="main__hero-featured-link-description-text">
                    Текст в зображення
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="main__hero-featured-link-description-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                  </span>
                </div>
              </NuxtLink>
              <NuxtLink class="main__hero-featured-link" to="/ai/remove-background">
                <NuxtImg
                    class="main__hero-featured-link-img"
                    :src="'/images/main/main__hero-featured-link-2.jpg'"
                />
                <span class="main__hero-featured-link-gradient"></span>
                <div class="main__hero-featured-link-description">
                  <span class="main__hero-featured-link-description-text">
                    Прибрати фон
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="main__hero-featured-link-description-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                  </span>
                </div>
              </NuxtLink>
              <NuxtLink class="main__hero-featured-link" to="/ai/img2img">
                <NuxtImg
                    class="main__hero-featured-link-img"
                    :src="'/images/main/main__hero-featured-link-3.jpg'"
                />
                <span class="main__hero-featured-link-gradient"></span>
                <div class="main__hero-featured-link-description">
                  <span class="main__hero-featured-link-description-text">
                    Зображення в зображення
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="main__hero-featured-link-description-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
