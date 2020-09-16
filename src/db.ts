import knex, { Config } from "knex";
import { Model } from "objection";
import * as knexConfig from "./knexfile";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = (knexConfig as any)[environment];

const connection = knex(connectionConfig);

Model.knex(connection);

export {
  connection,
};
