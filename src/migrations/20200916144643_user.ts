import * as Knex from "knex";
import { tableNames } from "../constants/tableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(tableNames.user).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableNames.user, (table) => {
        table.increments("id").primary();
        table.string("first_name", 255).notNullable();
        table.string("last_name", 255).notNullable();
        table.string("username", 50).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("email").notNullable().unique();
        table.date("birthday");
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TABLE IF EXISTS "${tableNames.user}" CASCADE;`);
}
