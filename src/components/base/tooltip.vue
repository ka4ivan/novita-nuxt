<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <span class="tooltip">
    <BaseIconSvg
        icon-name="info"
        customClass="tooltip-icon"
        width="0.75rem"
        height="0.75rem"
    />
    <span class="tooltip-info">
      <span class="tooltip-info__wrapper">
        <span class="tooltip-info__triangle"></span>
        <span class="tooltip-info__text">
          {{ text }}
        </span>
      </span>
    </span>
  </span>
</template>
