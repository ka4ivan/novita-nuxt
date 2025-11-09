<script setup lang="ts">
import { useProfileStore } from '~/store/profile';
import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const profileStore = useProfileStore();
const router = useRouter()

const visible = ref(false)
const imgUrl = ref('')

const breadcrumbs = ref([
  {
    id: 1,
    name: "Головна",
    slug: "/",
  },
  {
    id: 2,
    name: "Профіль",
  },
]);

const openLightbox = (url: string) => {
  imgUrl.value = url
  visible.value = true
}

const onHide = () => {
  visible.value = false
}

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
      balance: 0.0,
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
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/VWHq5h3pYsRrn6wnkM5Q7JYNJY3C-ax_CBiYEwq-UkY/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODNiNDktODkwNy00NGM2LWJkYmItNDNlMzQ1ZTIxZmI3LmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/teiiKUu_JJ1A2hE89tUDqJUWju_VvaJRutqqieXzbD0/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODQxMGUtNmI3My00OWQxLWFlZGQtMDVlNTY3MjY0ZTkxLmpwZw.webp')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/wh-1vGX96844DKfPdHEQ1-ZkyR9ZiWYiZ2Q2sgvMon4/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODQxMGUtNmI3My00OWQxLWFlZGQtMDVlNTY3MjY0ZTkxLmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/NqeHW-6M43qnNv1eHpvAz5hfok8uJ69sFInetGzW2eM/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmNmE5NGUtOWRhYy00MDg2LWFmZGQtMDg5OTQ3YTlhMmJkLmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/l9k0Lst5vv1phvtQwNQ1Vn2Fk_TgkttLqvsARDwxPG4/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmNmE5NGUtOWRhYy00MDg2LWFmZGQtMDg5OTQ3YTlhMmJkLmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/KYT_Bb7Jts2kpVdXxL6kaA9Si5S69S0b0Ds7cuJq6c8/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODNiOGEtYzY0MC00N2I3LWIyNmMtNDRjY2E0YzJjZmY1LmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/mFipYuFoOgpxDt7xKHR-zS-lGvXoaUzj4EUUCe_s6H0/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODNiOGEtYzY0MC00N2I3LWIyNmMtNDRjY2E0YzJjZmY1LmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/oumt1VG1WBWbQlS5HB1QmJLd25vTmlIA8Xhk5bfYww4/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWM2NmQ0YWEtYzE0NC00MmQzLTliOGEtZjQ2Y2I0MDc4OWJhLmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/KQVi-3po9ih2myhUII7QwSDv1qO4ODbPcmbP69vL4so/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWM2NmQ0YWEtYzE0NC00MmQzLTliOGEtZjQ2Y2I0MDc4OWJhLmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/SN3fg7Bta4EfH_9p7xelLozzMcsTUckjzYKbt3w9DKk/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmY2QxODAtYjQ0OS00ZDgyLThhMDAtYTk0YTg4Mzc2NWQyLmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/X72eeE43uPaAH6_jXtm7blttkIsmgaIvx_sf8ZWzoSg/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmY2QxODAtYjQ0OS00ZDgyLThhMDAtYTk0YTg4Mzc2NWQyLmpwZw.avif"
                          alt="image"
                          width="90"
                          height="90"
                          class="favorites__img-image"
                      />
                    </div>
                  </div>
                  <div class="favorites__item">
                    <div class="favorites__img">
                      <div class="favorites__img-buttons">
                        <div class="favorites__img-buttons-top">
                          <h3 class="favorites__img-blur"></h3>
                          <button
                              class="favorites__img-button"
                              type="button"
                              @click="openLightbox('https://img.eterstock.com/c1X5CkRlx7qcCMu8HPW8eJRaK-DxoVAXwNuUBL5sTFA/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiYzA4NjgtZjc1NS00YjU1LTkzYzAtYjUzZTA5ZWVkOWMzLmpwZw.avif')"
                          >
                            <BaseIconSvg
                                icon-name="zoom"
                                customClass="favorites__img-button-icon"
                                width="1.25rem"
                                height="1.25rem"
                            />
                          </button>
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
                          src="https://img.eterstock.com/w3EphGoN80dvXT3R6HucMXZsVrHNtAhnfZtckZ_7Em8/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiYzA4NjgtZjc1NS00YjU1LTkzYzAtYjUzZTA5ZWVkOWMzLmpwZw.avif"
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
  .favorites {
    min-height: 50vh;
  }
</style>