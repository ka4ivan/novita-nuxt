<script setup lang="ts">
import { useModalStore } from '~/store/modal'
import { useProfileStore } from '~/store/profile'
import { useTokenClient, type AuthCodeFlowSuccessResponse, type AuthCodeFlowErrorResponse } from "vue3-google-signin"

const modalStore = useModalStore()
const profileStore = useProfileStore()

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  try {
    const accessToken = response.access_token

    await $api().auth.socialite('google', accessToken, {
      method: 'POST',
      onResponse({ response }) {
        const authToken = useCookie('auth_token', {
          expires: response._data.token_expires_in
              ? new Date(response._data.token_expires_in)
              : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 рік
        });

        authToken.value = response._data.token;
        console.log(authToken.value);
      },
    });

    await profileStore.getUserProfile()

    modalStore.modalSignIn = false
  } catch (e) {
    console.error('❌ Auth error:', e)
  }
}

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.error("Google auth error:", errorResponse)
}

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
})

const closeModal = () => {
  modalStore.modalSignIn = false;
  scrollBody(false);
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
      <form class="sign-in__content-form" @submit.prevent>
        <button
            class="sign-in__content-form-button"
            type="button"
            :disabled="!isReady"
            @click="login"
        >
          Sign in with Google
          <BaseIconSvg
              icon-name="google"
              width="1.2rem"
              height="1.2rem"
              customClass="sign-in__content-form-button-icon"
          />
        </button>
      </form>

      <div class="sign-in__content-bottom">
        <span class="sign-in__content-bottom-text">
          Не маєте акаунта?
          <NuxtLink class="sign-in__content-bottom-link" to="/sign-up">Реєстрація</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>