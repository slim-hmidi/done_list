import knex from 'knex';
import knexConfiguration, {EnvironmentType} from '@config/knexfile';

const environment: EnvironmentType = (process.env.NODE_ENV?.trim() ?? 'development') as EnvironmentType;
const connectionConfig = knexConfiguration[environment];
const connection = knex(connectionConfig);

export default connection;
