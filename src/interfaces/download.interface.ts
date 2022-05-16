export interface DownloadRequestBody {
  downloadLink: string;
  fileType: 'audio' | 'video' | 'onlyVideo';
  options: VideoOptions;
}

export interface VideoOptions {
  format?: string;
  quality?: string;
  type: 'audio' | 'video' | 'videoandaudio';
}
