import { defineStore } from 'pinia'

interface UserAvatar {
    url: string
}

interface UserProfile {
    name: string
    lastname: string
    email: string
    balance: number
    avatar: UserAvatar
}

export const useProfileStore = defineStore('profile', () => {
    const userProfile = ref<UserProfile>({
        name: '',
        lastname: '',
        email: '',
        balance: 0.0,
        avatar: { url: '' },
    })

    /** Отримати дані користувача з API */
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

    /** Скинути профіль до дефолтного стану (при виході або очищенні куків) */
    function resetProfile() {
        userProfile.value = {
            name: '',
            lastname: '',
            email: '',
            balance: 0.0,
            avatar: { url: '' },
        }
    }

    return {
        userProfile,
        getUserProfile,
        resetProfile,
    }
})
