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
          <div class="modal__header">
            <h2 v-if="title" class="title title--s">
                {{ title }}
            </h2>
            <div v-if="subtitle" class="modal__header-wrapper">
              <button class="modal__btn" @click="previousModal">
                <BaseIconSvg
                  icon-name="arrow-dropdown"
                  customClass="icon-arrow-dropdown"
                  width="30rem"
                  height="30rem"
                />
              </button>
              <h3 class="title title--s">{{ subtitle }}</h3>
            </div>
            <button v-if="showCloseBtn" class="btn_close" @click="closeModal">
                <BaseIconSvg
                width="20rem"
                height="20rem"
                icon-name="close"
                customClass="icon-primary"
                />
            </button>
          </div>
          <div class="modal__content">
            <slot :modalState="modelValue"/>
          </div>
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
