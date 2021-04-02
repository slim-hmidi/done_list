import { Model } from 'objection';
import tableNames from '@constants/tableNames';
import Tag from '../tag/tag.models';
import TaskTag from '../task-tag/task-tag.models';
import User from '../auth/auth.models';

export default class Task extends Model {
  id!: number;

  title!: string;

  description!: string;

  // eslint-disable-next-line camelcase
  realisation_date!: string;

  // eslint-disable-next-line camelcase
  user_id!: number;

  user?: User;

  tags?: Tag[];

  static tableName = tableNames.task;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      description: { type: 'string' },
      realisation_date: { type: 'string', format: 'date' },
      user_id: { type: 'integer' },
    },
  };

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'task.user_id',
        to: 'user.id',
      },
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: 'task.id',
        through: {
          from: 'task_tag.task_id',
          to: 'task_tag.tag_id',
          model: TaskTag,
        },
        to: 'tag.id',
      },
    },
  });
}
