import { Knex } from 'knex';
import tableNames from '@constants/tableNames';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line consistent-return
  return knex.schema.hasTable(tableNames.task).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableNames.task, (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.date('realisation_date').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
          .index();
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TABLE IF EXISTS ${tableNames.task} CASCADE`);
}
