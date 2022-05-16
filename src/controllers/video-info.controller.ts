import { Request, Response } from 'express';
import { DownloaderService } from '@services';

export const GetVideoInfoController = async (req: Request, res: Response) => {
  const { downloadLink } = req.body;
  const data = await DownloaderService.getVideoDetail(downloadLink);
  res.status(200).send(data);
};
