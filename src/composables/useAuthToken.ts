export const useAuthToken = () => {
    const token = useCookie<string | null>('auth_token')
    return computed(() => token.value)
}
