import { Model } from "objection";
import { tableNames } from "../constants/tableNames";
import Tag from "./Tag";
import TaskTag from "./TaskTag";
import User from "./User";

export default class Task extends Model {
  id!: number;
  title!: string;
  description!: string;
  realisation_date!: string;
  user_id!: number;

  static tableName = tableNames.task;

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      description: { type: "string" },
      realisation_date: { type: "string", format: "date" },
      user_id: { type: "integer" },
    },
  };

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "task.user_id",
        to: "user.id",
      },
    },
    tag: {
      relation: Model.ManyToManyRelation,
      modelClass: Tag,
      join: {
        from: "task.id",
        through: {
          from: "task_tag.task_id",
          to: "task_tag.tag_id",
          model: TaskTag,
        },
        to: "tag.id",
      },
    },
  });
}
