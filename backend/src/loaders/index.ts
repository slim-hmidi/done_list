import express, { Express } from 'express';
import { Model } from 'objection';
import connection from './db';
import expressLoader from './express';

const appLoader = async (app: Express) => {
  // Bind objection models to database connection
  Model.knex(connection);
  await expressLoader(app);
};

const app: Express = express();
const launchApp = async (expressApp: Express) => appLoader(expressApp);

launchApp(app);

export default app;
