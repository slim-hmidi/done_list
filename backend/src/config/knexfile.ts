import * as path from 'path';

export = {
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
};
