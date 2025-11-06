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
            <div class="favorites">
              <div class="favorites__wrapper">
                <div class="favorites__list">
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <a
                              href="https://img.eterstock.com/VWHq5h3pYsRrn6wnkM5Q7JYNJY3C-ax_CBiYEwq-UkY/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODNiNDktODkwNy00NGM2LWJkYmItNDNlMzQ1ZTIxZmI3LmpwZw.avif"
                              class="favorites__img-button"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </a>
                        </div>

                        <div class="favorites__img-buttons-bottom">
                          <button class="favorites__img-button">
                            <BaseIconSvg
                                icon-name="heart-stroke"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
                        </div>
                      </div>

                      <a href="/" class="favorites__img-link"></a>

                      <nuxt-img
                          format="webp"
                          densities="x1 x1"
                          placeholder="/images/noImg.webp"
                          src="https://img.eterstock.com/Tc1n-eL7vctGpM7j-bKpVMl-CShTtRzelIPD_m_owzA/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODNiNDktODkwNy00NGM2LWJkYmItNDNlMzQ1ZTIxZmI3LmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                </div>
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