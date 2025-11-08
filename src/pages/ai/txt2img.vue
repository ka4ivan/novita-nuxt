<script setup lang="ts">
import { ref } from "vue";

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Текст в зображення" },
]);

const myModels = ref([]);

const addModel = () => {
  if (myModels.value.length < 5) {
    myModels.value.push({
      id: Date.now(),
      model_name: "",
      strength: 0.7,
    });
  }
};

const removeModel = (id: number) => {
  myModels.value = myModels.value.filter((m) => m.id !== id);
};
</script>

<template>
  <main class="main">
    <section class="ai__intro">
      <div class="ai__intro-bg">
        <video class="ai__intro-bg-video" autoplay muted loop>
          <source src="/video/background.mp4" type="video/mp4">
        </video>
      </div>
      <div class="ai__intro-overlay"></div>
      <div class="container ai__intro-container">
        <div class="ai__intro-content">
          <div class="ai__intro-inner">
            <BaseBreadCrumbs :links="breadcrumbs" />
            <h1 class="ai__intro-title">
              Текст в зображення
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section class="ai__generate">
      <div class="ai__generate-container container">
        <div class="ai__generate-settings">
          <div class="ai__generate-form">
            <div class="ai__generate-form__button-wrapper">
              <button type="submit" class="ai__generate-form__button">
                Згенерувати
              </button>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsInput
                    label="Модель"
                    name="model"
                    placeholder="Модель"
                    tooltip="Експериментуйте з різними моделями, які можна застосувати до вашого зображення"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsTextarea
                    label="Промпт"
                    name="prompt"
                    placeholder="Промпт"
                    tooltip="Ви можете використати одне слово або повне речення. Ми заповнили кілька загальних підказок, щоб згенеровані вами зображення були ближчими до обраної вами моделі."
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-cross">
                <div class="ai__generate-form__input-field">
                  <FieldsInput
                      label="Роздільна Здатність"
                      name="width"
                      type="number"
                      placeholder="Width"
                      tooltip="Нижча роздільна здатність може призвести до розмитих зображень із меншою кількістю деталей. Вища роздільна здатність сповільнює швидкість генерації та може спричинити відхилення від очікуваного результату. Рекомендована роздільна здатність: 1024×1024"
                  />
                </div>
                  <BaseIconSvg
                      icon-name="cross"
                      class="ai__generate-form__input-cross-icon"
                      width="1rem"
                      height="1rem"
                  />
                <div class="ai__generate-form__input-field">
                  <FieldsInput
                      label="&nbsp;"
                      name="height"
                      type="number"
                      placeholder="Height"
                  />
                </div>
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Кроки"
                    name="steps"
                    modelValue="20"
                    tooltip="Більше кроків, тонші деталі. Після 20 - обмежене покращення."
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Кількість Зображень"
                    name="image_num"
                    modelValue="5"
                    min="1"
                    max="8"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-title">
                <label class="input__label">
                  Мої Моделі
                  <BaseTooltip text="LoRA — це швидкий і легкий метод навчання, який вставляє та навчає значно меншу кількість параметрів замість усіх параметрів моделі. Наразі підтримується до 5 LoRA." />
                </label>
              </div>
              <div class="ai__generate-form__my-model">
                <div
                    v-for="(model, index) in myModels"
                    :key="model.id"
                    class="ai__generate-form__my-model__wrapper"
                >
                  <button
                      role="button"
                      type="button"
                      class="ai__generate-form__my-model__close"
                      @click="removeModel(model.id)"
                  >
                    <BaseIconSvg
                        icon-name="cross"
                        customClass="ai__generate-form__my-model__close-icon"
                        width="2rem"
                        height="2rem"
                    />
                  </button>

                  <div class="ai__generate-form__input">
                    <div class="ai__generate-form__input-field">
                      <FieldsInput
                          :label="`Модель ${index + 1}`"
                          :name="`loras[${index}][model_name]`"
                          placeholder="Модель"
                      />
                    </div>
                  </div>

                  <div class="ai__generate-form__input">
                    <div class="ai__generate-form__input-field">
                      <FieldsRange
                          label="Сила Впливу"
                          :name="`loras[${index}][strength]`"
                          :modelValue="model.strength"
                          min="0"
                          max="1"
                          step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 🔹 кнопка показується тільки якщо < 5 -->
              <button
                  v-if="myModels.length < 5"
                  role="button"
                  type="button"
                  class="ai__generate-form__input-button"
                  @click="addModel"
              >
                <div class="ai__generate-form__input-button-text">
                  <BaseIconSvg
                      icon-name="cross"
                      customClass="ai__generate-form__input-button-icon"
                      width="1rem"
                      height="1rem"
                  />
                  Додати Власну Модель
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>