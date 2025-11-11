<script setup lang="ts">
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps<{
  src: string;
  onZoomSrc: string;
  id: string;
  isFavorite: boolean;
}>();

const visible = ref(false);
const imgUrl = ref("");
const favoriteState = ref(props.isFavorite);

const openLightbox = (url: string) => {
  imgUrl.value = url;
  visible.value = true;
};

const onHide = () => {
  visible.value = false;
};

const onFavorite = async () => {
  try {
    const response = await $api().favorites.toggle(props.id, {
      onResponse({ response }) {
        if (response.status === 200) {
          const result = response._data?.result;

          favoriteState.value = result === "added";

          const message =
              response._data?.message ||
              (result === "added"
                  ? "Додано в улюблені!"
                  : "Видалено з улюблених!");

          toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            transition: "slide",
          });
        }
      },
      onResponseError({ response }) {
        const message =
            response._data?.message || "Не вдалося змінити статус улюбленого";
        toast.error(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          transition: "slide",
        });
      },
    });
  } catch (err) {
    toast.error("Помилка при відправці запиту", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      transition: "slide",
    });
  }
};

const onDownload = async () => {
  try {
    const { data, error } = await $api().media.download(props.id, {});

    if (error.value) throw new Error('Не вдалося завантажити файл');

    // Створюємо blob із відповіді
    const blob = new Blob([data.value], { type: 'image/png' });
    const url = window.URL.createObjectURL(blob);

    // Ініціюємо завантаження
    const link = document.createElement('a');
    link.href = url;
    link.download = props.onZoomSrc.split('/').pop() || 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success('Файл завантажено!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      transition: 'slide',
    });
  } catch (err) {
    console.error(err);
    toast.error('Помилка при завантаженні файлу', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      transition: 'slide',
    });
  }
};
</script>

<template>
  <div class="image-card">
    <div class="image-card__buttons">
      <div class="image-card__buttons-top">
        <h3 class="image-card__blur"></h3>
        <button
            class="image-card__button"
            type="button"
            @click="openLightbox(onZoomSrc)"
        >
          <BaseIconSvg
              icon-name="zoom"
              customClass="image-card__button-icon"
              width="1.25rem"
              height="1.25rem"
          />
        </button>
      </div>

      <div class="image-card__buttons-bottom">
        <button
            class="image-card__button"
            @click="onDownload"
        >
          <BaseIconSvg
              icon-name="download"
              customClass="image-card__button-icon image-card__button-icon-download"
              width="1.4rem"
              height="1.4rem"
          />
        </button>
        <button
            :class="['image-card__button', { 'image-card__button-active': favoriteState }]"
            @click="onFavorite"
        >
          <BaseIconSvg
              icon-name="heart-stroke"
              customClass="image-card__button-icon"
              width="1.25rem"
              height="1.25rem"
          />
        </button>
      </div>
    </div>

    <nuxt-img
        format="webp"
        densities="x1 x1"
        placeholder="/images/noImg.webp"
        :src="src"
        alt="image"
        width="90"
        height="90"
        class="image-card__image"
    />
  </div>

  <VueEasyLightbox
      :visible="visible"
      :imgs="[imgUrl]"
      :index="0"
      @hide="onHide"
  />
</template>

<style scoped lang="scss">
.image-card {
  position: relative;
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  z-index: 0;
  transition: 0.3s;
  margin-bottom: 0.5rem;
  break-inside: avoid;

  &:hover {
    .image-card__image {
      transform: scale(1.1);
    }
    .image-card__buttons {
      opacity: 1;
    }
  }

  &__buttons {
    opacity: 0;
    transition: 0.3s;
    padding: 0.75rem;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 30;
    position: absolute;
    top: 0;
    left: 0;

    &-top,
    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }

    &-bottom {
      justify-content: flex-end;
    }
  }

  &__blur {
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 16px;
    padding: 0.375rem 0.75rem;
    background-color: transparent;
    border-radius: 9999px;
    max-width: 80%;
    margin: 0;
  }

  &__button {
    backdrop-filter: blur(4px);
    padding: 0.625rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    display: flex;
    transition: 0.3s;
    cursor: pointer;
    fill: #fff;

    &:hover {
      background-color: #fff;
      fill: rgb(32 32 46);
    }

    &-active {
      background-color: #fff;
      fill: rgb(32 32 46);

      &:hover {
        opacity: .8;
      }
    }

    &-icon {
      width: 1.25rem;
      height: 1.25rem;

      &-download {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }

  &__link {
    position: absolute;
    top: 3rem;
    left: 0;
    bottom: 3rem;
    width: 100%;
    z-index: 30;
  }

  &__image {
    transition: 0.3s;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
