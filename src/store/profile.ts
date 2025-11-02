export const useProfileStore = defineStore('profile', () => {
    const userProfile = ref({
        name: "",
        lastname: "",
        email: "",
        balance: "",
    })
    async function getUserProfile() {
            const { data: profile } = await $api().profile.getProfile()
            userProfile.value.name = profile?.value?.data?.name;
            userProfile.value.email = profile?.value?.data?.email;
            userProfile.value.lastname = profile?.value?.data?.lastname;
            userProfile.value.balance = profile?.value?.data?.balance;
            
    } 
    return { userProfile, getUserProfile }
})