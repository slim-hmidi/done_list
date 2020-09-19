import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable("task").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("task", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.text("description");
        table.date("realisation_date").notNullable();
        table.integer("user_id").notNullable()
          .references("id")
          .inTable("user")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")
          .index();
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("task");
}
