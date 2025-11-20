<script setup lang="ts">
import { ref, watch } from "vue";
import { useField } from "vee-validate";
import debounce from "lodash/debounce";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: String,
  tooltip: String,
  name: String,
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
  route: {
    type: String,
    default: "/ai/models",
  },
});

const config = useRuntimeConfig();
const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleChange } = useField(
    name,
    undefined,
    { initialValue: props.modelValue }
);

const isModelSelectorOpen = ref(false);
const models = ref<any[]>([]);
const selectedModel = ref<any>(null);
const cursor = ref<string | null>(null);
const loadingMore = ref(false);
const searchQuery = ref("");
const isSearching = ref(false);

async function fetchModels(reset = false) {
  if (loadingMore.value) return;
  loadingMore.value = true;
  if (reset) isSearching.value = true;

  try {
    await $api().ai.getModels({
      params: {
        type: "checkpoint",
        amount: 100,
        cursor: reset ? undefined : cursor.value,
        q: searchQuery.value?.trim() || undefined,
      },
      onResponse({ response }) {
        if (response.status === 200) {
          const data = response._data.data || [];
          if (reset) models.value = data;
          else models.value.push(...data);

          cursor.value = response._data.next_cursor || null;

          // Вибір дефолтної моделі
          if (!selectedModel.value && models.value.length > 0) {
            selectedModel.value = models.value[0];
            handleChange(selectedModel.value.name);
            emit("update:modelValue", selectedModel.value.name);
          }
        }
      },
      onResponseError({ response }) {
        const message =
            response._data?.message || "Помилка при завантаженні моделей";
        toast.error(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 4000,
          hideProgressBar: true,
          transition: "slide",
        });
      },
    });
  } finally {
    loadingMore.value = false;
    isSearching.value = false;
  }
}

// Виклик при відкритті модалки
async function toggleModelSelector() {
  isModelSelectorOpen.value = !isModelSelectorOpen.value;
  if (isModelSelectorOpen.value && models.value.length === 0) {
    await fetchModels(true);
  }
}

// Обробка скролу
function handleScroll(e: Event) {
  const target = e.target as HTMLElement;
  if (!cursor.value || loadingMore.value) return;

  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
    fetchModels();
  }
}

function closeModelSelector() {
  isModelSelectorOpen.value = false;
}

function selectModel(model: any) {
  selectedModel.value = model;
  handleChange(model.name);
  emit("update:modelValue", model.name);
  isModelSelectorOpen.value = false;
}

const debouncedSearch = debounce(() => fetchModels(true), 400);
watch(searchQuery, () => {
  if (isModelSelectorOpen.value) debouncedSearch();
});
</script>

<template>
  <div class="select_model" :class="className">
    <label v-if="label || tooltip" class="select_model__label" :for="name">
      {{ label }}
      <BaseTooltip v-if="tooltip" :text="tooltip" />
    </label>

    <div class="select_model__wrapper">
      <button
          class="select_model__field"
          :class="{ 'select_model__field-active': isModelSelectorOpen }"
          @click="toggleModelSelector"
      >
        <span class="select_model__field-preview">
          <img
              class="select_model__field-preview-img"
              :src="selectedModel?.image || 'https://next-app-static.s3.amazonaws.com/images-prod/xG1nkqKTMzGDvpLrqFT7WA/550b1030-0a5a-4ac0-b601-4e91940c99f4/width=450/1288918.jpeg'"
              :alt="selectedModel?.title || 'Classic V1.4'"
          />
        </span>
        <span class="select_model__field-text" :title="selectedModel?.title || ''">
          {{ selectedModel?.title || 'Classic V1.4' }}
        </span>
        <span class="select_model__field-arrow">
          <BaseIconSvg
              icon-name="eter-chevron-right"
              class="select_model__field-arrow-icon"
              width="1rem"
              height="0.75rem"
          />
        </span>
      </button>

      <div
          v-if="isModelSelectorOpen"
          class="select_model__overlay"
          @click="closeModelSelector"
      ></div>

      <div class="model-selector" v-show="isModelSelectorOpen">
        <div class="model-selector__fixed">
          <div class="model-selector__card">
            <div class="model-selector__header">
              <div class="model-selector__title">Моделі</div>
              <button type="button" class="model-selector__close" @click="closeModelSelector">
                <BaseIconSvg
                    icon-name="cross"
                    class="model-selector__close-icon"
                    width="1.25rem"
                    height="1.25rem"
                />
              </button>
            </div>

            <div class="model-selector__search">
              <FieldsInput
                  name="q"
                  placeholder="Пошук"
                  iconName="search"
                  v-model="searchQuery"
              />
            </div>

            <div class="model-selector__body">
              <div class="model-selector__overflow" @scroll="handleScroll">
                <!-- Лоадер при першому завантаженні або пошуку -->
                <div v-if="(!models.length && loadingMore) || isSearching" class="select_model__loader">
                  <div class="select_model__loader-ripple">
                    <div class="select_model__loader-ripple-item"></div>
                    <div class="select_model__loader-ripple-item"></div>
                  </div>
                </div>

                <div v-else class="model-selector__list">
                  <button
                      v-for="model in models"
                      :key="model.name"
                      class="model-selector__item"
                      @click="selectModel(model)"
                  >
                    <span class="model-selector__item-overlay"></span>
                    <span class="model-selector__item-preview">
                      <img
                          :src="model.image"
                          :alt="model.title"
                          class="model-selector__item-img"
                          loading="lazy"
                      />
                    </span>
                    <span class="model-selector__item-name">{{ model.title }}</span>
                  </button>

                  <!-- Лоадер при догрузці -->
                  <div
                      v-if="models.length && loadingMore && !isSearching"
                      class="select_model__loader select_model__loader_more"
                  >
                    <div class="select_model__loader-ripple">
                      <div class="select_model__loader-ripple-item"></div>
                      <div class="select_model__loader-ripple-item"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="errors">
      <span class="select_model__error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>


<style scoped>

</style>
