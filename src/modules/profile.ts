export default () => ({
    getProfile(options: any) {
      return useCustomFetch(`/my/profile`, { 
        method: 'GET',
      ...options})
    },
    updateProfile(payload: any, options: any) {
      return useClientFetch(`/my/profile`, { 
        method: 'POST',
        body: payload,
      ...options})
    },
    updatePassword(payload: any, options: any) {
      return useClientFetch('/my/profile/password', {
        method: 'POST',
        body: payload,
        ...options})
    }
  });
  