import { Stream } from "stream";
import { VideoDetails } from "@definitions";

export interface DownloadOptions extends DownloadVideoOptions {
  saveVideo: boolean
  videoStorePath?: string
}

export interface DownloadVideoOptions {
  format?: 'mp4' | 'webm'
  quality?: string
  type?: 'videoandaudio' | 'video' | 'audio'
}

export interface IDownloaderService {
  downloadVideo(link: string, options?: DownloadOptions): Promise<Stream>
  getVideoDetail(link: string): Promise<VideoDetails>
}
