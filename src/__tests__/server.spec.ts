import { app } from "../app";
import request from "supertest";

describe("Server", () => {
  it("should return 200 when access the homepage", (done) => {
    request(app)
      .get("/")
      .expect(200, done);
  });
});
