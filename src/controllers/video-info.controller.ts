import { Request, Response } from 'express';
import { DownloaderService } from '@services';
import { formatVideoId } from '@utils';

export const GetVideoInfoController = async (req: Request, res: Response) => {
  const { downloadLink } = req.body;

  if (!downloadLink) return res.status(400).send({ error: 'Missing downloadLink' });
  const parsedDownloadLink: string = formatVideoId(downloadLink);
  if (parsedDownloadLink === '') return res.status(400).send({ error: 'Invalid downloadLink, missing queryParam "v"' });

  const data = await DownloaderService.getVideoDetail(parsedDownloadLink);
  res.status(200).send(data);
};
