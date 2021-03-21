import knex from 'knex';
import knexConfig from '../config/knexfile';

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = (knexConfig as any)[environment];
const connection = knex(connectionConfig);

export default connection;
