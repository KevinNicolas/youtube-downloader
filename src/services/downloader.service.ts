import Youtubei from 'youtubei.js';
import { Console } from '@utils';
import internal from 'stream';
import { VideoOptions } from '@interfaces';

export class DownloaderService {
  static downloadVideo(link: string, { format, quality, type }: VideoOptions): Promise<{ title: string; stream: internal.PassThrough }> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const downloader = await new Youtubei();
        const { title } = await this.getVideoDetail(link);

        const stream = downloader.download(link, {
          format,
          quality,
          type,
        });
        resolve({ title, stream });
      } catch (e: unknown) {
        Console.devError('!! Error on DownloaderService/downloadVideo');
        Console.devError(e);
        reject(e);
      }
    });
  }

  static async getVideoDetail(link: string) {
    const downloader = await new Youtubei();
    return await downloader.getDetails(link);
  }
}
