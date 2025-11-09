<script setup lang="ts">
import { useModalStore } from "~/store/modal";
import { useProfileStore } from "~/store/profile";

const modalStore = useModalStore(),
    profileStore = useProfileStore(),
    config = useRuntimeConfig(),
    route = useRoute();

profileStore.getUserProfile();

// SEO
useHead({
  link: [
    {
      rel: "canonical",
      href: config.public.FRONT_DOMAIN + route.path,
    },
  ],
});
</script>

<template>
  <Html lang="uk">
    <Body>
      <BaseHeader />
      <NuxtPage />
      <BaseFooter />
<!--      <WrapperLoader v-model="modalStore.loader" fixed />-->
      <ModalWrapper v-model="modalStore.modalSignIn">
        <ModalContentSignIn />
      </ModalWrapper>
<!--      <ModalWrapper v-model="modalStore.modalSignUp" title="Реєстрація">-->
<!--        <ModalContentSignUp />-->
<!--      </ModalWrapper>-->
    </Body>
  </Html>
</template>
