import express, {Express} from 'express';
import appLoader from './loaders/index';

const port = process.env.PORT || 5000;

const startServer = async () => {
  const app: Express = express();

  await appLoader(app);

  app.listen(port, () => {
    console.log(`Server listens on ${port}`);
  })
};

startServer();
