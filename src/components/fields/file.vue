<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)
const images = ref<File[]>([])
const previews = ref<string[]>([])

const onDragEnter = () => (isActive.value = true)
const onDragLeave = () => (isActive.value = false)
const onDrop = (event: DragEvent) => {
  isActive.value = false
  if (!event.dataTransfer?.files) return
  handleFiles(event.dataTransfer.files)
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  handleFiles(target.files)
}

function handleFiles(fileList: FileList) {
  const newFiles = Array.from(fileList)
  images.value.push(...newFiles)
  newFiles.forEach(file => {
    previews.value.push(URL.createObjectURL(file))
  })
}

function removeImage(index: number) {
  images.value.splice(index, 1)
  URL.revokeObjectURL(previews.value[index])
  previews.value.splice(index, 1)
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
    <label class="file-uploader__label">
      <div class="file-uploader__content" v-if="!previews.length">
        <div class="file-uploader__icon">
          <div class="file-uploader__icon-wrapper">
            <div class="file-uploader__icon-animation">
              <BaseIconSvg
                  icon-name="download"
                  customClass="file-uploader__icon-image"
                  width="100px"
                  height="100px"
              />
            </div>
          </div>
        </div>
        <div class="file-uploader__text">
          Перетягніть файли сюди або натисніть, щоб вибрати
        </div>
      </div>

      <input
          class="file-uploader__input"
          type="file"
          accept="image/png,image/jpeg"
          multiple
          @change="onFileChange"
      />
    </label>

    <div v-if="previews.length" class="file-uploader__previews">
      <div
          v-for="(src, index) in previews"
          :key="index"
          class="file-uploader__preview"
      >
        <img :src="src" alt="preview" class="file-uploader__preview-image" />
        <button
            type="button"
            class="file-uploader__remove-btn"
            @click="removeImage(index)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>