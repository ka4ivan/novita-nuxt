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
    asdf
  </div>
</template>

<style scoped lang="scss">
.sign-in {
  background: #d6d3ff;
  padding: 100px;
}
</style>