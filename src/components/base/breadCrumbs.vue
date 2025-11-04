<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="breadcrumbs">
    <template v-for="(item, index) in links" :key="item.id || index">
      <NuxtLink
          v-if="index < links.length - 1"
          class="breadcrumbs__link"
          :to="`/${item.slug}`"
      >
        {{ item.name }}
      </NuxtLink>
      <span v-else class="breadcrumbs__link breadcrumbs__link-current">{{ item.name }}</span>

      <span
          v-if="index < links.length - 1"
          class="breadcrumbs__separator"
      >
        —
      </span>
    </template>
  </div>
</template>
