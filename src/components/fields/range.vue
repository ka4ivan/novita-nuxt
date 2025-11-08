<script setup>
import { useField } from "vee-validate";
import Tooltip from "~/components/base/tooltip.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: String,
  tooltip: String,
  name: String,
  modelValue: {
    type: [String, Number],
    default: 50,
  },
  min: {
    type: [String, Number],
    default: 1,
  },
  max: {
    type: [String, Number],
    default: 100,
  },
  step: {
    type: [String, Number],
    default: 1,
  },
  className: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");
const localValue = ref(props.modelValue); // 🔹 локальний реактивний стан

watch(
    () => props.modelValue,
    (val) => {
      localValue.value = val;
    }
);

const { errorMessage, handleChange } = useField(name, undefined, {
  initialValue: props.modelValue,
});

const handleInput = (e) => {
  const value = Number(e.target.value);
  localValue.value = value; // оновлюємо локальне значення
  handleChange(value);
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="range" :class="{ className }">
    <label class="range__label" v-if="label || tooltip" :for="name">
      {{ label }}
      <BaseTooltip v-if="tooltip" :text="tooltip" />
    </label>

    <div class="range__wrapper">
      <div class="range__flex">
        <input
            type="range"
            :name="name"
            class="range__field"
            :min="min"
            :max="max"
            :step="step"
            :value="localValue"
            @input="handleInput"
        />
      </div>
      <div class="range__text">{{ localValue }}</div>
    </div>

    <div v-if="errorMessage" class="errors">
      <span class="range__error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
