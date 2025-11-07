<script setup lang="ts">
import { useProfileStore } from "~/store/profile";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Form as VeeForm } from "vee-validate";

const profileStore = useProfileStore();
const isEditing = ref(false);

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Профіль" },
]);

const profileForm = ref({
  name: "",
  lastname: "",
  email: "",
});

onMounted(async () => {
  await profileStore.getUserProfile();
  profileForm.value = {
    name: profileStore.userProfile.name,
    lastname: profileStore.userProfile.lastname,
    email: profileStore.userProfile.email,
  };
});

const enableEditing = () => {
  isEditing.value = true;
};

const onUpdateProfile = async (val, action) => {
  console.log(123123123123123123);
  try {
    await $api().profile.updateProfile(profileForm.value, {
      onResponse({ response }) {
        if (response.status === 200 || response.status === 202) {
          toast.success(`${response._data.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4000,
            hideProgressBar: true,
            transition: "slide",
          });

          profileStore.getUserProfile();
          isEditing.value = false;
        }
      },
    });
  } catch (error) {
    if (error?.data?.errors) {
      action?.setErrors(error.data.errors);
    }
  }
};
</script>

<template>
  <main class="main">
    <section class="main__profile">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />
        <h1 class="profile__title">Профіль</h1>

        <div class="profile__content">
          <ProfileMenu />

          <div class="profile__info">
            <div class="profile__info-detail">
              <div class="profile__info-detail-avatar">
                <nuxt-img
                    format="webp"
                    densities="x1 x1"
                    placeholder="/images/noImg.webp"
                    :src="profileStore.userProfile.avatar.url"
                    alt="profile"
                    width="90"
                    height="90"
                    class="profile__info-detail-avatar__img"
                />
              </div>

              <div class="profile__info-detail-text">
                <h4 class="profile__info-detail-text__title">
                  {{ profileStore.userProfile.name }} {{ profileStore.userProfile.lastname }}
                </h4>
                <span class="profile__info-detail-text__subtitle">
                  {{ profileStore.userProfile.id }}
                </span>
                <span class="profile__info-detail-text__subtitle">
                  {{ profileStore.userProfile.email }}
                </span>
              </div>
            </div>

            <div class="profile__info-personal">
              <div class="profile__info-personal__title">
                <h4 class="profile__info-personal__title-text">Особиста інформація</h4>
                <div
                    v-if="!isEditing"
                    class="profile__info-personal__button"
                    @click="enableEditing"
                >
                  <BaseIconSvg
                      icon-name="edit"
                      class="profile__info-personal__button-icon"
                      width="1rem"
                      height="1rem"
                  />
                  <span class="profile__info-personal__button-text">Редагувати</span>
                </div>
              </div>

              <VeeForm class="profile__form" @submit="onUpdateProfile">
                <FieldsInput
                    label="Ім'я"
                    name="name"
                    placeholder="Ім'я"
                    v-model="profileForm.name"
                    :disabled="!isEditing"
                />
                <FieldsInput
                    label="Прізвище"
                    name="lastname"
                    placeholder="Прізвище"
                    v-model="profileForm.lastname"
                    :disabled="!isEditing"
                />
                <FieldsInput
                    label="Email"
                    name="email"
                    type="mail"
                    placeholder="Email"
                    v-model="profileForm.email"
                    :disabled="!isEditing"
                />

                <div class="profile__form-before__button"></div>
                <button v-if="isEditing" type="submit" class="profile__form-button">
                  Зберегти
                </button>
              </VeeForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>