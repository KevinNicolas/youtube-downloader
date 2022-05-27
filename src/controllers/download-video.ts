import { Controller } from '@definitions'
import { DownloaderService } from '@services'
import { Stream } from 'stream'

export const DownloadVideoController: Controller = async (req, res) => {
  try {
    const { videoId }: { videoId: string } = req.body

    if (!videoId) return res.status(400).send({ error: 'Missing "videoId"' })

    const downloader = new DownloaderService()
    const stream: Stream = await downloader.downloadVideo(videoId)

    stream.on('data', (data: unknown) => res.write(data))
    stream.on('end', () => res.end())

  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Unexpected error' })
  }
}
