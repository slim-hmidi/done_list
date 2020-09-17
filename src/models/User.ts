import { Model } from "objection";
import { tableNames } from "../constants/tableNames";

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        birthday: { type: "string", format: "date" },
      },
    };
  }
}

export {
  User,
};
