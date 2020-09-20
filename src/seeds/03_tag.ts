import * as Knex from "knex";
import { tableNames } from "../constants/tableNames";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.tag).del();

  // Inserts seed entries
  await knex(tableNames.tag).insert([
    { id: 1, name: "General" },
    { id: 2, name: "Software" },
    { id: 3, name: "sport" },
    { id: 4, name: "culture" },
    { id: 5, name: "reading" },
    { id: 6, name: "travel" },
    { id: 7, name: "Site Seeing" },
    { id: 8, name: "Workout" },
  ]);
}
