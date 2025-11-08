<script setup>

</script>

<template>
  <div class="range" :class="{ className }">
    <label class="textarea__label" v-if="label || tooltip" :for="name">
      {{ label }}
      <span class="textarea__tooltip" v-if="tooltip">
        <BaseIconSvg
            icon-name="info"
            customClass="textarea__tooltip-icon"
            width="0.75rem"
            height="0.75rem"
        />
        <span class="textarea__tooltip-info">
          <span class="textarea__tooltip-info__wrapper">
            <span class="textarea__tooltip-info__triangle"></span>
            <span class="textarea__tooltip-info__text">
              {{ tooltip }}
            </span>
          </span>
        </span>
      </span>
    </label>

    <div class="range__wrapper">
      <div class="range__flex">
        <input type="range" name="steps" class="range__field" min="1" max="100">
      </div>
      <div class="range__text">50</div>
    </div>

    <div v-if="errorMessage" class="errors">
      <span class="textarea__error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
