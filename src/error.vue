<script setup>


</script>

<template>
  <BaseHeader />

  <div class="container error__container">
    <h1 class="error__title">404</h1>

    <div class="error__subtitle">Сторінка не знайдена</div>

    <div class="error__text">Можливо, вона була видалена, або ви ввели неправильну адресу</div>

    <NuxtLink to="/" class="error__link">
      Перейти на головну
    </NuxtLink>
  </div>

  <BaseFooter />
</template>  