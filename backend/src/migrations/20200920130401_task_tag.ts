import { Knex } from 'knex';
import tableNames from '@constants/tableNames';

export async function up(knex: Knex): Promise<void> {
  // eslint-disable-next-line consistent-return
  return knex.schema.hasTable(tableNames.taskTag).then((exists) => {
    if (!exists) {
      return knex.schema.createTable(tableNames.taskTag, (table) => {
        table.increments('id').primary();
        table
          .integer('task_id')
          .unsigned()
          .references('id')
          .inTable('task')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
          .index();
        table
          .integer('tag_id')
          .unsigned()
          .references('id')
          .inTable('tag')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
          .index();
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`DROP TABLE IF EXISTS ${tableNames.taskTag} CASCADE`);
}
