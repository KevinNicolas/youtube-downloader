import { Stream } from "stream";
import { VideoDetails } from "@definitions";

export interface DownloadOptions {
  saveVideo: boolean
  videoStorePath?: string
}

export interface IDownloaderService {
  downloadVideo(link: string, options?: DownloadOptions): Promise<Stream>
  getVideoDetail(link: string): Promise<VideoDetails>
}
