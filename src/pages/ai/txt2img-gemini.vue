<script setup lang="ts">
import { ref } from "vue";

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Текст в зображення Gemini" },
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

const generatedImages = ref<Array<{id: string, url: string}>>([]);
const isGenerating = ref(false);

const form = ref({
  prompt: "",
  aspect_ratio: "",
});

function listenSocket(ai_job_id: string) {
  window.Echo.channel(`ai.${ai_job_id}`)
      .listen('.ai.succeed', (data: any) => {
        isGenerating.value = false;
        customToast("Зображення успішно згенеровані!", 'success');

        if (data.media && Array.isArray(data.media)) {
          generatedImages.value = [...data.media, ...generatedImages.value];
        }
      });

  window.Echo.channel(`ai.${ai_job_id}`)
      .listen('ai.failed', () => {
        isGenerating.value = false;
        customToast("Помилка при генерації зображень!", 'error');
      });
}

const generateImages = async () => {
  try {
    isGenerating.value = true;

    const payload = {
      prompt: form.value.prompt,
      aspect_ratio: form.value.aspect_ratio,
    };

    await $api().ai.txt2imgGemini({
      body: payload,
      onResponse({ response }) {
        if ([200, 201, 202].includes(response.status)) {
          customToast(response._data?.message || "Задача створена успішно!", 'success');

          if (response._data?.ai_job_id) {
            listenSocket(response._data.ai_job_id);
          }

          setTimeout(() => {
            document.getElementById('ai__generate-results')
                ?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      },
      onResponseError({ response }) {
        const message = response._data?.message || "Сталася помилка при генерації";
        customToast(message, 'error');
        isGenerating.value = false;
      },
    });
  } finally {}
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
            <BaseBreadCrumbs :links="breadcrumbs" theme="light" />
            <h1 class="ai__intro-title">
              Текст в зображення Gemini
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
              <button
                  type="button"
                  class="ai__generate-form__button"
                  @click="generateImages"
              >
                Згенерувати
              </button>
            </div>

            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsTextarea
                    label="Промпт"
                    name="prompt"
                    placeholder="Опишіть, що хочете згенерувати..."
                    v-model="form.prompt"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsSelect
                    label="Співвідношення сторін"
                    name="aspect_ratio"
                    placeholder="Оберіть співвідношення"
                    tooltip="Визначає пропорції зображення. Наприклад, 1:1 – квадрат, 16:9 – горизонтальний формат, 9:16 – вертикальний формат (підходить для сторіс або Reels)."
                    v-model="form.aspect_ratio"
                    :options="[
                        { label: '1:1', value: '1:1' },
                        { label: '3:2', value: '3:2' },
                        { label: '2:3', value: '2:3' },
                        { label: '3:4', value: '3:4' },
                        { label: '4:3', value: '4:3' },
                        { label: '4:5', value: '4:5' },
                        { label: '5:4', value: '5:4' },
                        { label: '9:16', value: '9:16' },
                        { label: '16:9', value: '16:9' },
                        { label: '21:9', value: '21:9' }
                      ]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ai__generate-loader" v-show="isGenerating">
          <div class="ai__generate-loader__wrapper">
            <div class="ai__generate-loader__animation">
              <div class="ai__generate-loader__animation-player">
                <div class="ai__generate-loader__animation-playback">
                  <svg class="ai__generate-loader__animation-img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" width="500" height="500" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;">
                    <defs>
                      <clipPath id="__lottie_element_70">
                        <rect width="500" height="500" x="0" y="0"></rect>
                      </clipPath><clipPath id="__lottie_element_72">
                      <path class="ai__generate-loader__animation-img-line" d="M0,0 L200,0 L200,200 L0,200z"></path>
                    </clipPath>
                    <g id="__lottie_element_93">
                      <g transform="matrix(1,0.000005628082362818532,-0.000005628082362818532,1,100.00003814697266,93.00112915039062)" opacity="1" style="display: block;">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path class="ai__generate-loader__animation-img-line" fill="rgb(162,83,58)" fill-opacity="1" d=" M27.625,-31.75 C18.375,-31.75 -33.6879997253418,-31.562000274658203 -38.5,-31.5 C-41.8120002746582,-31.312000274658203 -45.6870002746582,-28.312000274658203 -45.5620002746582,-23.062000274658203 C-45.4370002746582,-17.812000274658203 -45.5620002746582,15.937000274658203 -45.3120002746582,22.062000274658203 C-44.124000549316406,20.874000549316406 -28.187999725341797,7 -24.062999725341797,2.937999963760376 C-20.812999725341797,4.813000202178955 -7.563000202178955,12.687000274658203 -7.188000202178955,13.062000274658203 C-3.562999963760376,9.187000274658203 14.937000274658203,-11.437000274658203 17.562000274658203,-14.062000274658203 C20.812000274658203,-11.187000274658203 37.5,1.562999963760376 40.625,4.688000202178955 C40.5629997253418,-7.561999797821045 40.8120002746582,-14.119000434875488 40.8120002746582,-22.375 C40.8120002746582,-28.062999725341797 36.875,-31.75 27.625,-31.75z"></path>
                        </g>
                      </g>
                    </g>
                    <g id="__lottie_element_99">
                      <g transform="matrix(1,0.000005628082362818532,-0.000005628082362818532,1,100.00003814697266,93.00112915039062)" opacity="1" style="display: block;">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path class="ai__generate-loader__animation-img-line" fill="rgb(162,83,58)" fill-opacity="1" d=" M27.625,-31.75 C18.375,-31.75 -33.6879997253418,-31.562000274658203 -38.5,-31.5 C-41.8120002746582,-31.312000274658203 -45.6870002746582,-28.312000274658203 -45.5620002746582,-23.062000274658203 C-45.4370002746582,-17.812000274658203 -45.5620002746582,15.937000274658203 -45.3120002746582,22.062000274658203 C-44.124000549316406,20.874000549316406 -28.187999725341797,7 -24.062999725341797,2.937999963760376 C-20.812999725341797,4.813000202178955 -7.563000202178955,12.687000274658203 -7.188000202178955,13.062000274658203 C-3.562999963760376,9.187000274658203 14.937000274658203,-11.437000274658203 17.562000274658203,-14.062000274658203 C20.812000274658203,-11.187000274658203 37.5,1.562999963760376 40.625,4.688000202178955 C40.5629997253418,-7.561999797821045 40.8120002746582,-14.119000434875488 40.8120002746582,-22.375 C40.8120002746582,-28.062999725341797 36.875,-31.75 27.625,-31.75z"></path></g></g></g><mask id="__lottie_element_99_1" mask-type="alpha">
                      <use xlink:href="#__lottie_element_99"></use>
                    </mask>
                    <mask id="__lottie_element_93_1" mask-type="alpha">
                      <use xlink:href="#__lottie_element_93"></use>
                    </mask></defs>
                    <g clip-path="url(#__lottie_element_70)">
                      <g clip-path="url(#__lottie_element_72)" transform="matrix(3.6926825046539307,0,0,3.6926825046539307,-112.53652954101562,-97.63343811035156)" opacity="1" style="display: block;">
                        <g transform="matrix(1,0,0,1,59.50800323486328,48.017120361328125)" opacity="1" style="display: block;">
                          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            <path class="ai__generate-loader__animation-img-line" stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="2" d=" M5,5 C5,5 72,5 72,5"></path>
                          </g>
                        </g>
                        <g transform="matrix(1,0,0,1,68.50800323486328,41.017120361328125)" opacity="1" style="display: block;">
                          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            <path class="ai__generate-loader__animation-img-line" stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="2" d=" M5,5 C5,5 54,5 54,5"></path>
                          </g>
                        </g>
                        <g transform="matrix(1,0.000005628082362818532,-0.000005628082362818532,1,65.8450698852539,86.82494354248047)" opacity="1" style="display: block;">
                          <g opacity="1" transform="matrix(1,0,0,1,22.108999252319336,17.325000762939453)">
                            <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="4" d=" M-0.6200000047683716,-0.375 C-0.6200000047683716,-0.375 12.109000205993652,7.324999809265137 12.109000205993652,7.324999809265137"></path>
                          </g>
                        </g>
                        <g transform="matrix(1,0.000005628082362818532,-0.000005628082362818532,1,44.88516616821289,69.60781860351562)" opacity="1" style="display: block;">
                          <g opacity="1" transform="matrix(1,0,0,1,52.7140007019043,28.218000411987305)">
                            <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="4" d=" M-0.6460000276565552,4.514999866485596 C6.451000213623047,-3.325000047683716 19.93199920654297,-18.216999053955078 19.93199920654297,-18.216999053955078 C19.93199920654297,-18.216999053955078 42.7140007019043,0.6140000224113464 42.7140007019043,0.6140000224113464 M-42.7140007019043,18.216999053955078 C-42.7140007019043,18.216999053955078 -21.753999710083008,-0.9990000128746033 -21.753999710083008,-0.9990000128746033 C-21.753999710083008,-0.9990000128746033 -4.9019999504089355,9.217000007629395 -4.9019999504089355,9.217000007629395 C-4.9019999504089355,9.217000007629395 -3.180999994277954,7.315999984741211 -0.6460000276565552,4.514999866485596"></path>
                          </g>
                        </g>
                        <g transform="matrix(1,0.000005628082362818532,-0.000005628082362818532,1,44.00027084350586,51.000816345214844)" opacity="1" style="display: block;">
                          <g opacity="1" transform="matrix(1,0,0,1,53.5,44.5)">
                            <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="4" d=" M-39.70000076293945,-32.34700012207031 C-37.99599838256836,-33.69499969482422 -35.84199905395508,-34.5 -33.5,-34.5 C-33.5,-34.5 33.5,-34.5 33.5,-34.5 C39.02299880981445,-34.5 43.5,-30.023000717163086 43.5,-24.5 C43.5,-24.5 43.5,24.5 43.5,24.5 C43.5,24.5 43.5,24.5 43.5,24.5 C43.5,30.023000717163086 39.02299880981445,34.5 33.5,34.5 C33.5,34.5 -33.5,34.5 -33.5,34.5 C-39.02299880981445,34.5 -43.5,30.023000717163086 -43.5,24.5 C-43.5,24.5 -43.5,-24.5 -43.5,-24.5 C-43.5,-27.680999755859375 -42.01499938964844,-30.514999389648438 -39.70000076293945,-32.34700012207031"></path>
                          </g>
                        </g>
                        <g mask="url(#__lottie_element_93_1)" style="display: block;">
                          <g transform="matrix(0.950160026550293,0.3117412328720093,-0.3117412328720093,0.950160026550293,73.75247955322266,65.44009399414062)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,10.38599967956543,10.38599967956543)">
                            <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(170,170,170)" stroke-opacity="1" stroke-width="2" d=" M5.38700008392334,0 C5.38700008392334,2.9749999046325684 2.9749999046325684,5.386000156402588 0.0010000000474974513,5.386000156402588 C-2.9739999771118164,5.386000156402588 -5.38700008392334,2.9749999046325684 -5.38700008392334,0 C-5.38700008392334,-2.9749999046325684 -2.9739999771118164,-5.386000156402588 0.0010000000474974513,-5.386000156402588 C2.9749999046325684,-5.386000156402588 5.38700008392334,-2.9749999046325684 5.38700008392334,0z"></path>
                          </g>
                          </g>
                        </g>
                        <g mask="url(#__lottie_element_99_1)" style="display: block;">
                          <g transform="matrix(-0.8761972188949585,-0.4819389283657074,0.4819389283657074,-0.8761972188949585,111.50720977783203,146.078125)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,10.38599967956543,10.38599967956543)">
                              <path fill="rgb(170,170,170)" fill-opacity="1" d=" M5.38700008392334,0 C5.38700008392334,2.9749999046325684 2.9749999046325684,5.386000156402588 0.0010000000474974513,5.386000156402588 C-2.9739999771118164,5.386000156402588 -5.38700008392334,2.9749999046325684 -5.38700008392334,0 C-5.38700008392334,-2.9749999046325684 -2.9739999771118164,-5.386000156402588 0.0010000000474974513,-5.386000156402588 C-5.130000114440918,-1.5700000524520874 1.343999981880188,5.302000045776367 5.38700008392334,0z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="ai__generate-loader__text">
              Ваші зображення ось-ось будуть готові...
            </h3>
          </div>
        </div>
        <div class="ai__generate-presets" v-show="!isGenerating && generatedImages.length <= 0">
          <h4 class="ai__generate-presets__title">
            Надихайтеся!
          </h4>
          <p class="ai__generate-presets__subtitle">
            Натхнення на відстані одного дотику завдяки шаблонам, які розпалюють вашу уяву.
          </p>
          <div class="ai__generate-presets">
            <div class="ai__generate-presets__list">
              <div
                  v-for="preset in presets"
                  :key="preset.id"
                  class="ai__generate-presets__item"
              >
                <img
                    class="ai__generate-presets__item-img"
                    :src="preset.src"
                    :alt="`Preset ${preset.id}`"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="ai__generate-results" id="ai__generate-results" v-show="!isGenerating && generatedImages.length > 0">
          <div class="ai__generate-results__list">
            <BaseImageCard
                v-for="img in generatedImages"
                :key="img.id"
                :id="img.id"
                :src="img.url"
                :onZoomSrc="img.url"
            />
          </div>
        </div>
        <div class="ai__generate-instructions">
          <div class="ai__generate-instructions-wrapper">
            <div class="ai__generate-instructions-info">
              <h2 class="ai__generate-instructions-info__title">
                Як користуватися інструментом Novita <span class="ai__generate-instructions-info__title-strong">Текст-В-Зображення (Txt2Img) Gemini</span>
              </h2>
              <p class="ai__generate-instructions-info__text">
                Інструмент Novita Текст-В-Зображення (Txt2Img) дозволяє користувачам створювати вражаючі зображення, згенеровані штучним інтелектом, на основі текстових описів. Чи то концепт-арт, контент для соцмереж, чи професійні візуали – цей посібник допоможе вам ефективно використовувати можливості інструменту для досягнення найкращих результатів.
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
              <h3 class="ai__generate-instructions-step-title">Крок 2: Генерація зображення</h3>
              <p class="ai__generate-instructions-step-text">
                Після налаштування всіх параметрів натисніть <span class="ai__generate-instructions-step-text-strong">«Згенерувати»</span>.
                ШІ створить зображення відповідно до введених налаштувань.
                Час генерації залежить від складності та роздільної здатності.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 3: Перегляд та збереження результату</h3>
              <ul class="ai__generate-instructions-step-list">
                <li>Перегляньте результат у прев’ю-секції.</li>
                <li>Якщо все влаштовує – натисніть <span class="ai__generate-instructions-step-text-strong">«Завантажити»</span>.</li>
                <li>Якщо потрібно – змініть промпт або параметри й повторіть генерацію.</li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Поради для найкращих результатів</h3>
              <ul class="ai__generate-instructions-step-list">
                <li><span class="ai__generate-instructions-step-text-strong">Будьте конкретними:</span> вказуйте кольори, освітлення, стиль.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Уникайте надлишку тексту:</span> коротко, але інформативно.</li>
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