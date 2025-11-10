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
                  <BaseImageCard
                      src="https://img.eterstock.com/wh-1vGX96844DKfPdHEQ1-ZkyR9ZiWYiZ2Q2sgvMon4/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODQxMGUtNmI3My00OWQxLWFlZGQtMDVlNTY3MjY0ZTkxLmpwZw.avif"
                      :onZoom="() => openLightbox('https://img.eterstock.com/teiiKUu_JJ1A2hE89tUDqJUWju_VvaJRutqqieXzbD0/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJiODQxMGUtNmI3My00OWQxLWFlZGQtMDVlNTY3MjY0ZTkxLmpwZw.webp')"
                      :onFavorite="() => console.log('favorite')"
                  />
                  <BaseImageCard
                      src="https://img.eterstock.com/X72eeE43uPaAH6_jXtm7blttkIsmgaIvx_sf8ZWzoSg/resize:fit:300/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmY2QxODAtYjQ0OS00ZDgyLThhMDAtYTk0YTg4Mzc2NWQyLmpwZw.avif"
                      :onZoom="() => openLightbox('https://img.eterstock.com/SN3fg7Bta4EfH_9p7xelLozzMcsTUckjzYKbt3w9DKk/watermark:0.3/czM6Ly9ldGVybml0eS9pbWFnZXMvOWJmY2QxODAtYjQ0OS00ZDgyLThhMDAtYTk0YTg4Mzc2NWQyLmpwZw.avif')"
                      :onFavorite="() => console.log('favorite')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <VueEasyLightbox
      :visible="visible"
      :imgs="[imgUrl]"
      :index="0"
      @hide="onHide"
  />
</template>

<style scoped>
  .favorites {
    min-height: 50vh;
  }
</style>