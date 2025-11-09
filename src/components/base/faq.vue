<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const openIndex = ref(null);

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <div class="faq">
    <h2 class="faq__title">FAQ</h2>

    <div class="faq__menu">
      <div class="faq__list">
        <div
            v-for="(item, index) in props.items"
            :key="index"
            class="faq__item"
            :class="{ 'faq__item-active': openIndex === index }"
            @click="toggleItem(index)"
        >
          <div class="faq__item-header">
            {{ item.question }}
            <BaseIconSvg
                icon-name="eter-chevron-right"
                class="faq__item-header-icon"
                width="1rem"
                height="0.9rem"
            />
          </div>

          <transition name="faq-slide">
            <div v-if="openIndex === index" v-html="item.answer" class="faq__item-content">
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
