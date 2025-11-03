<script setup>
import { useModalStore } from "~/store/modal.ts";
import { useProfileStore } from "~/store/profile.ts";

/* variables */
const modalStore = useModalStore();
const profileStore = useProfileStore();
const route = useRoute();
const props = defineProps({
  modalState: {
    type: Boolean,
    default: null,
  },
});

// API
const signInForm = ref({
  email: "",
  password: "",
});

/* methods */
async function sendSignInForm(val, action) {
  try {
    await $api().auth.signIn(signInForm.value, {
      method: "POST",
      body: signInForm.value,
      onResponse({ response }) {
        const authToken = useCookie("auth_token", {
          expires: response._data.token_expires_in,
        });
        authToken.value = response._data.token;
      },
    });

    profileStore.getUserProfile();
    modalStore.modalSignIn = false;
    scrollBody(false);

    if (route.path === "/sign-in") {
      navigateTo({ path: "/" }, { redirectCode: 301 });
    }
  } catch (error) {
    console.error(error);
    action.setErrors(error.data.errors);
  }
}

function signIn() {
  modalStore.modaSignIin = false;
}
</script>
<template>
  <div class="sign-in">
    <div class="sign-in__img"></div>
    <div class="sign-in__content">
      <h3 class="sign-in__content-title">Привіт! Раді вітати! 👋</h3>
      <form action="#" class="sign-in__content-form">
        <button class="sign-in__content-form-button" name="provider" type="submit" value="google" title="Sign in with Google">
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
        <span class="sign-in__content-bottom-text">Не маєте акаунта?
          <NuxtLink class="sign-in__content-bottom-link" to="/sign-up">Реєстрація</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>