<script setup>
const props = defineProps({
  iconName: {
    type: String,
    default: "basket",
  },
  customClass: {
    type: String,
    default: "",
  },
  width: {
    type: [Number, String],
    default: "27rem",
  },
  height: {
    type: [Number, String],
    default: "25rem",
  },
});
</script>

<template>
  <svg
      class="icon-svg"
      :class="[`icon-svg-${iconName}`, customClass]"
      :width="width"
      :height="height"
  >
    <use :xlink:href="`/sprite.svg#${iconName}`"></use>
  </svg>
</template>
