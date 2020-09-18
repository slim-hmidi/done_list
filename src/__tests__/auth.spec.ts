process.env.NODE_ENV = "test";
import request from "supertest";
import { app } from "../app";
import connection from "../db";

describe("Authentication", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.migrate.rollback();
  });
  it("Should returns an error if any field is missed", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@gmail.com",
        birthday: "1990-12-01",
        password: "jSmith@2020",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Username required");
  });

  it("Should returns an error if email not valid", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "John",
        last_name: "Smith",
        username: "johnSmith",
        email: "john.smith@gmail",
        birthday: "1990-12-01",
        password: "jSmith@2020",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Email not valid");
  });

  it("Should returns an error if password not valid", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@gmail",
        birthday: "1990-12-01",
        password: "john",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Password not valid");
  });

  it("Should returns an error if brithday does not match the format", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@gmail.com",
        birthday: "12/01/1990",
        password: "jSmith@2020",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      "Birthday does not match the format yyyy-mm-dd",
    );
  });

  it("Should returns an error if the user already exists", async () => {
    const user = {
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@gmail.com",
      birthday: "12/01/1990",
      password: "jSmith@2020",
    };
    await request(app)
      .post("/auth/signup")
      .send(user);

    const response = await request(app)
      .post("/auth/signup")
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      "User already exists",
    );
  });
  it("Should returns successfully the created user", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@gmail.com",
        birthday: "12/01/1990",
        password: "jSmith@2020",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(
      "User created successfully",
    );
  });
});
