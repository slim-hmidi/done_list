import {Express} from 'express';
import { Model } from 'objection';
import connection from './db';
import expressLoader from './express';


const appLoader = async (app: Express) => {
     // Bind objection models to database connection
     Model.knex(connection);
    await expressLoader(app);
};
export default appLoader;