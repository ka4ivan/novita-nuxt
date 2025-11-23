<script setup lang="ts">
import { useModalStore } from '~/store/modal'
const modalStore = useModalStore()

const closeModal = () => {
  modalStore.modalSignIn = false
  scrollBody(false)
}
</script>

<template>
  <div class="sign-in">
    <div class="sign-in__btn-close" @click="closeModal">
      <BaseIconSvg
          icon-name="close"
          width="1rem"
          height="1rem"
          customClass="sign-in__btn-close-icon"
      />
    </div>

    <div class="sign-in__img"></div>

    <div class="sign-in__content">
      <h3 class="sign-in__content-title">Привіт! Раді вітати! 👋</h3>
        <FormSignIn />

      <div class="sign-in__content-bottom">
      <span class="sign-in__content-bottom-text">
        Не маєте акаунта?
        <NuxtLink class="sign-in__content-bottom-link" to="/sign-up">
          Реєстрація
        </NuxtLink>
      </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
