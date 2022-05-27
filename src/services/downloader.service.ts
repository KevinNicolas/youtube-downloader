import { Stream } from 'stream';
import Youtubei from 'youtubei.js';
import { Console } from '@utils';
import { VideoDetails, IDownloaderService, DownloadOptions } from '@definitions';
import { createWriteStream } from 'fs'
export class DownloaderService implements IDownloaderService {
  private async _saveVideo(videoStorePathWithName: string, stream: Stream): Promise<void> {
    return new Promise((resolve) => {
      stream.pipe(createWriteStream(videoStorePathWithName))
      stream.on('end', () => resolve())
    })
  }

  getPlaylistDetail(link: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const downloader = await new Youtubei();
        resolve(await downloader.getPlaylist(link));
      } catch (e: unknown) {
        reject(e);
      }
    });
  }

  downloadVideo(link: string, options: DownloadOptions = { saveVideo: false }): Promise<Stream> {
    return new Promise(async (resolve, reject) => {
      try {
        const { saveVideo, format, quality, type, videoStorePath } = options
        console.info(format, quality, type)
        const downloader = await new Youtubei();

        const stream = downloader.download(link, { format, quality, type });

        if (saveVideo) videoStorePath
          ? await this._saveVideo(videoStorePath, stream)
          : console.warn('[DOWNLOADER-SERVICE]', 'Can not download, "videoStorePath" is not defined')

        resolve(stream);
      } catch (e: unknown) {
        Console.devError('!! Error on DownloaderService/downloadVideo');
        Console.devError(e);
        reject(e);
      }
    });
  }

  async getVideoDetail(link: string): Promise<VideoDetails> {
    const downloader = await new Youtubei();
    return await downloader.getDetails(link) as any;
  }
}
