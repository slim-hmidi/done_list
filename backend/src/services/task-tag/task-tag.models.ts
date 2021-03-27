import { Model } from 'objection';
import tableNames from 'constants/tableNames';

export default class Tag extends Model {
  id!: number;

  // eslint-disable-next-line camelcase
  task_id!: number;

  // eslint-disable-next-line camelcase
  tag_id!: number;

  static tableName = tableNames.taskTag;

  static jsonSchema = {
    type: 'object',
    required: ['task_id', 'tag_id'],

    properties: {
      id: { type: 'integer' },
      task_id: { type: 'number' },
      tag_id: { type: 'number' },
    },
  };
}
