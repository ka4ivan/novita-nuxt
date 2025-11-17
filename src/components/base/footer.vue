<script setup>

</script>

<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__container container">
        <NuxtLink to="/" class="footer__logo">
          <BaseIconSvg
              icon-name="logo"
              customClass="footer__logo-icon"
              width="4rem"
              height="4rem"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="footer__medium">
      <div class="footer__container container">
        <div class="footer__columns footer__col-info">
          <div class="footer__col">
            <h3 class="footer__title">Отримуйте оновлення та ексклюзивні пропозиції</h3>
            <p class="footer__text">
              Отримуйте новини про нові функції, акції та пропозиції першими.
            </p>
          </div>
        </div>

        <div class="footer__columns footer__col-nav">
          <div class="footer__col">
            <h4 class="footer__heading">Інформація</h4>
            <ul class="footer__list">
              <NuxtLink class="footer__link" to="/about">Про Нас</NuxtLink>
              <NuxtLink class="footer__link" to="/contacts">Контакти</NuxtLink>
              <NuxtLink class="footer__link" to="/faq">FAQ</NuxtLink>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">Генерування зображень</h4>
            <ul class="footer__list">
              <NuxtLink class="footer__link" to="/ai/txt2img">Текст в зображення</NuxtLink>
              <NuxtLink class="footer__link" to="/ai/img2img">Зображення в зображення</NuxtLink>
              <NuxtLink class="footer__link" to="#">Image to image TODO</NuxtLink>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">Редагування зображень</h4>
            <ul class="footer__list">
              <NuxtLink class="footer__link" to="/ai/upscale">Upscale</NuxtLink>
              <NuxtLink class="footer__link" to="/ai/remove-background">Видалити фон</NuxtLink>
              <NuxtLink class="footer__link" to="/ai/remove-text">Видалити текст</NuxtLink>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">Власні моделі</h4>
            <ul class="footer__list">
              <NuxtLink class="footer__link" to="/ai/models/index">Список моделей</NuxtLink>
              <NuxtLink class="footer__link" to="/ai/models/create">Створити</NuxtLink>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__container footer__container--bottom container">
        <p class="footer__copyright">
          © 2025 Ka4ivan - Novita AI
        </p>
        <div class="footer__links">
          <NuxtLink class="footer__link" to="#">Правила використання</NuxtLink>
          <NuxtLink class="footer__link" to="#">Політика конфіденційності</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
