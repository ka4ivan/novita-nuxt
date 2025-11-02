import { ref } from 'vue'

const isCustom = ref(false)

export function useHeaderState() {
    return { isCustom }
}
