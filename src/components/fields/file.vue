<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  captions: string[]
}>()

const emit = defineEmits(['update:captions'])

const isActive = ref(false)
const images = ref<File[]>([])
const previews = ref<string[]>([])
const localCaptions = ref<string[]>([...props.captions])

watch(
    () => props.captions,
    (val) => {
      localCaptions.value = [...val]
    }
)

function updateCaptions() {
  emit('update:captions', localCaptions.value)
}

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
    localCaptions.value.push('') // додаємо порожній caption
  })
  updateCaptions()
}

function removeImage(index: number) {
  images.value.splice(index, 1)
  URL.revokeObjectURL(previews.value[index])
  previews.value.splice(index, 1)
  localCaptions.value.splice(index, 1)
  updateCaptions()
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
    <label class="file-uploader__label" v-if="!previews.length">
      <div class="file-uploader__content">
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

    <div v-else class="file-uploader__previews">
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
        <textarea
            v-model="localCaptions[index]"
            class="file-uploader__caption"
            placeholder="Підпис до фото"
            @input="updateCaptions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-uploader__caption {
  width: 100%;
  margin-top: 6px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px;
  resize: none;
}
</style>
