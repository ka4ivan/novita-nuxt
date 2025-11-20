<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  modelValue?: string // тут будемо зберігати base64
  accept?: string
}>();

const emit = defineEmits(['update:modelValue']);

const isActive = ref(false);
const file = ref<File | null>(null);
const preview = ref<string | null>(props.modelValue || null);

watch(
    () => props.modelValue,
    (val) => {
      preview.value = val || null;
    }
);

const onDragEnter = () => (isActive.value = true);
const onDragLeave = () => (isActive.value = false);

const onDrop = (event: DragEvent) => {
  isActive.value = false;
  if (!event.dataTransfer?.files) return;
  handleFile(event.dataTransfer.files[0]);
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  handleFile(target.files[0]);
};

function handleFile(f: File) {
  file.value = f;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target?.result as string;
    preview.value = base64;
    emit('update:modelValue', base64);
  };
  reader.readAsDataURL(f);
}

function removeFile() {
  file.value = null;
  preview.value = null;
  emit('update:modelValue', '');
}
</script>

<template>
  <div
      class="file-uploader"
      :class="{ 'file-uploader--active': isActive }"
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @dragover.prevent
      @drop.prevent="onDrop"
  >
    <label class="file-uploader__label" v-if="!preview">
      <div class="file-uploader__content">
        <div class="file-uploader__icon">
          <BaseIconSvg
              icon-name="download"
              customClass="file-uploader__icon-image"
              width="80px"
              height="80px"
          />
        </div>
        <div class="file-uploader__text">
          Перетягніть файл сюди або натисніть для вибору
        </div>
      </div>

      <input
          class="file-uploader__input"
          type="file"
          :accept="props.accept || 'image/png,image/jpeg'"
          @change="onFileChange"
      />
    </label>

    <div v-else class="file-uploader__preview">
      <img :src="preview" alt="preview" class="file-uploader__preview-image" />
      <button type="button" class="file-uploader__remove-btn" @click="removeFile">
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
.file-uploader {
  position: relative;
  border: 2px dashed #ccc;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
}
.file-uploader--active {
  border-color: #007bff;
}
.file-uploader__preview {
  position: relative;
  display: inline-block;
}
.file-uploader__preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
}
.file-uploader__remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
