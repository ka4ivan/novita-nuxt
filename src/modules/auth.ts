export default () => ({
  socialite(provider: string, accessToken: string) {
    return useClientFetch(`/socialite/${provider}`, {
      method: 'POST',
      body: { access_token: accessToken },
    })
  },
  signIn(payload: any, options: any) {
    return useClientFetch(`/login`, { ...options})
  },
  logOut(options: any) {
    return useClientFetch(`/logout`, {...options});
  },
});
