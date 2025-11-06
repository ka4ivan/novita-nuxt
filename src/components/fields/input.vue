<script setup>
import { vMaska } from "maska";
import { useField } from "vee-validate";

const emit = defineEmits(["input:focus", "update:modelValue"]);

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
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "",
  },
  classInp: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: "",
  },
  iconName: {
    type: String,
    default: "",
  },
  maxLength: {
    type: [String, Number],
    default: "",
  },
  changePasswordState: {
    type: Function,
    default: () => {},
  }
});
const name = toRef(props, "name");
let optionsMask = ref({
  mask: props.mask,
});

function handleFocus(e) {
  props.mask && !props.modelValue
    ? (e.target.value = props.mask.replace(/[^+0-9]/gm, ""))
    : false;
  emit("input:focus");
}
function handleBlur(e) {
  e.target.value = props.modelValue;
  emit("input:blur");
}

const handleInput = (e) => {
  const target = e.target;
  handleChange(target.value);
  emit("update:modelValue", target.value);
};
const {
  value: inputValue,
  errorMessage,
  errors,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue || null,
});
</script>

<template>
  <div
    class="input"
    :class="{ className }"
  >
    <label :for="name" class="input__label">{{ label }}</label>
    <div class="input__wrapper">
      <input
          :name="name"
          :id="name"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          v-maska:[optionsMask]
          class="input__field"
          :class="{ classInp, 'has-error': !meta.valid && errorMessage }"
          @input="handleInput"
          @focus="handleFocus"
          :maxlength="maxLength"
      />
    </div>
    <button
      type="button"
      class="input__icon"
      v-if="iconName"
      @click="changePasswordState"
      aria-label="Показати пароль"
    >
      <BaseIconSvg :icon-name="iconName" width="18rem" height="17rem" />
    </button>
    <div v-if="errorMessage" class="errors">
      <span class="input-error-text">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
