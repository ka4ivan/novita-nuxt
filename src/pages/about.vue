<script setup lang="ts">
const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Про нас" },
])

const features = [
  {
    number: '01',
    title: 'Розвинені алгоритми ШІ',
    text: 'Наша передова технологія ШІ використовує глибоке навчання та нейронні мережі для розуміння та створення високоякісних візуалізацій на основі введених даних користувача.'
  },
  {
    number: '02',
    title: 'Кастомізація та гнучкість',
    text: 'На відміну від традиційних стокових медіа, Novita дозволяє виконувати глибоку кастомізацію, забезпечуючи повну відповідність візуалів вимогам вашого проєкту.'
  },
  {
    number: '03',
    title: 'Інновації та якість',
    text: 'Ми постійно оновлюємо наші алгоритми, щоб покращувати якість і різноманітність доступних візуалів, гарантуючи доступ до найновіших технологій генерації.'
  },
  {
    number: '04',
    title: 'Розвиток ШІ',
    text: 'Novita зобов’язується відповідально розвивати технології ШІ - ми регулярно переглядаємо та оновлюємо алгоритми, щоб уникати упереджень, забезпечувати справедливість і підтримувати інклюзивність створених візуалів.'
  }
];
</script>

<template>
  <main class="main">
    <section class="about__intro">
      <div class="container about__intro-breadcrumbs">
        <BaseBreadCrumbs :links="breadcrumbs" theme="light" />
      </div>
      <div class="container about__hero">
        <div class="about__hero-bg">
          <h1 class="about__hero__title">
            Про Нас
          </h1>
          <div class="about__hero__description">
            <p class="about__hero__subtitle">
              Novita — це місце, де ви знайдете високоякісні стокові зображення на різні теми. Ми гордимося тим, що можемо бути надійним джерелом для всіх ваших потреб у візуальному контенті.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="about__design">
      <div class="container">
        <p class="about__design-text">
          Привіт👋 У Novita ми створили колекцію, яка ідеально підходить для
          <span class="about__design-accent_button">
            контент-кріейторів
          </span>  <br>
          Вона допомагає створювати <br>
          <span class="about__design-accent_text">
            чудові
          </span>
          ✨ дизайнерські концепції для ваших
          <span class="about__design-accent_button">
            клієнтів
          </span>
        </p>
      </div>
    </section>

    <section class="about__together">
      <div class="container">
        <div class="about__together-wrapper">
          <div class="about__together-card__img">
            <img alt="about_us_background" class="about__together-card__img-image" src="/images/about_us_background.png">
          </div>
          <div class="about__together-card__title">
            <h2 class="about__together-card__title-title">
              Створімо щось <br> неймовірне разом!
            </h2>
          </div>
          <div
              v-for="feature in features"
              :key="feature.number"
              class="about__together-card__text"
          >
            <span class="about__together-card__text-feature">
              Особливість ({{ feature.number }})
            </span>

            <h3 class="about__together-card__text-title">
              {{ feature.title }}
            </h3>

            <p class="about__together-card__text-text">
              {{ feature.text }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>