<script setup lang="ts">
const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Контакти" },
]);
</script>

<template>
  <section class="typography">
    <div class="container">
      <BaseBreadCrumbs :links="breadcrumbs" />

      <div class="contacts">
        <div class="typography__wrapper">
          <h1 class="typography__title">Зв'яжіться з нами</h1>

          <p class="typography__text">
            Ми завжди раді отримувати від вас зворотний зв’язок! В Novita ваша
            думка, запитання та можливості співпраці є надзвичайно важливими для нас.
            Наша професійна та відкрита команда готова підтримати вас у будь-який спосіб.
            Будь ласка, не соромтеся зв’язатися з нами, використовуючи інформацію нижче.
          </p>

          <h2 class="typography__subtitle">Підтримка клієнтів</h2>

          <p class="typography__text">
            Якщо у вас виникли питання, пов’язані з нашим вебсайтом, тарифними планами
            або вам потрібна допомога з акаунтом — наша дружня команда з радістю допоможе.
            Ви можете звʼязатися з нами електронною поштою:
            <a href="mailto:ka4ivan.dev@gmail.com" class="typography__link">ka4ivan.dev@gmail.com</a>
            у робочі години: з понеділка по п’ятницю, з 9:00 до 18:00 (GMT).
          </p>

          <h2 class="typography__subtitle">Співпраця та партнерства</h2>

          <p class="typography__text">
            Ми любимо співпрацювати з талановитими фотографами, контент-кріейтерами
            та бізнесами. Якщо ви зацікавлені в партнерстві з Novita або маєте
            пропозиції для взаємодії, звʼяжіться з нами:
            <a href="mailto:ka4ivan.dev@gmail.com" class="typography__link">ka4ivan.dev@gmail.com</a>.
            Ми з радістю розглянемо креативні ідеї та можливості співпраці.
          </p>

          <h2 class="typography__subtitle">Преса та медіа</h2>

          <p class="typography__text">
            Для організації пресрелізів, запитів на медіаматеріали або інтерв’ю —
            надішліть лист нашим медіаконсультантам на:
            <a href="mailto:ka4ivan.dev@gmail.com" class="typography__link">ka4ivan.dev@gmail.com</a>.
            Ми з радістю надамо всю необхідну інформацію та допоможемо з медіа-підтримкою.
          </p>

          <h2 class="typography__subtitle">Загальні запити</h2>

          <p class="typography__text">
            Якщо у вас є будь-які інші запити, пропозиції або відгуки — пишіть нам на:
            <a href="mailto:ka4ivan.dev@gmail.com" class="typography__link">ka4ivan.dev@gmail.com</a>.
            Ми цінуємо вашу активність і постійно працюємо над покращенням сервісу
            на основі вашого досвіду.
          </p>

          <h2 class="typography__subtitle">Соціальні мережі</h2>

          <p class="typography__text">
            Будьте з нами на зв’язку через соціальні мережі, щоб отримувати новини,
            візуальне натхнення та ексклюзивні пропозиції. Ви можете знайти нас у
            Twitter, Facebook, LinkedIn та Instagram. Не забувайте підписуватися,
            лайкати та ділитися вашим досвідом використання Novita з нами
            та спільнотою.
          </p>

          <p class="typography__text">
            Ми раді бути частиною вашого творчого шляху. Ваша задоволеність та
            залученість — наш пріоритет. Давайте звʼяжемось і створимо щось
            дійсно неймовірне разом!
          </p>
        </div>
        <div class="contacts__info">
          <h3 class="contacts__title">
            Лишились питання?
          </h3>
          <h2 class="contacts__email">Email: <a href="mailto:ka4ivan.dev@gmail.com" class="typography__link">ka4ivan.dev@gmail.com</a></h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>