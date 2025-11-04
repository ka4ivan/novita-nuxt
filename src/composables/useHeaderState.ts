import { ref } from 'vue'

const isCustom = ref(false)
const isFixed = ref(false)

export function useHeaderState() {
    return { isCustom, isFixed }
}
