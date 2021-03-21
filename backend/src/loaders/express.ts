import '../utils/env';
import { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../api/routes';
import { notFound, errorHandlerMiddleware } from '../api/middlewares/errorHandler';

const expressLoader = (app: Express) => {
  // Enable Cross-origin
  app.use(cors());

  app.use(json());
  app.use(helmet());
  app.use('/', routes);

  // middlewares
  app.use(notFound);
  app.use(errorHandlerMiddleware);
};

export default expressLoader;
