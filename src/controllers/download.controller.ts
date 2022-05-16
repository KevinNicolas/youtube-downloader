import { Request, Response } from 'express';
import { DownloadRequestBody } from '@interfaces';
import { DownloaderService } from '@services';
import { resolve } from 'path';

export const DownloadController = async (req: Request, res: Response) => {
  if (!req.body.downloadLink) res.status(400).send({ error: 'Missing downloadLink' });
  if (!req.body.fileType) res.status(400).send({ error: 'Missing fileType' });

  const { downloadLink, options, fileType }: DownloadRequestBody = req.body;

  if (fileType === 'video') {
    options.type = 'videoandaudio';
    options.format = 'mp4';
  }
  if (fileType === 'onlyVideo') {
    options.type = 'video';
    options.format = 'mp4';
  }
  if (fileType === 'audio') {
    options.type = 'audio';
    options.format = 'webm';
  }

  const { stream } = await DownloaderService.downloadVideo(downloadLink, options);

  stream?.on('data', (data: unknown) => res.write(data));
  stream?.on('end', () => res.end());
};

export const GetFileController = async (req: Request, res: Response) => {
  res.download(resolve('./dist/download-files/video.mp4'));
};
