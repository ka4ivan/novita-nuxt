<script setup lang="ts">
import { useProfileStore } from '~/store/profile';

const profileStore = useProfileStore();
const router = useRouter()

const breadcrumbs = ref([
  {
    id: 1,
    name: "Головна",
    slug: "",
  },
  {
    id: 2,
    name: "Профіль",
  },
]);

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
    }
    authToken.value = null;
    router.push('/')
    profileStore.userProfile = {
      name: "",
      lastname: "",
      email: "",
      balance: "",
      avatar: { url: '' },
    }
  } catch(error) {
    console.error(error);
  }
}
</script>

<template>
  <main class="main">
    <section class="main__profile">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />
        <div>
          <h1 class="profile__title">
            Обрані
          </h1>
          <div class="profile__content">
            <ProfileMenu />
            <div class="favorites__wrapper">
              <div class="favorites__list">

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>