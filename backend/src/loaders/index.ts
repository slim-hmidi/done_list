import express, { Express } from 'express';
import { Model } from 'objection';
import connection from './db';
import expressLoader from './express';
import logger from './logger';

const appLoader = async (app: Express) => {
  // Bind objection models to database connection
  Model.knex(connection);
  logger.info('Successful connection to database');
  await expressLoader(app);
};

const app: Express = express();
const launchApp = async (expressApp: Express) => appLoader(expressApp);

launchApp(app);

logger.info('Successful express app load');

export default app;
