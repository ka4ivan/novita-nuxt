export default () => ({
  signIn(payload: any, options: any) {
    return useClientFetch(`/login`, { ...options})
  },
  logOut(options: any) {
    return useClientFetch(`/logout`, {...options});
  },
});
