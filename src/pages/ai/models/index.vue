<script setup lang="ts">
import { ref } from 'vue'

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 2, name: "Моделі" },
])
</script>

<template>
  <main class="main">
    <section class="ai_model">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <h1 class="ai_model__title">Власні моделі</h1>

        <div class="ai_model__empty">
          <div class="ai_model__empty-wrapper">
            <BaseIconSvg
                icon-name="ai-unknown"
                customClass="ai_model__empty-icon"
                width="10rem"
                height="10rem"
            />
            <h1 class="ai_model__empty-title">Ви ще не навчали моделі</h1>
            <a href="/ai/models/create" class="ai_model__empty-link">Створити власну модель</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>