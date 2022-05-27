import { Controller, VideoDetails } from '@definitions'
import { DownloaderService } from '@services'
import { getVideoId } from '@utils'

function _getVideoInfo (videoUrl: string): Promise<VideoDetails> {
  const videoId = getVideoId(videoUrl)
  if (videoId === '') throw { error: `Missing para "v" in "${videoUrl}"`, status: 400 }

  const downloader = new DownloaderService()
  return downloader.getVideoDetail(videoId)
}

export const GetVideosInfoController: Controller = async (req, res) => {
  try {
    const { urls }: { urls: string[] } = req.body

    if (!urls || urls.length < 1) return res.status(400).send({ error: 'Missing "urls"' })

    const videosInfo: VideoDetails[] = []
    for (const url of  urls) videosInfo.push(await _getVideoInfo(url))

    return res.status(200).send({ videosInfo })

  } catch (err: any) {
    console.error(err)

    const { error, status } = err
    if (error && status) return res.status(status).send({ error })

    return res.status(500).send({ error: 'Unexpected error' })
  }
}
