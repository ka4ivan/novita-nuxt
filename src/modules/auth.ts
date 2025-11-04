export default () => ({
  socialite(provider: string, accessToken: string, options: any = {}) {
    return useClientFetch(`/socialite/${provider}`, {
      method: 'POST',
      body: { access_token: accessToken },
      ...options,
    });
  },
  signIn(payload: any, options: any) {
    return useClientFetch(`/login`, { ...options})
  },
  logOut(options: any) {
    return useClientFetch(`/logout`, {...options});
  },
});
