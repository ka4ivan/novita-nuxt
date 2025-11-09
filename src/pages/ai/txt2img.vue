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
        <div class="ai__generate-instructions">
          <div class="ai__generate-instructions-wrapper">
            <div class="ai__generate-instructions-info">
              <h2 class="ai__generate-instructions-info__title">
                Як користуватися інструментом Novita <span class="ai__generate-instructions-info__title-strong">Текст-В-Зображення (Txt2Img)</span>
              </h2>
              <p class="ai__generate-instructions-info__text">
                Інструмент Novita Текст-В-Зображення (Txt2Img) дозволяє користувачам створювати вражаючі зображення, згенеровані штучним інтелектом, на основі текстових описів. Чи то концепт-арт, контент для соцмереж, чи професійні візуали — цей посібник допоможе вам ефективно використовувати можливості інструменту для досягнення найкращих результатів.
              </p>
            </div>
            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 1: Введення вашого запиту (Промпт)
              </h3>
              <h4 class="ai__generate-instructions-step-title">
                Промпт (Обов'язковий):
              </h4>
              <p class="ai__generate-instructions-step-text">
                Описуйте зображення, яке ви хочете створити, з максимальною кількістю деталей.
                <br><span class="ai__generate-instructions-step-text-strong">Приклад:</span>
                "Футуристичний силует міста на заході сонця з літаючими автомобілями та неоновими вогнями." Будьте конкретними щодо кольорів, стилів, освітлення та об'єктів, щоб отримати кращі результати.
              </p>
              <h4 class="ai__generate-instructions-step-title">
                Негативний Промпт (Необов'язкоо):
              </h4>
              <p class="ai__generate-instructions-step-text">
                Вкажіть елементи, які ви хочете виключити з зображення.
                <br><span class="ai__generate-instructions-step-text-strong">Приклад:</span>
                "Без розмиття, без тексту, без темних кольорів." Це допоможе уточнити результат і уникнути небажаних візуальних елементів.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 2: Налаштування параметрів зображення
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Роздільна здатність:</span>
                  Виберіть бажаний розмір вихідного зображення.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li class="ai__generate-instructions-step-item-sublist-item">
                      <span class="ai__generate-instructions-step-text-strong">Популярні варіанти:</span> 1024x1024 (ідеально для соцмереж).
                    </li>
                    <li class="ai__generate-instructions-step-item-sublist-item">
                      Вища роздільна здатність = більше деталей, але довше генерується.
                    </li>
                  </ul>
                </li>

                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Кроки:</span> Кількість кроків обробки AI.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li>20–30 — швидше, але менш деталізовано.</li>
                    <li>50–100 — детальніше, але довше.</li>
                  </ul>
                </li>

                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Кількість Зображень:</span> Скільки зображень згенерувати одночасно.
                </li>

                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Шкала Орієнтування:</span> Наскільки точно AI слідує промпту.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li>10–15 — більш точне відтворення опису.</li>
                    <li>5–8 — більше креативності.</li>
                  </ul>
                </li>

                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Сід:</span> Випадковість генерації.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li>-1 — випадковий результат кожного разу.</li>
                    <li>Фіксоване число — стабільний результат.</li>
                  </ul>
                </li>

                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Семплер:</span> Алгоритм семплінгу.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li><span class="ai__generate-instructions-step-text-strong">DPM++ 2S a Karras (рекомендовано):</span> дає плавні, якісні зображення.</li>
                    <li>Спробуйте інші — для різних художніх ефектів.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 3: Покращення результату</h3>

              <h4 class="ai__generate-instructions-step-title">Власні моделі</h4>
              <p class="ai__generate-instructions-step-text">
                Використовуйте попередньо натреновані моделі, щоб досягти певного художнього стилю.
              </p>

              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Експериментуйте, щоб знайти ідеальний баланс.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 4: Генерація зображення</h3>
              <p class="ai__generate-instructions-step-text">
                Після налаштування всіх параметрів натисніть <span class="ai__generate-instructions-step-text-strong">«Згенерувати»</span>.
                ШІ створить зображення відповідно до введених налаштувань.
                Час генерації залежить від складності та роздільної здатності.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 5: Перегляд та збереження результату</h3>
              <ul class="ai__generate-instructions-step-list">
                <li>Перегляньте результат у прев’ю-секції.</li>
                <li>Якщо все влаштовує — натисніть <span class="ai__generate-instructions-step-text-strong">«Завантажити»</span>.</li>
                <li>Якщо потрібно — змініть промпт або параметри й повторіть генерацію.</li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Поради для найкращих результатів</h3>
              <ul class="ai__generate-instructions-step-list">
                <li><span class="ai__generate-instructions-step-text-strong">Будьте конкретними:</span> вказуйте кольори, освітлення, стиль.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Експериментуйте з Шкалою Орієнтування:</span> знайдіть баланс між точністю та креативністю.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Уникайте надлишку тексту:</span> коротко, але інформативно.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Використовуйте Власні Моделі:</span> для єдиного стилю або бренду.</li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Застосування AI-зображень</h3>
              <ul class="ai__generate-instructions-step-list">
                <li><span class="ai__generate-instructions-step-text-strong">Маркетинг і соцмережі:</span> візуали для Instagram, TikTok, реклами.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Концепт-арт:</span> ідеї для дизайну, ігор, фільмів.</li>
                <li><span class="ai__generate-instructions-step-text-strong">E-Commerce:</span> рендери товарів і концептів.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Персональні проєкти:</span> презентації, блоги, креатив.</li>
              </ul>
            </div>
          </div>
        </div>
        <BaseFaq :items="[
          { question: 'Чи можу я створювати кілька зображень одночасно?', answer: 'Так, ви можете вказати кількість зображень у розділі <strong>Кількість Зображень</strong>.' },
          { question: 'Яке рекомендоване значення масштабу для фотореалістичних зображень?', answer: 'Значення від 7 до 10 добре підходить для реалістичних результатів, забезпечуючи точне дотримання підказки.' },
          { question: 'Чи можна редагувати зображення після його створення?', answer: 'Так, ви можете використовувати інструменти редагування Novita для подальшого модифікування або покращення зображення.' },
        ]" />
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>