export default () => ({
    getMedias(options: any) {
      return useCustomFetch(`/my/favorites/medias`, {
        method: 'GET',
      ...options})
    },
    toggle(mediaId: string, options: any) {
      return useCustomFetch(`/my/favorites/medias/${mediaId}`, {
        method: 'POST',
      ...options})
    },
  });
  