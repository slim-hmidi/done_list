import request from "supertest";
import { app } from "../app";
import connection from "../db";
import { errorMessages, successMessages } from "../constants/httpUtils";

describe("Tags", () => {
  beforeEach(() => {
    return connection.migrate.rollback()
      .then(() => connection.migrate.latest())
      .then(() =>
        connection.seed.run({ directory: "./src/seeds", extension: ".ts" })
      );
  });
  afterAll(() => connection.migrate.rollback());

  describe("Get/ tags", () => {
    it("Should returns successfully the existent tags", async () => {
      const response = await request(app).get("/tags");

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});
