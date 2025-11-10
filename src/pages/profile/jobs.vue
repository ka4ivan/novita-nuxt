<script setup lang="ts">
import { ref, onMounted } from 'vue'

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Роботи" },
])

const medias = ref<any[]>([])
const loading = ref(false)
const nextPageUrl = ref<string | null>(null)

async function fetchJobs(url?: string) {
  if (loading.value) return
  loading.value = true

  try {
    let response
    if (url) {
      response = await $fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` },
      })
    } else {
      const { data, error } = await $api().ai.getJobs({})
      if (error.value) return
      response = data.value
    }

    if (response?.data) {
      medias.value.push(...response.data)
      nextPageUrl.value = response.links?.next || null
    }
  } finally {
    loading.value = false
  }
}

await fetchJobs()

const sentinel = ref<HTMLElement | null>(null)
onMounted(() => {
  if (!sentinel.value) return
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && nextPageUrl.value) {
        fetchJobs(nextPageUrl.value)
      }
    })
  }, { root: null, rootMargin: '0px', threshold: 1.0 })

  observer.observe(sentinel.value)
})
</script>

<template>
  <main class="main">
    <section class="main__profile">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <h1 class="profile__title">Роботи</h1>

        <div class="profile__content">
          <ProfileMenu />

          <div class="ai-jobs">
            <div class="ai-jobs__wrapper">
              <div class="ai-jobs__list">
                <BaseImageCard
                    v-for="image in medias.flatMap(m => m.images)"
                    :key="image.id"
                    :id="image.id"
                    :src="image.url"
                    :isFavorite="image.states.is_favorite"
                    :onZoomSrc="image.url"
                />
              </div>
              <div ref="sentinel"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .ai-jobs {
    min-height: 50vh;
  }
</style>