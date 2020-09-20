import * as Knex from "knex";
import { tableNames } from "../constants/tableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(tableNames.tag).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableNames.tag, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TABLE IF EXISTS ${tableNames.tag} CASCADE`);
}
