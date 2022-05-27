export const getVideoId = (videoId: string): string => {
  return videoId.includes('http') ? new URLSearchParams(new URL(videoId).search).get('v') ?? '' : videoId
}
