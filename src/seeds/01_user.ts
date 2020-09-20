import * as Knex from "knex";
import { tableNames } from "../constants/tableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.user).del();

  // Inserts seed entries
  await knex(tableNames.user).insert([{
    id: 1,
    first_name: "Wallie",
    last_name: "Buie",
    username: "wbuie0",
    email: "wbuie0@newyorker.com",
    password: "uzGI6H5tN",
    birthday: "1990-07-05",
  }, {
    id: 2,
    first_name: "Toma",
    last_name: "Tullis",
    username: "ttullis1",
    email: "ttullis1@about.com",
    password: "5aG40rBYlJ",
    birthday: "1981-05-01",
  }, {
    id: 3,
    first_name: "Maxy",
    last_name: "Folk",
    username: "mfolk2",
    email: "mfolk2@umich.edu",
    password: "culJJXpv",
    birthday: "1994-06-08",
  }, {
    id: 4,
    first_name: "Alic",
    last_name: "Flag",
    username: "aflag3",
    email: "aflag3@guardian.co.uk",
    password: "Zp1EjB",
    birthday: "1976-12-05",
  }, {
    id: 5,
    first_name: "Mickie",
    last_name: "Hadfield",
    username: "mhadfield4",
    email: "mhadfield4@constantcontact.com",
    password: "uKsmRu4OC0B",
    birthday: "1993-02-25",
  }, {
    id: 6,
    first_name: "Jourdain",
    last_name: "Jagoe",
    username: "jjagoe5",
    email: "jjagoe5@webnode.com",
    password: "V8a90bKd",
    birthday: "1984-06-11",
  }, {
    id: 7,
    first_name: "Kerk",
    last_name: "Southouse",
    username: "ksouthouse6",
    email: "ksouthouse6@hc360.com",
    password: "42NxbOqULP",
    birthday: "1978-04-21",
  }, {
    id: 8,
    first_name: "Hale",
    last_name: "Learie",
    username: "hlearie7",
    email: "hlearie7@lycos.com",
    password: "GhcvRnKs7U5u",
    birthday: "1990-07-05",
  }, {
    id: 9,
    first_name: "Xaviera",
    last_name: "Lumb",
    username: "xlumb8",
    email: "xlumb8@linkedin.com",
    password: "ZVPSBzRwc7W",
    birthday: "1989-09-10",
  }, {
    id: 10,
    first_name: "Brent",
    last_name: "Litster",
    username: "blitster9",
    email: "blitster9@csmonitor.com",
    password: "rZEXlWlfBep",
    birthday: "1985-03-15",
  }, {
    id: 11,
    first_name: "Alex",
    last_name: "Park",
    username: "alex20",
    email: "alex20@csmonitor.com",
    password: "rZEXlWlfBep",
    birthday: "1986-03-23",
  }]);

  await knex.schema.raw(
    "SELECT setval(pg_get_serial_sequence('user', 'id'), max(id)) FROM \"user\";",
  );
}
