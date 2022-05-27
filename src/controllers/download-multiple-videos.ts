import { Controller } from "@definitions";
import { DownloaderService } from "@services";
import { v4 as UuidV4 } from 'uuid'
import { mkdirSync, createReadStream, rmSync } from 'fs'
import { Console, compressDirectory } from "@utils";

interface VideoIds {
  id: string
  name: string,
}

interface DownloadVideoParams {
  extension: string
  videoIds: VideoIds[],
  storePath: string
}

function _downloadVideo ({ extension, videoIds, storePath }: DownloadVideoParams, index = 0): Promise<void> {
  return new Promise(async (resolve) => {
    if (videoIds.length <= index) return resolve()

    const downloader = new DownloaderService()
    const { id, name } = videoIds[index]

    Console.devInfo('[DOWNLOAD]', videoIds[index].name)

    await downloader.downloadVideo(id, { saveVideo: true, videoStorePath: `${storePath}/${name}.${extension}`})
    resolve(_downloadVideo({ extension, videoIds, storePath }, ++index))
  })
}


export const DownloadMultipleVideosController: Controller = async (req, res) => {
  const { videoIds }: { videoIds: VideoIds[] } = req.body

  if (!videoIds || videoIds.length < 1) return res.status(400).send({ error: 'Missing "videoIds"' })
  if (videoIds.some(({ id, name }) => !id || !name)) return res.status(400).send({ error: 'Missing "id" or "name" in "videosIds"' })

  const extension = 'mp4'

  const videosStorePath = `${__dirname}/${UuidV4()}`
  mkdirSync(videosStorePath)

  await _downloadVideo({ extension, videoIds, storePath: videosStorePath })
  const zipPath = await compressDirectory(videosStorePath)
  const stream = createReadStream(zipPath)

  // res.setHeader('content-type', 'application/octet-stream');
  stream.on('data', (data: unknown) => res.write(data))
  stream.on('end', () => {
    res.end();
    rmSync(zipPath)
  })
}
