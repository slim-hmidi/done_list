import express, { Express } from "express";
import bodyParser from "body-parser";
import { routes } from "./routes/index";

const app: Express = express();

app.use(bodyParser.json());
app.use("/", routes);

export {
  app,
};
