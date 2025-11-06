<script setup lang="ts">
import { useProfileStore } from "~/store/profile";

const profileStore = useProfileStore();
const isEditing = ref(false);

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "" },
  { id: 2, name: "Профіль" },
]);

const enableEditing = () => {
  isEditing.value = true;
};

const onUpdateProfile = async () => {
  // TODO зробити збереження профілю
  isEditing.value = false;
};

onMounted(async () => {
  await profileStore.getUserProfile();
});
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
                  {{ profileStore.userProfile?.name || "" }}
                  {{ profileStore.userProfile?.lastname || "" }}
                </h4>
                <span class="profile__info-detail-text__subtitle">
                  {{ profileStore.userProfile?.id || "" }}
                </span>
                <span class="profile__info-detail-text__subtitle">
                  {{ profileStore.userProfile?.email || "" }}
                </span>
              </div>
            </div>

            <div class="profile__info-personal">
              <div class="profile__info-personal__title">
                <h4 class="profile__info-personal__title-text">
                  Особиста інформація
                </h4>

                <!-- кнопка редагування -->
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
                  <span class="profile__info-personal__button-text">
                    Редагувати
                  </span>
                </div>
              </div>

              <vee-form class="profile__form" @submit="onUpdateProfile">
                <FieldsInput
                    label="Ім'я"
                    name="name"
                    placeholder="Ім'я"
                    :model-value="profileStore.userProfile.name"
                    :disabled="!isEditing"
                />
                <FieldsInput
                    label="Прізвище"
                    name="lastname"
                    placeholder="Прізвище"
                    :model-value="profileStore.userProfile.lastname"
                    :disabled="!isEditing"
                />
                <FieldsInput
                    label="Email"
                    name="email"
                    placeholder="Email"
                    :model-value="profileStore.userProfile.email"
                    :disabled="!isEditing"
                />

                <div class="profile__form-before__button"></div>
                <button
                    v-if="isEditing"
                    role="button"
                    class="profile__form-button"
                    name="method"
                    type="submit"
                    value="profile"
                >
                  Зберегти
                </button>
              </vee-form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>