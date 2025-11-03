<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  showCloseBtn: {
    type: Boolean,
    default: true,
  },
  action: {
    type: Function,
    default: (option) => option,
  }
});

const closeModal = () => {
  scrollBody(false);
  emit("update:modelValue", false);
};

const previousModal = () => {
  closeModal()
  if ( props.action ) {
    props.action()
  }
}
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div class="modal" v-if="modelValue" @click.self="closeModal">
        <div class="modal__dialog">
          <slot :modalState="modelValue"/>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
