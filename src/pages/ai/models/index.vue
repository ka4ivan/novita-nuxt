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
    <section class="ai_model">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />
        <h1 class="ai_model__title">Власні моделі</h1>

        <!-- EMPTY STATE -->
        <div v-if="models.length === 0" class="ai_model__empty">
          <div class="ai_model__empty-wrapper">
            <BaseIconSvg
                icon-name="ai-unknown"
                customClass="ai_model__empty-icon"
                width="10rem"
                height="10rem"
            />
            <h1 class="ai_model__empty-title">Ви ще не навчали моделі</h1>
            <NuxtLink class="ai_model__empty-link" to="/ai/models/create">Створити власну модель</NuxtLink>
          </div>
        </div>

        <!-- MODELS LIST -->
        <div v-else class="ai_model__content">
          <ul class="ai_model__list">
            <li class="ai_model__item" v-for="model in models" :key="model.id">
              <h2 class="ai_model__item-title">
                {{ model.name }}
              </h2>

              <div class="ai_model__item-images">
                <template v-for="group in model.data" :key="group.id">
                  <BaseImageCard
                      v-for="media in group.images"
                      :key="media.id"
                      :id="media.id"
                      :src="media.url"
                      :isFavorite="media.states.is_favorite"
                      :onZoomSrc="media.url"
                  />
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>