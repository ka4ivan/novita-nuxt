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
            <FieldsFile
                v-model:captions="aiModelForm.caption"
                v-model:files="aiModelForm.files"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>