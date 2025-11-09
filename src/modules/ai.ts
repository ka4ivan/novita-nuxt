export default () => ({
    getModels(options: any) {
      return useCustomFetch(`/ai/models`, {
        method: 'GET',
      ...options})
    },
    txt2img(options: any) {
      return useCustomFetch(`/ai/txt2img`, {
        method: 'POST',
      ...options})
    },
  });
  