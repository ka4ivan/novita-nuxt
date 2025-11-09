<script setup lang="ts">
import { ref } from "vue";
import SelectModel from "~/components/fields/selectModel.vue";

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Текст в зображення" },
]);

const presets = ref([
  { id: 1, src: "/images/ai/presets/architecture-design-of-muslim.jpg"},
  { id: 2, src: "/images/ai/presets/flowers-face-to-sunrise.jpg" },
  { id: 3, src: "/images/ai/presets/woman-with-a-pink-shirt-and-red-smoke.jpeg" },
  { id: 4, src: "/images/ai/presets/beautiful-young-woman-blowing-bubbles.jpg" },
  { id: 5, src: "/images/ai/presets/book-on-a-beach-with-the-ocean-in-the-backgroundjpg" },
  { id: 6, src: "/images/ai/presets/glass-filled-with-a-drink.jpeg" },
  { id: 7, src: "/images/ai/presets/scoop-of-ice-cream.jpeg" },
  { id: 8, src: "/images/ai/presets/bird-perched-on-top-of-a-barbed-wire.jpg" },
  { id: 9, src: "/images/ai/presets/smiling-woman-in-a-garden-proudly-holding.jpeg" },
  { id: 10, src: "/images/ai/presets/vibrant-and-nutritious-bowl.jpeg" },
  { id: 11, src: "/images/ai/presets/butterflyfish.jpeg" },
  { id: 12, src: "/images/ai/presets/wintery-scene-in-the-heart-of-the-woods.jpeg" },
  { id: 13, src: "/images/ai/presets/adventurous-climbers-reach-the-summit.jpg" },
  { id: 14, src: "/images/ai/presets/cocktail-drink-with-ice-and-smoke.jpeg" },
  { id: 15, src: "/images/ai/presets/ancient-megalithic-cromlech-on-a-frosty-morning.jpg" },
]);

const myModels = ref([]);
const showAdvanced = ref(false);

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

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
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
                <SelectModel
                    label="Модель"
                    name="model_name"
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
                      modelValue="1024"
                      tooltip="Нижча роздільна здатність може призвести до розмитих зображень із меншою кількістю деталей. Вища роздільна здатність сповільнює швидкість генерації та може спричинити відхилення від очікуваного результату. <br><br> Рекомендована роздільна здатність: 1024×1024"
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
                      modelValue="1024"
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
                          :label="`Модель ${index + 1} TODO`"
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
            <div
                class="ai__generate-form__show-advanced"
                :class="{ 'ai__generate-form__show-advanced-active': showAdvanced }"
            >
              <button
                  type="button"
                  class="ai__generate-form__show-advanced__button"
                  @click="toggleAdvanced"
              >
                Розширенні Налаштування
                <BaseIconSvg
                    icon-name="cross"
                    class="ai__generate-form__show-advanced__button-icon"
                    width="1.33rem"
                    height="1.33rem"
                />
              </button>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Шкала Орієнтування"
                    name="guidance_scale"
                    modelValue="7.5"
                    min="1"
                    max="30"
                    tooltip="Ступінь дотримання підказки: Вищі числа вказують на більшу відповідність наданим підказкам, обмежуючи творчі можливості ШІ. <br><br> Рекомендований діапазон: 7~12."
                />
              </div>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsInput
                    label="Сід"
                    name="seed"
                    type="number"
                    modelValue="-1"
                    min="-1"
                    tooltip="Контролювання сіда дозволяє досягти відтворюваності генерованих зображень, експериментування з параметрами та варіацій підказок. <br><br> Рекомендований діапазон: від -1 до ∞. <br><br> Значення сіда -1 вказує на випадковість, що означає, що результати кожного запуску будуть різними. Якщо ж вибрати фіксоване значення в діапазоні від 0 до ∞, це дозволяє зберегти основну послідовність між кількома генераціями зображень, при цьому з’являються лише незначні варіації в деталях."
                />
              </div>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsTextarea
                    label="Негативний Промпт"
                    name="negative_prompt	"
                    placeholder="Негативний Промпт"
                    max-length="1024"
                    tooltip="Напишіть, які деталі ви не хочете бачити на зображенні. Ми вже додали кілька загальних негативних підказок, які змінюються залежно від вибраної моделі."
                />
              </div>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsSelect
                    label="Семплер"
                    name="sampler_name"
                    placeholder="Оберіть семплер"
                    tooltip="Конкретний алгоритм, що використовується ШІ для генерації зображень. Рекомендується використовувати алгоритми, позначені знаком '+' (плюс), оскільки вони більш стабільні. До поширених варіантів належать:<code>DPM++ 2S a Karras</code>,<code>Euler a</code> та<code>DPM++ 2M Karras</code> <br><br>Якщо автори моделі рекомендують конкретні алгоритми, бажано дотримуватися їхніх порад."
                    :options="[
                      'Euler a', 'Euler', 'LMS', 'Heun',
                      'DPM2', 'DPM2 a', 'DPM++ 2S a', 'DPM++ 2M',
                      'DPM++ SDE', 'DDIM', 'UniPC'
                    ]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ai__generate-images">
          <h4 class="ai__generate-images__title">
            Надихайтеся!
          </h4>
          <p class="ai__generate-images__subtitle">
            Натхнення на відстані одного дотику завдяки шаблонам, які розпалюють вашу уяву.
          </p>
          <div class="ai__generate-images">
            <div class="ai__generate-images__list">
              <div
                  v-for="preset in presets"
                  :key="preset.id"
                  class="ai__generate-images__item"
              >
                <img
                    class="ai__generate-images__item-img"
                    :src="preset.src"
                    :alt="`Preset ${preset.id}`"
                />
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