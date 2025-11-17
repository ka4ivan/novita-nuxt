<script setup lang="ts">
import { ref } from 'vue'
import { Form as VeeForm } from "vee-validate";
import aiMyModelsModule from "~/modules/ai";

const aiMyModels = aiMyModelsModule()

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 2, name: "Моделі", slug: "/ai/models"},
  { id: 2, name: "Створити" },
])

const aiModelForm = ref({
  name: "",
  base_model: "",
  caption: [],
  files: [],
});

async function submitForm() {
  const formData = new FormData()
  formData.append("name", aiModelForm.value.name)
  formData.append("base_model", aiModelForm.value.base_model)

  aiModelForm.value.caption.forEach((c, i) => {
    formData.append(`caption[${i}]`, c)
  })

  aiModelForm.value.files.forEach((file, i) => {
    formData.append(`files[${i}]`, file)
  })

  const { data, error } = await aiMyModels.myModelsStore(formData)

  if (error.value) {
    const backendMessage = error.value?.data?.message || "Сталася помилка при створенні моделі"

    customToast(backendMessage, "error")
    return
  }

  const message = data.value?.data?.message || "Модель створена успішно!"

  customToast(message, "success")
}
</script>

<template>
  <main class="main">
    <section class="ai_model">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <h1 class="ai_model__title">Створити модель</h1>

        <div class="ai_model__content">
          <div class="ai_model__settings">
            <VeeForm class="ai_model__form" @submit="submitForm">
              <FieldsInput
                  label="Назва"
                  name="name"
                  placeholder="Назва"
                  v-model="aiModelForm.name"
              />
              <FieldsSelect
                  label="Базова модель"
                  name="base_model"
                  placeholder="Базова модель"
                  v-model="aiModelForm.base_model"
                  :options="[
                    'dreamshaperXL09Alpha_alpha2Xl10_91562',
                    'protovisionXLHighFidelity3D_release0630Bakedvae_154359',
                    'epicrealism_naturalSin_121250',
                    'dreamshaper_8_93211',
                    'realisticVisionV51_v51VAE_94301',
                    'sdxlUnstableDiffusers_v11_216694',
                    'realisticVisionV40_v40VAE_81510',
                    'epicrealismXL_v10_247189',
                    'animagineXLV31_v31_325600'
                  ]"
              />
<!--              <FieldsTextarea-->
<!--                  label="Опис для фото 1"-->
<!--                  name="caption[0]"-->
<!--                  placeholder="Це логотип компанії у мінімалістичному стилі"-->
<!--                  v-model="aiModelForm.caption"-->
<!--              />-->
              <div class="ai_model__before__button"></div>
              <div class="ai_model__submit">
                <button type="submit" class="ai_model__button">
                  Створити
                </button>
              </div>
            </VeeForm>
          </div>
          <div class="ai_model__upload">
            <FieldsFiles
                :multiple="true"
                :showCaptions="true"
                v-model:captions="aiModelForm.caption"
                v-model:files="aiModelForm.files"
            />
          </div>
        </div>
        <div class="ai__generate-instructions">
          <div class="ai__generate-instructions-wrapper">
            <div class="ai__generate-instructions-info">
              <h2 class="ai__generate-instructions-info__title">
                Як створити модель – покрокова інструкція
              </h2>
              <p class="ai__generate-instructions-info__text">
                Створення моделі – це простий процес, який дозволяє вам налаштувати модель за допомогою ваших власних зображень. Для цього вам потрібно вибрати базову модель і завантажити фотографії, кожна з яких повинна мати опис. Слідуйте цій інструкції для правильного створення моделі.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 1: Вибір базової моделі
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Виберіть одну з базових моделей, яка найкраще підходить для ваших потреб.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Кожна базова модель має свої особливості, тому вибір залежить від типу зображень, які ви хочете використовувати.
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 2: Завантаження фотографій
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Натисніть кнопку <strong>“Завантажити фотографії”</strong>, щоб вибрати зображення зі свого пристрою.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Завантажте необхідні фотографії для створення моделі. Кожне фото повинно мати опис, що пояснює, що саме на зображенні.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Переконайтесь, що фотографії мають високу якість та чітко зображують об'єкти, які ви хочете використовувати для навчання моделі.
                </li>
              </ul>
              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Для досягнення найкращих результатів використовуйте різні ракурси та освітлення для кожного зображення.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 3: Опис кожного фото
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Після завантаження кожного фото введіть детальний опис для кожного зображення.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Опис має бути чітким та точним, щоб модель могла коректно обробити інформацію і правильно асоціювати зображення з відповідними ознаками.
                </li>
              </ul>
              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Опис повинен включати важливі деталі, такі як колір, форма, контекст і будь-які інші ключові характеристики зображення.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 4: Створення моделі
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Після того як усі фотографії завантажені і описані, натисніть кнопку <strong>“Створити модель”</strong>.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Система автоматично почне обробку зображень і створення моделі на основі наданих фотографій і описів.
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 5: Завершення процесу
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Коли створення моделі завершиться, ви отримаєте лист на пошту про успішне завершення процесу.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Модель буде доступна для подальшого використання в будь-яких проектах чи процесах.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>