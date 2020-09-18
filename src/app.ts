import "./utils/env";
import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { Model } from "objection";
import { connection } from "./db";
import { routes } from "./routes/index";
import { notFound, errorHandlerMiddleware } from "./middlewares";

// Bind objection models to database connection
Model.knex(connection);

const app: Express = express();

app.use(bodyParser.json());
app.use(helmet());

app.use("/", routes);

// middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

export {
  app,
};
