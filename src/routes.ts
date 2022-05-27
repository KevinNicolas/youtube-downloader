import { Router } from 'express'
import { DownloadVideoController, GetPlaylistInfoController, GetVideosInfoController } from '@controllers'
import { DownloadMultipleVideosController } from 'controllers/download-multiple-videos'

const router = Router()

router.post('/getvideosinfo', GetVideosInfoController)
router.post('/getplaylistinfo', GetPlaylistInfoController)
router.post('/download/video', DownloadVideoController)
router.post('/download/multiplevideos', DownloadMultipleVideosController)

export const routes = router
