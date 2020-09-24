//process.env.NODE_ENV = "test";
import { app } from "../app";
import request from "supertest";

describe("Server", () => {
  it("should return 200 when access the homepage", async () => {
    const response = await request(app)
      .get("/");

    expect(response.status).toBe(200);
  });
});
