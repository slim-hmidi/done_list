import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWRORD || "postgres",
      database: process.env.DB_DEV_NAME || "done_list",
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWRORD || "postgres",
      database: process.env.DB_DEV_NAME || "done_list_test",
    },
  },
};
