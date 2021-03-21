import { Model } from 'objection';
import tableNames from '../../constants/tableNames';

export default class Tag extends Model {
  id!: number;

  name!: string;

  static tableName = tableNames.tag;

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  };
}
