import * as Knex from "knex";
import { tableNames } from "../constants/tableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.taskTag).del();

  // Inserts seed entries
  await knex(tableNames.taskTag).insert([{
    id: 1,
    tag_id: 1,
    task_id: 1,
  }, {
    id: 2,
    tag_id: 2,
    task_id: 2,
  }, {
    id: 3,
    tag_id: 3,
    task_id: 3,
  }, {
    id: 4,
    tag_id: 4,
    task_id: 4,
  }, {
    id: 5,
    tag_id: 5,
    task_id: 5,
  }, {
    id: 6,
    tag_id: 6,
    task_id: 6,
  }, {
    id: 7,
    tag_id: 7,
    task_id: 7,
  }, {
    id: 8,
    tag_id: 8,
    task_id: 8,
  }]);
}
