export const formatVideoId = (url: string): string => (url.includes('https://') ? new URLSearchParams(new URL(url).search).get('v') || '' : url);
