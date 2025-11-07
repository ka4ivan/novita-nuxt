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
  </main>
</template>

<style scoped>

</style>