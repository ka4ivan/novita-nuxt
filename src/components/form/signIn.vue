<script setup lang="ts">
import { useProfileStore } from '~/store/profile'
import { useTokenClient, type AuthCodeFlowSuccessResponse, type AuthCodeFlowErrorResponse } from "vue3-google-signin"
import { useModalStore } from "~/store/modal"

const profileStore = useProfileStore()
const modalStore = useModalStore()

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  try {
    const accessToken = response.access_token

    await $api().auth.socialite('google', accessToken, {
      method: 'POST',
      onResponse({ response }) {
        const authToken = useCookie('auth_token', {
          expires: response._data.token_expires_in
              ? new Date(response._data.token_expires_in)
              : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })

        authToken.value = response._data.token
      },
    });

    await profileStore.getUserProfile()
    modalStore.modalSignIn = false
    scrollBody(false)

    return navigateTo({ path: "/" }, { redirectCode: 301 });

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
</script>

<template>
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
</template>

<style scoped lang="scss">
</style>
