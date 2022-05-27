import { Controller, DownloadVideoOptions } from "@definitions";
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
  storePath: string,
  downloadOptions: DownloadVideoOptions
}

function _downloadVideo ({ extension, videoIds, storePath, downloadOptions }: DownloadVideoParams, index = 0): Promise<void> {
  return new Promise(async (resolve) => {
    if (videoIds.length <= index) return resolve()

    const downloader = new DownloaderService()
    const { id, name } = videoIds[index]

    Console.devInfo('[DOWNLOAD]', videoIds[index].name)

    await downloader.downloadVideo(id, {
      saveVideo: true,
      videoStorePath: `${storePath}/${name}.${extension}`,
      ...downloadOptions
    })
    resolve(_downloadVideo({ extension, videoIds, storePath, downloadOptions }, ++index))
  })
}

function _getDownloadOptions (fileType: string): DownloadVideoOptions {
  switch (fileType) {
    case 'video': return  { format: 'mp4', type: 'videoandaudio' }
    case 'onlyVideo': return { format: 'mp4', type: 'video' }
    case 'audio': return { format: 'webm', type: 'audio' }
    default: return { format: 'mp4', type: 'videoandaudio' }
  }
}

export const DownloadMultipleVideosController: Controller = async (req, res) => {
  const { videoIds, fileType }: { videoIds: VideoIds[], fileType: string } = req.body

  if (!videoIds || videoIds.length < 1) return res.status(400).send({ error: 'Missing "videoIds"' })
  if (videoIds.some(({ id, name }) => !id || !name)) return res.status(400).send({ error: 'Missing "id" or "name" in "videosIds"' })
  if (!fileType || !['video', 'onlyVideo', 'audio'].includes(fileType)) return res.status(400).send({ error: 'Missing "fileType", valid filetypes: "video", "onlyVideo", "audio"' })

  const extension = 'mp4'

  const videosStorePath = `${__dirname}/${UuidV4()}`
  mkdirSync(videosStorePath)

  const downloadOptions = _getDownloadOptions(fileType)

  await _downloadVideo({ extension, videoIds, storePath: videosStorePath, downloadOptions })
  const zipPath = await compressDirectory(videosStorePath)
  const stream = createReadStream(zipPath)

  stream.on('data', (data: unknown) => res.write(data))
  stream.on('end', () => {
    res.end();
    rmSync(zipPath)
  })
}
