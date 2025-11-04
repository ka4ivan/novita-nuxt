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
      avatar: {},
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
            Профіль
          </h1>
          <div class="profile__content">
            <div class="profile__menu">
              <ul class="profile__menu-list">
                <li class="profile__menu-item">
                  <NuxtLink class="profile__menu-link" to="/profile">
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="profile__menu-link-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                    Профіль
                  </NuxtLink>
                </li>
                <li class="profile__menu-item">
                  <NuxtLink class="profile__menu-link" to="/favorites">
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="profile__menu-link-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                    Улюблені
                  </NuxtLink>
                </li>
                <li class="profile__menu-item">
                  <button class="profile__menu-link" @click="logOut">
                    <BaseIconSvg
                        icon-name="arrow-right"
                        customClass="profile__menu-link-icon"
                        width="1.5rem"
                        height="1.5rem"
                    />
                    Вийти
                  </button>
                </li>
              </ul>
            </div>
            <div class="profile__info">

            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>