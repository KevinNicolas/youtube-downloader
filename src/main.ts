import 'dotenv/config';
import express from 'express';
import { DownloadController, GetVideoInfoController } from '@controllers';

(() => {
  const app = express();
  app.use(express.json());
  app.set('port', process.env.PORT || 3030);

  app.post('/download', DownloadController);
  app.post('/videoinfo', GetVideoInfoController);

  app.listen(app.get('port'), () => console.info(`Server listen on port ${app.get('port')}`));
})();
