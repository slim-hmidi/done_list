import 'module-alias/register';
import app from './loaders/index';
import logger from './loaders/logger';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server listening on ${port}`);
});
