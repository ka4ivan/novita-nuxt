export default () => ({
    getModels(options: any) {
      return useCustomFetch(`/ai/models`, {
        method: 'GET',
      ...options})
    },
    getJobs(options: any) {
      return useCustomFetch(`/my/ai/jobs`, {
        method: 'GET',
      ...options})
    },
    txt2img(options: any) {
      return useCustomFetch(`/ai/txt2img`, {
        method: 'POST',
      ...options})
    },
    myModelsStore(data: any) {
        return useCustomFetch(`/ai/my/models`, {
            method: 'POST',
            body: data
        })
    }
  });
  