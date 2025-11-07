<script setup lang="ts">
const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Текст в зображення" },
]);
</script>

<template>
  <main class="main">
    <section class="ai__intro">
      <div class="ai__intro-bg">
        <video class="ai__intro-bg-video" autoplay muted loop>
          <source src="/video/background.mp4" type="video/mp4">
        </video>
      </div>
      <div class="ai__intro-overlay"></div>
      <div class="container ai__intro-container">
        <div class="ai__intro-content">
          <div class="ai__intro-inner">
            <BaseBreadCrumbs :links="breadcrumbs" />
            <h1 class="ai__intro-title">
              Текст в зображення
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section class="ai__generate">
      <div class="ai__generate-container container">
        <div class="ai__generate-settings">
          <div class="ai__generate-form">
            <div class="ai__generate-form__button-wrapper">
              <button type="submit" class="ai__generate-form__button">
                Згенерувати
              </button>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsInput
                    label="Модель"
                    name="model"
                    placeholder="Модель"
                    tooltip="Експериментуйте з різними моделями, які можна застосувати до вашого зображення"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>