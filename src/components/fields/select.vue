<script setup>
import { useField } from "vee-validate";

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

const name = toRef(props, "name");

const { value: inputValue, errorMessage, handleChange, meta } = useField(
    name,
    undefined,
    { initialValue: props.modelValue }
);

function handleSelect(e) {
  const value = e.target.value;
  handleChange(value);
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="select" :class="className">
    <label v-if="label || tooltip" class="select__label" :for="name">
      {{ label }}
      <BaseTooltip v-if="tooltip" :text="tooltip" />
    </label>

    <div class="select__wrapper">
      <select
          :id="name"
          :name="name"
          class="select__field"
          :disabled="disabled"
          :value="modelValue"
          @change="handleSelect"
      >
        <option value="" disabled hidden v-if="placeholder">
          {{ placeholder }}
        </option>
        <option
            v-for="(option, index) in options"
            :key="index"
            :value="typeof option === 'object' ? option.value : option"
        >
          {{ typeof option === 'object' ? option.label : option }}
        </option>
      </select>

      <div class="select__arrow">
        <BaseIconSvg
            icon-name="eter-chevron-right"
            class="select__arrow-icon"
            width="1rem"
            height="0.75rem"
        />
      </div>
    </div>

    <div v-if="errorMessage" class="errors">
      <span class="select__error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
