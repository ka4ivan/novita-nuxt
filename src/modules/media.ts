export default () => ({
    download(mediaId: string, options: any) {
        return useCustomFetch(`/media/${mediaId}`, {
            method: 'GET',
            ...options})
    },
  });
  