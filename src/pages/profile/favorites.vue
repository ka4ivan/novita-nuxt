<script setup lang="ts">
import { ref } from 'vue'

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Профіль" },
])

const favorites = ref([])

const { data, error } = await $api().favorites.getMedias({})

if (!error.value && data.value) {
  favorites.value = data.value?.data || []
}
</script>

<template>
  <main class="main">
    <section class="main__profile">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <h1 class="profile__title">Обрані</h1>

        <div class="profile__content">
          <ProfileMenu />

          <div class="favorites">
            <div class="favorites__wrapper">
              <div class="favorites__list">
                <BaseImageCard
                    v-for="media in favorites"
                    :key="media.id"
                    :id="media.id"
                    :src="media.url"
                    :isFavorite="media.states.is_favorite"
                    :onZoomSrc="media.url"
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
  .favorites {
    min-height: 50vh;
  }
</style>