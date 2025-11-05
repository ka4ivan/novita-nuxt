export const useProfileStore = defineStore('profile', () => {
    const userProfile = ref({
        name: '',
        lastname: '',
        email: '',
        balance: '',
        avatar: { url: '' },
    })
    async function getUserProfile() {
        const { data: profile } = await $api().profile.getProfile()

        if (profile.value?.data) {
            userProfile.value = {
                name: profile.value.data.name,
                lastname: profile.value.data.lastname,
                email: profile.value.data.email,
                balance: profile.value.data.balance,
                avatar: { url: profile.value.data.avatar?.url || '' },
            }
        }
    }
    return { userProfile, getUserProfile }
})