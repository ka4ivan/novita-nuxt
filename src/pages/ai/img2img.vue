<script setup lang="ts">
import { ref } from "vue";
import SelectModel from "~/components/fields/selectModel.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "AI" },
  { id: 3, name: "Зображення в зображення" },
]);

const generatedImages = ref<Array<{id: string, url: string}>>([]);
const showAdvanced = ref(false);
const isGenerating = ref(false);

const form = ref({
  model_name: "cyberrealistic_classicV14_73029.safetensors",
  image_base64: "",
  prompt: "",
  negative_prompt: "",
  width: 1024,
  height: 1024,
  image_num: 1,
  steps: 20,
  guidance_scale: 7.5,
  seed: -1,
  sampler_name: "Euler a",
  model_main: "qween_image_edit",
  files: [] as File[],
  captions: [] as string[],
});

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};

function listenSocket(ai_job_id: string) {
  window.Echo.channel(`ai.${ai_job_id}`)
      .listen('.ai.succeed', (data: any) => {
        isGenerating.value = false;
        console.log("🟢 AIJob in Sockets:", ai_job_id);
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
      prompt: form.value.prompt,
      negative_prompt: form.value.negative_prompt || undefined,
      width: Number(form.value.width),
      height: Number(form.value.height),
      image_num: Number(form.value.image_num),
      steps: Number(form.value.steps),
      guidance_scale: Number(form.value.guidance_scale),
      seed: Number(form.value.seed),
      sampler_name: form.value.sampler_name,
      model_main: form.value.model_main,
    };

    await $api().ai.img2img({
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
              Зображення в зображення
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
                <SelectModel
                    label="Модель"
                    name="model_name"
                    placeholder="Модель"
                    tooltip="Експериментуйте з різними моделями, які можна застосувати до вашого зображення"
                    v-model="form.model_name"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsFile
                    label="Зображення"
                    name="image_base64"
                    v-model="form.image_base64"
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
                    v-model="form.prompt"
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
                      v-model="form.width"
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
                      v-model="form.height"
                  />
                </div>
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Кроки"
                    name="steps"
                    tooltip="Більше кроків, тонші деталі. Після 20 - обмежене покращення."
                    v-model="form.steps"
                />
              </div>
            </div>
            <div class="ai__generate-form__input">
              <div class="ai__generate-form__input-field">
                <FieldsRange
                    label="Кількість Зображень"
                    name="image_num"
                    v-model="form.image_num"
                    min="1"
                    max="8"
                />
              </div>
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
                    min="1"
                    max="30"
                    tooltip="Ступінь дотримання підказки: Вищі числа вказують на більшу відповідність наданим підказкам, обмежуючи творчі можливості ШІ. <br><br> Рекомендований діапазон: 7~12."
                    v-model="form.guidance_scale"
                />
              </div>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsInput
                    label="Сід"
                    name="seed"
                    type="number"
                    min="-1"
                    tooltip="Контролювання сіда дозволяє досягти відтворюваності генерованих зображень, експериментування з параметрами та варіацій підказок. <br><br> Рекомендований діапазон: від -1 до ∞. <br><br> Значення сіда -1 вказує на випадковість, що означає, що результати кожного запуску будуть різними. Якщо ж вибрати фіксоване значення в діапазоні від 0 до ∞, це дозволяє зберегти основну послідовність між кількома генераціями зображень, при цьому з’являються лише незначні варіації в деталях."
                    v-model="form.seed"
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
                    v-model="form.negative_prompt"
                />
              </div>
            </div>
            <div class="ai__generate-form__input" v-show="showAdvanced">
              <div class="ai__generate-form__input-field">
                <FieldsSelect
                    label="Надстройка"
                    name="model_main"
                    placeholder="Оберіть надстройку"
                    v-model="form.model_main"
                    :options="[
                      'qween_image_edit', 'novita'
                    ]"
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
                    v-model="form.sampler_name"
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
                Як користуватися інструментом Novita <span class="ai__generate-instructions-info__title-strong">Image-to-Image</span>
              </h2>
              <p class="ai__generate-instructions-info__text">
                Інструмент Novita Image-to-Image дозволяє користувачам створювати вражаючі зображення, згенеровані штучним інтелектом, на основі вже існуючих зображень. Цей посібник допоможе вам ефективно використовувати можливості інструменту для досягнення найкращих результатів, будь то концепт-арт, контент для соцмереж чи професійні візуали.
              </p>
            </div>
            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 1: Завантаження початкового зображення
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Завантажити зображення:</span> натисніть кнопку <strong>"Завантажити зображення"</strong> та виберіть файл у форматах JPG, PNG або WEBP.
                </li>
                <li class="ai__generate-instructions-step-item">
                  Після завантаження, зображення відобразиться у панелі попереднього перегляду.
                </li>
              </ul>
              <p class="ai__generate-instructions-step-text">
                <span class="ai__generate-instructions-step-text-strong">Порада:</span> Використовуйте зображення високої якості для кращих трансформацій AI.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">
                Крок 2: Налаштування параметрів генерації зображення
              </h3>
              <ul class="ai__generate-instructions-step-list">
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Вибір моделі:</span> Оберіть модель AI для досягнення бажаного художнього або реалістичного результату.
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Промпт (Обов'язковий):</span> Описуйте трансформацію у деталях.
                  <br><span class="ai__generate-instructions-step-text-strong">Приклад:</span> "Перетворіть на футуристичний міський ландшафт з неоновими вогнями."
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Негативний промпт (Необов'язковий):</span> Вкажіть елементи, яких не повинно бути у зображенні.
                  <br><span class="ai__generate-instructions-step-text-strong">Приклад:</span> "Без розмиття, без артефактів, без спотворених країв."
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Роздільна здатність:</span> Виберіть роздільну здатність вихідного зображення.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li class="ai__generate-instructions-step-item-sublist-item">
                      <span class="ai__generate-instructions-step-text-strong">Популярна опція:</span> 1024x1024 для високоякісних результатів.
                    </li>
                  </ul>
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Кроки:</span> Налаштуйте кількість кроків обробки.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li>20-30 — швидше, але менш деталізовано.</li>
                    <li>50-100 — більш детально, але довше.</li>
                  </ul>
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Шкала Орієнтування:</span> Визначає, наскільки точно AI слідує вашому опису.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li>10-15 — зображення, більш точно відповідне опису.</li>
                    <li>5-8 — більше креативності у результатах.</li>
                  </ul>
                </li>
                <li class="ai__generate-instructions-step-item">
                  <span class="ai__generate-instructions-step-text-strong">Семплер:</span> Оберіть алгоритм семплінгу AI.
                  <ul class="ai__generate-instructions-step-item-sublist">
                    <li><span class="ai__generate-instructions-step-text-strong">DPM++ 2S a Karras (рекомендовано):</span> дає плавні та високоякісні зображення.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 3: Розширене налаштування</h3>

              <h4 class="ai__generate-instructions-step-title">ControlNet</h4>
              <p class="ai__generate-instructions-step-text">
                Покращуйте окремі аспекти вашого зображення, такі як поза, контури чи глибина.
              </p>

              <h4 class="ai__generate-instructions-step-title">LoRA (Low-Rank Adaptation)</h4>
              <p class="ai__generate-instructions-step-text">
                Тонке налаштування результату за допомогою попередньо натренованих моделей для конкретних стилів.
              </p>

              <h4 class="ai__generate-instructions-step-title">Refiner</h4>
              <p class="ai__generate-instructions-step-text">
                Покращення якості фінального результату:
                <ul>
                  <li><span class="ai__generate-instructions-step-text-strong">0 (Вимкнено):</span> без додаткового покращення.</li>
                  <li><span class="ai__generate-instructions-step-text-strong">0.5 (Помірно):</span> незначне покращення деталей.</li>
                  <li><span class="ai__generate-instructions-step-text-strong">1 (Повне):</span> покращення різкості та текстур.</li>
                </ul>
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 4: Генерація зображення</h3>
              <p class="ai__generate-instructions-step-text">
                Після налаштування всіх параметрів натисніть <strong>“Згенерувати”</strong>. ШІ створить зображення на основі вибраних налаштувань. Час обробки залежить від складності та роздільної здатності.
              </p>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Крок 5: Перегляд та збереження результату</h3>
              <ul class="ai__generate-instructions-step-list">
                <li>Перегляньте згенероване зображення в панелі попереднього перегляду.</li>
                <li>Якщо результат влаштовує, натисніть <strong>“Завантажити”</strong>.</li>
                <li>При необхідності, змініть налаштування та повторіть генерацію.</li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Поради для найкращих результатів</h3>
              <ul class="ai__generate-instructions-step-list">
                <li><span class="ai__generate-instructions-step-text-strong">Будьте конкретними:</span> вказуйте кольори, освітлення та стиль.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Експериментуйте з шкалою орієнтування:</span> знайдіть баланс між точністю та креативністю.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Спробуйте різні семплери:</span> кожен з них надає унікальний художній ефект.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Почніть з базових налаштувань:</span> поступово налаштовуйте параметри залежно від результатів.</li>
              </ul>
            </div>

            <div class="ai__generate-instructions-step">
              <h3 class="ai__generate-instructions-step-title">Застосування AI-зображень</h3>
              <ul class="ai__generate-instructions-step-list">
                <li><span class="ai__generate-instructions-step-text-strong">Маркетинг і соцмережі:</span> генеруйте унікальні візуали для Instagram, TikTok, реклами.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Концепт-арт:</span> створюйте ідеї для дизайну, ігор та фільмів.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Візуалізація продуктів:</span> покращуйте зображення товарів для e-commerce та рекламних кампаній.</li>
                <li><span class="ai__generate-instructions-step-text-strong">Персональні проєкти:</span> підвищуйте якість презентацій, блогів та творчих робіт.</li>
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