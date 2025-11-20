<script setup>
// -- imports
import { useModalStore } from '~/store/modal.ts';
import { useProfileStore } from '~/store/profile.ts';

// variables
const modalStore = useModalStore();
const profileStore = useProfileStore();
const router = useRouter()

//-- API
async function logOut() {
  try {
    const authToken = useCookie('auth_token')
    if(authToken.value) {
      await $api().auth.logOut({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken.value || ""}`,
        },
      })
      closeSignOutModal()
    }
    authToken.value = null;
    router.push('/')
    profileStore.userProfile = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    }
  } catch(error) {
    console.error(error);
  }
}

// methods
function closeSignOutModal() {
  modalStore.toggleSignOutModal(false);
  scrollBody(false);
}
</script>
<template>
    <div class="modal__sign-out">
      <span class="modal__sign-out-title">Ви впевнені, що хочете вийти? </span>
      <button @click="logOut" class="modal__sign-out-link btn--inverse">
        Вийти
        <BaseIconSvg
          icon-name="exit"
          width="24rem"
          height="24rem"
          customClass="icon-exit"
        />
      </button>
      <button
        @click="closeSignOutModal"
        class="btn modal__sign-out-btn"
        >
        Скасувати
        <BaseIconSvg
          icon-name="close"
          width="17rem"
          height="17rem"
          customClass="icon-close"
        />
      </button>
    </div>
</template>
