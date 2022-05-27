import 'dotenv/config';
import express from 'express';
import { routes } from './routes'

(() => {
  const app = express();
  app.use(express.json());
  app.set('port', process.env.PORT || 3030);

  app.use(routes);

  app.listen(app.get('port'), () => console.info(`Server listen on port ${app.get('port')}`));
})();
