const extractParam = (url: string, key: string) => new URLSearchParams(new URL(url).search).get(key)

export const getVideoId = (videoUrl: string): string => {
  return videoUrl.includes('http') ? extractParam(videoUrl, 'v') ?? '' : videoUrl
}

export const getPlaylistId = (playlistUrl: string): string => {
  return playlistUrl.includes('http') ? extractParam(playlistUrl, 'list') ?? '' : playlistUrl
}
