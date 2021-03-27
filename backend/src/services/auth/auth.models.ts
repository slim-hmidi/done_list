import { Model } from 'objection';
import tableNames from 'constants/tableNames';

export default class User extends Model {
  id!: number;

  // eslint-disable-next-line camelcase
  first_name!: string;

  // eslint-disable-next-line camelcase
  last_name!: string;

  username!: string;

  email!: string;

  birthday!: string;

  password!: string;

  static tableName = tableNames.user;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      birthday: { type: 'string', format: 'date' },
    },
  };
}
