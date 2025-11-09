<script setup lang="ts">
import { ref, watch } from "vue";
import { useField } from "vee-validate";
import { useRuntimeConfig } from "#app";
import axios from "axios";

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

async function toggleModelSelector() {
  isModelSelectorOpen.value = !isModelSelectorOpen.value;

  if (isModelSelectorOpen.value && models.value.length === 0) {
    try {
      const res = await axios.get(`${config.public.API_BASE_URL}/ai/models`, {
        params: { type: "checkpoint", amount: 100 },
      });
      models.value = res.data.data || [];
      if (models.value.length > 0) {
        selectedModel.value = models.value[0];
        handleChange(selectedModel.value.name);
        emit("update:modelValue", selectedModel.value.name);
      }
    } catch (e) {
      console.error("Error fetching AI models:", e);
    }
  }
}

function closeModelSelector() {
  isModelSelectorOpen.value = false;
}

function selectModel(model: any) {
  selectedModel.value = model;
  handleChange(model.name);
  emit("update:modelValue", model.name);
  closeModelSelector();
}

function handleScroll() {
  if (!scrollRef.value || isLoading.value || !nextCursor.value) return;

  const el = scrollRef.value;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
    fetchModels(nextCursor.value);
  }
}
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
              :src="selectedModel?.image || 'https://next-app-static.s3.amazonaws.com/images-prod/xG1nkqKTMzGDvpLrqFT7WA/f291a219-4a86-45ab-96eb-c53446b3e4df/width=450/1495044.jpeg'"
              :alt="selectedModel?.title || 'V4.0-inpainting (VAE)'"
          />
        </span>
        <span class="select_model__field-text" :title="selectedModel?.title || ''">
          {{ selectedModel?.title || 'V4.0-inpainting (VAE)' }}
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
              <FieldsInput name="q" placeholder="Пошук" iconName="search" />
            </div>

            <div class="model-selector__body">
              <div class="model-selector__overflow">
                <div class="model-selector__list">
                  <button
                      v-for="model in models"
                      :key="model.name"
                      class="model-selector__item"
                      @click="selectModel(model)"
                  >
                    <span class="model-selector__item-overlay"></span>
                    <span class="model-selector__item-preview">
                      <img
                          class="model-selector__item-img"
                          :src="model.image"
                          :alt="model.title"
                          loading="lazy"
                      />
                    </span>
                    <span class="model-selector__item-name">{{ model.title }}</span>
                  </button>
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
