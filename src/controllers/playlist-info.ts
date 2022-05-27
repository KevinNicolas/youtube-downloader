import { Controller } from "@definitions";
import { DownloaderService } from "@services";
import { Console, getPlaylistId } from "@utils";

export const GetPlaylistInfoController: Controller = async (req, res) => {
  try {
    const { url }: { url: string } = req.body

    if (!url || url === '') throw { status: 400, error: 'Missing "url"' }

    const playlistId = getPlaylistId(url)
    if (playlistId === '') throw { status: 400, error: 'The url is not a playlist, missing "list" in queryParams' }

    const downloader = new DownloaderService()
    const playlistInfo = await downloader.getPlaylistDetail(playlistId)

    res.status(200).send({ playlistInfo })
  } catch (err: unknown) {
    Console.devError(err)
    const { status, error } = err as { status?: number, error?: string }
    if (status && error) return res.status(status).send({ error })
    res.status(500).send({ error: 'Unexpected error' })
  }
}
