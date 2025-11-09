<script setup>
import { useField } from "vee-validate";
import Input from "~/components/fields/input.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  name: {
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
  classTextarea: {
    type: String,
    default: "",
  },
  tooltip: {
    type: String,
    default: "",
  },
  maxLength: {
    type: [String, Number],
    default: "",
  },
  rows: {
    type: [String, Number],
    default: 4,
  },
});

const name = toRef(props, "name");

const handleInput = (e) => {
  const target = e.target;
  handleChange(target.value);
  emit("update:modelValue", target.value);
};

const { value: textareaValue, errorMessage, handleChange, meta } = useField(
    name,
    undefined,
    {
      initialValue: props.modelValue || null,
    }
);
</script>

<template>
  <div class="textarea" :class="{ className }">
    <label class="textarea__label" v-if="label || tooltip" :for="name">
      {{ label }}
      <BaseTooltip v-if="tooltip" :text="tooltip" />
    </label>

    <div class="textarea__wrapper">
      <textarea
          :name="name"
          :id="name"
          :placeholder="placeholder"
          v-model="textareaValue"
          :disabled="disabled"
          class="textarea__field"
          :class="{ classTextarea, 'textarea__field-error': !meta.valid && errorMessage }"
          @input="handleInput"
          :maxlength="maxLength"
          :rows="rows"
      />
    </div>

    <div v-if="errorMessage" class="errors">
      <span class="textarea__error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
