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
    img2img(options: any) {
      return useCustomFetch(`/ai/img2img`, {
        method: 'POST',
      ...options})
    },
    removeBackground(options: any) {
      return useCustomFetch(`/ai/remove-background`, {
        method: 'POST',
      ...options})
    },
    removeText(options: any) {
      return useCustomFetch(`/ai/remove-text`, {
        method: 'POST',
      ...options})
    },
    upscale(options: any) {
      return useCustomFetch(`/ai/upscale`, {
        method: 'POST',
      ...options})
    },
    myModels(options: any) {
        return useCustomFetch(`/ai/my/models`, {
            method: 'GET',
            ...options
        })
    },
    myModelsStore(data: any) {
        return useCustomFetch(`/ai/my/models`, {
            method: 'POST',
            body: data
        })
    },
    myModelsDelete(id: string) {
        return useCustomFetch(`/ai/my/models/${id}`, {
            method: 'DELETE'
        });
    }
  });
  