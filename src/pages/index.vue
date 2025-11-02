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
    <section class="main__tools">
      <div class="main__tools-container container">
        <div class="main__tools-card">
          <div class="main__tools-card-badge">
            <BaseIconSvg
                icon-name="library"
                customClass="main__tools-card-badge-icon"
                width="1.2rem"
                height="1.2rem"
            />
            <h4 class="main__tools-card-badge-text">бібліотека</h4>
          </div>
          <h2 class="main__tools-card-title">Велика бібліотека контенту</h2>
          <p class="main__tools-card-text">
            Отримайте доступ до величезної бібліотеки, наповненої різноманітним високоякісним контентом, створеним для втілення ваших творчих ідей. Маючи під рукою тисячі фотографій, векторних зображень та ілюстрацій, ви завжди знайдете ідеальне візуальне рішення для своїх проектів.
          </p>
          <div class="main__tools-card-bottom">
            <span class="main__tools-card-tag">Фото</span>
            <span class="main__tools-card-tag">Вектори</span>
            <span class="main__tools-card-tag">Ілюстації</span>
          </div>
        </div>
        <div class="main__tools-card">
          <div class="main__tools-card-badge">
            <BaseIconSvg
                icon-name="fast"
                customClass="main__tools-card-badge-icon"
                width="1.2rem"
                height="1.2rem"
            />
            <h4 class="main__tools-card-badge-text">швидкість</h4>
          </div>
          <h2 class="main__tools-card-title">Швидка генерація за допомогою ШІ</h2>
          <p class="main__tools-card-text">
            Швидка генерація фото за допомогою ШІ дозволяє миттєво створювати візуальний контент на основі текстових описів, відкриваючи нові горизонти для креативних проектів.
          </p>
          <div class="main__tools-card-bottom">
            <NuxtLink class="main__tools-card-button" to="/ai/txt2img">
              Спробувати зараз
              <BaseIconSvg
                  icon-name="search"
                  customClass="main__tools-card-button-icon"
                  width="16px"
                  height="16px"
              />
            </NuxtLink>
          </div>
        </div>
        <div class="main__tools-card main__tools-card-last">
          <div class="main__tools-card-info">
            <div class="main__tools-card-badge">
              <BaseIconSvg
                  icon-name="generate"
                  customClass="main__tools-card-badge-icon"
                  width="1.2rem"
                  height="1.2rem"
              />
              <h4 class="main__tools-card-badge-text">генерування</h4>
            </div>
            <h2 class="main__tools-card-title">10+ інструментів штучного інтелекту</h2>
            <p class="main__tools-card-text">
              10+ інструментів штучного інтелекту для генерації фото дозволяють створювати реалістичні або художні зображення на основі текстових описів, відкриваючи безмежні можливості для творчості та дизайну.
            </p>
          </div>
          <div class="main__tools-card-nav">
            <NuxtLink class="main__tools-card-tag" to="/ai/txt2img">
              Зображення із тексту
            </NuxtLink>
            <NuxtLink class="main__tools-card-tag" to="/ai/img2img">
              Зображення із зображення
            </NuxtLink>
            <NuxtLink class="main__tools-card-tag" to="/ai/remove-text">
              Прибрати текст
            </NuxtLink>
            <NuxtLink class="main__tools-card-tag" to="/ai/replace-background">
              Замінити фон
            </NuxtLink>
            <NuxtLink class="main__tools-card-tag" to="/ai/merge-face">
              Об'єднати обличчя
            </NuxtLink>
            <NuxtLink class="main__tools-card-tag" to="/ai/upscale">
              Покращити якість
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
