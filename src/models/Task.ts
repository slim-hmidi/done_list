import { Model } from "objection";
import { tableNames } from "../constants/tableNames";
import User from "./User";

export default class Task extends Model {
  id!: number;
  title!: string;
  description!: string;
  realisation_date!: string;

  static tableName = tableNames.task;

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      title: { type: "string" },
      description: { type: "string" },
      realisation_date: { type: "string", format: "date" },
    },
  };

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "task.user_id",
        to: "user.id",
      },
    },
  };
}
