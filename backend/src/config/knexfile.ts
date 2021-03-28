import * as path from 'path';
export type EnvironmentType = 'development' | 'test' | 'production';
interface EnvironementTypeConfig {
  client: string;
  connection: {
    host: string;
    user: string;
    password: string;
    database: string;
  },
  migrations?: {
    directory: string;
    extension: string;
  }
} 

type knexConfig = Record<EnvironmentType, EnvironementTypeConfig>
const knexConfiguration: knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWRORD || 'postgres',
      database: process.env.DB_DEV_NAME || 'done_list',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWRORD || 'postgres',
      database: process.env.DB_TEST_NAME || 'done_list_test',
    },
    migrations: {
      directory: path.join(__dirname, '../migrations'),
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST as string,
      user: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWRORD as string,
      database: process.env.DB_DEV_NAME as string,
    },
  },
};

export default knexConfiguration;
