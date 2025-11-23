<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: 'dark',
  }
});
</script>
<template>
  <div :class="['breadcrumbs', { 'breadcrumbs-light': props.theme === 'light' }]">
    <template v-for="(item, index) in links" :key="item.id || index">
      <template v-if="item.slug && index < links.length - 1">
        <NuxtLink
            class="breadcrumbs__link"
            :to="`${item.slug}`"
        >
          {{ item.name }}
        </NuxtLink>
      </template>

      <template v-else>
      <span class="breadcrumbs__link breadcrumbs__link-current">
        {{ item.name }}
      </span>
      </template>

      <span
          v-if="index < links.length - 1"
          class="breadcrumbs__separator"
      >
        —
      </span>
    </template>
  </div>
</template>
