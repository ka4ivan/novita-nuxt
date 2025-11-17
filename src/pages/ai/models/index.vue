<script setup lang="ts">
import { ref } from 'vue';

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Моделі" },
]);

const models = ref([]);

const { data, error } = await $api().ai.myModels({});

if (!error.value && data.value) {
  models.value = data.value?.data || [];
}
</script>

<template>
  <main class="main">
    <section class="ai-model">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <div class="ai-model__header">
          <h1 class="ai-model__title">Власні моделі</h1>
          <NuxtLink class="ai-model__create-btn" to="/ai/models/create">
            Створити модель
          </NuxtLink>
        </div>

        <div v-if="models.length === 0" class="ai-model__empty">
          <BaseIconSvg
              icon-name="ai-unknown"
              customClass="ai-model__empty-icon"
              width="9rem"
              height="9rem"
          />
          <h2 class="ai-model__empty-title">У вас ще немає моделей</h2>

          <NuxtLink class="ai-model__empty-link" to="/ai/models/create">
            Створити власну модель
          </NuxtLink>
        </div>

        <div v-else class="ai-model__grid">
          <div
              class="ai-model__card"
              v-for="model in models"
              :key="model.id"
          >
            <h2 class="ai-model__card-title">{{ model.name }}</h2>

            <div class="ai-model__images">
              <template v-for="group in model.data" :key="group.id">
                <BaseImageCard
                    v-for="media in group.images"
                    :key="media.id"
                    :id="media.id"
                    :src="media.url"
                    :isFavorite="media.states.is_favorite"
                    :onZoomSrc="media.url"
                    class="ai-model__image"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>