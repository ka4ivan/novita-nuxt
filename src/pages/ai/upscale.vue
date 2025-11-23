<script setup lang="ts">
import { ref } from "vue";
import SelectModel from "~/components/fields/selectModel.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Upscale" },
]);

const generatedImages = ref<Array<{id: string, url: string}>>([]);
const isGenerating = ref(false);

const form = ref({
  model_name: "RealESRNet_x4plus",
  image_base64: "",
  scale_factor: 2,
});

function listenSocket(ai_job_id: string) {
  window.Echo.channel(`ai.${ai_job_id}`)
      .listen('.ai.succeed', (data: any) => {
        isGenerating.value = false;
        console.log("🟢 AIJob in Sockets:", ai_job_id);
        console.log(data)
        console.log(data.media && Array.isArray(data.media))
        customToast("Зображення успішно згенеровані!", 'success');

        if (data.media && Array.isArray(data.media)) {
          generatedImages.value = [...data.media, ...generatedImages.value];
        }
      })
  window.Echo.channel(`ai.${ai_job_id}`)
      .listen('ai.failed', (data: any) => {
        isGenerating.value = false;
        console.log(data)
        customToast("Помилка при генерації зображень!", 'error');
      })
}

const generateImages = async (val, action) => {
  try {
    isGenerating.value = true;

    const payload = {
      model_name: form.value.model_name,
      image_base64: form.value.image_base64,
      scale_factor: form.value.scale_factor,
    };

    await $api().ai.upscale({
      body: payload,
      onResponse({ response }) {
        if (response.status === 200 ||response.status === 201 || response.status === 202) {
          customToast(response._data?.message || "Задача створена успішно!", 'success');

          if (response._data?.ai_job_id) {
            console.log("🟢 AIJob:", response._data.ai_job_id);
            listenSocket(response._data.ai_job_id);
          }

          console.log("🟢 Task created:", response._data);

          setTimeout(() => {
            const el = document.getElementById('ai__generate-results');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      },
      onResponseError({ response }) {
        if (response._data?.errors) {
          action?.setErrors(response._data.errors);
        }

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
              Upscale
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
                <FieldsFile
                    label="Зображення"
                    name="image_base64"
                    tooltip="Оригінальне зображення з максимальною роздільною здатністю 2048 * 2048 та максимальною розміром файлу 30 Мб."
                    v-model="form.image_base64"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsSelect
                    label="Назва моделі"
                    name="model_name"
                    placeholder="Оберіть модель"
                    v-model="form.model_name"
                    :options="[
                      'RealESRNet_x4plus', 'RealESRGAN_x4plus_anime_6B', '4x-UltraSharp'
                    ]"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Коефіцієнт масштабування"
                    name="scale_factor"
                    min="1"
                    max="4"
                    v-model="form.scale_factor"
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
        <div :class="['ai__generate-instructions', { 'w-full': (!isGenerating && generatedImages.length > 0) || isGenerating }]">
          <div class="ai__generate-instructions-wrapper">
            <div class="ai__generate-instructions-info">
              <h2 class="ai__generate-instructions-info__title">
                Як користуватися інструментом Novita Upscale – покрокова інструкція
              </h2>
              <p class="ai__generate-instructions-info__text">
                Інструмент Novita Upscale використовує передові алгоритми ШІ для покращення роздільної здатності зображень, зберігаючи при цьому всі деталі. Це робить його ідеальним для покращення якості зображень для друку, соціальних мереж та професійного використання. Слідуйте цій інструкції, щоб ефективно збільшити роздільну здатність ваших зображень.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 1: Доступ до інструменту
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Увійдіть у свій акаунт на Novita або зареєструйтесь, якщо ви новий користувач.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Переконайтесь, що у вас є достатньо кредитів для доступу до інструменту.
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 2: Завантаження вашого зображення
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Натисніть кнопку <strong>“Завантажити зображення”</strong>.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Виберіть зображення зі свого пристрою, переконавшись, що воно відповідає наступним вимогам:
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li><strong>Максимальна роздільна здатність:</strong> 2048 x 2048 пікселів.</li>
                    <li><strong>Максимальний розмір файлу:</strong> 30 МБ.</li>
                    <li><strong>Підтримувані формати:</strong> JPG, PNG, WEBP.</li>
                  </ul>
                </li>
                <li class="ai__generate-instructions-step-item">
                  Після завантаження зображення з'явиться в панелі попереднього перегляду.
                </li>
              </ul>
              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Для найкращих результатів використовуйте зображення високої якості з мінімальними артефактами стиснення.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 3: Вибір параметрів збільшення роздільної здатності
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  <strong>Вибір моделі ШІ:</strong>
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li><strong>RealESRNet_x4plus:</strong> Рекомендовано для загальних потреб збільшення, пропонує високоякісні результати з балансом різкості та зменшенням шумів.</li>
                    <li>Підходить для продуктів, портретів та детальних зображень.</li>
                  </ul>
                </li>
                <li class="ai__generate-instructions-step-item">
                  <strong>Встановлення масштабу:</strong>
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li><strong>2x (Подвійне збільшення роздільної здатності):</strong> Ідеально для помірних покращень.</li>
                    <li><strong>4x (Четверне збільшення роздільної здатності):</strong> Найкраще для максимального покращення деталей без втрати якості.</li>
                  </ul>
                </li>
              </ul>
              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Більші значення масштабу можуть вимагати більше часу на обробку, але вони забезпечують детальніші результати для великих форматів.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 4: Генерація зображення з покращеною роздільною здатністю
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Після налаштування всіх параметрів натисніть <strong>“Збільшити”</strong>, щоб розпочати процес покращення.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Час обробки може змінюватися в залежності від розміру зображення та вибраного масштабу.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Перевірте попередній перегляд після завершення збільшення, щоб переконатись, що якість відповідає вашим вимогам.
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 5: Завантаження зображення з покращеною роздільною здатністю
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  Коли ви задоволені результатом, натисніть <strong>“Завантажити”</strong>, щоб зберегти зображення з покращеною роздільною здатністю.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Зображення буде доступне у тому ж форматі, що і оригінальний файл.
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 6: Поради для досягнення найкращих результатів
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  <strong>Оберіть правильний масштаб:</strong> використовуйте 2x для веб-використання та 4x для високоякісних друкованих матеріалів.
                </li>
                <li class="ai__generate-instructions-step-item">
                  <strong>Уникайте низькоякісних зображень:</strong> чим вища якість початкового зображення, тим кращі результати збільшення.
                </li>
                <li class="ai__generate-instructions-step-item">
                  <strong>Обробка декількох зображень:</strong> подумайте про обробку кількох зображень по черзі для забезпечення послідовності.
                </li>
                <li class="ai__generate-instructions-step-item">
                  <strong>Подальша обробка:</strong> додатково покращуйте зображення за допомогою інструментів для редагування, щоб уточнити кольори та різкість.
                </li>
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

<style lang="scss" scoped>
.ai {
  &__generate {
    &-instructions {
      width: auto;
    }
  }
}
</style>