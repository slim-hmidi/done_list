process.env.NODE_ENV = "test";
import request from "supertest";
import { app } from "../app";
import connection from "../db";
import { errorMessages, successMessages } from "../constants/httpUtils";

describe("Authentication", () => {
  beforeEach(() =>
    connection.migrate.rollback()
      .then(() => connection.migrate.latest())
      .then(() =>
        connection.seed.run({ directory: "./src/seeds", extension: ".ts" })
      )
  );
  afterAll(() => connection.migrate.rollback());
  describe("Signup", () => {
    it("Should returns an error if username is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.usernameRequired);
    });

    it("Should returns an error if username length contains less than 2 characters", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "j",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.minLengthRequired("Username"),
      );
    });

    it("Should returns an error if firstName is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          username: "John",
          lastName: "Smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.firstNameRequired);
    });

    it("Should returns an error if firstname length contains less than 2 characters", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "J",
          lastName: "Smith",
          username: "john_smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.minLengthRequired("First name"),
      );
    });

    it("Should returns an error if lastName is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          username: "Smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.lastNameRequired);
    });

    it("Should returns an error if lastName contains less than 2 characters ", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "s",
          username: "JSmith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.minLengthRequired("Last name"),
      );
    });

    it("Should returns an error if email is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "john.smith",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.emailRequired);
    });

    it("Should returns an error if birthday is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "john.smith",
          email: "john.smith@gmail.com",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.birthdayRequired);
    });

    it("Should returns an error if password is missing", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          username: "john.smith",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.passwordRequired);
    });

    it("Should returns an error if email not valid", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "johnSmith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.emailNotValid);
    });

    it("Should returns an error if password length less than 8 characters", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "john",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.passwordLengthRequired,
      );
    });

    it("Should returns an error if password does not contains a lowercase", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "JOHN@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.lowerCaseCharacterRequired,
      );
    });

    it("Should returns an error if password does not contains a uppercase", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "john@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.upperCaseCharacterRequired,
      );
    });

    it("Should returns an error if password does not contains a special character", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "john2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.specialCharacterRequired,
      );
    });

    it("Should returns an error if password does not contains a number", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail",
          birthday: "1990-12-01",
          password: "john@Smith",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.numberRequired,
      );
    });

    it("Should returns an error if brithday does not match the format", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "john_smith",
          email: "john.smith@gmail.com",
          birthday: "12/01/1990",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.dateFormatRequired,
      );
    });

    it("Should returns an error if the user already exists", async () => {
      const user = {
        firstName: "Xaviera",
        lastName: "Lumb",
        username: "xlumb8",
        email: "xlumb8@linkedin.com",
        password: "zX@2020l",
        birthday: "1989-09-10",
      };

      const response = await request(app)
        .post("/auth/signup")
        .send(user);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual(
        errorMessages.userExists,
      );
    });

    it("Should returns successfully the created user", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "john_smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        successMessages.userCreationSuccess,
      );
    });
  });
  describe("signIn", () => {
    it("Should returns an error if username is missing", async () => {
      const response = await request(app).post("/auth/signin")
        .send({
          password: "123456",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.usernameRequired);
    });

    it("Should returns an error if password is missing", async () => {
      const response = await request(app).post("/auth/signin")
        .send({
          username: "john",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.passwordRequired);
    });

    it("Should returns an error if password is wrong", async () => {
      const response = await request(app).post("/auth/signin")
        .send({
          username: "xlumb8",
          password: "123456",
        });

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(errorMessages.wrongPassword);
    });

    it("Should returns an error if username does not exist", async () => {
      const response = await request(app).post("/auth/signin")
        .send({
          username: "john",
          password: "123456",
        });

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(errorMessages.invalidUsername);
    });

    it("Should returns successfully the signed in user", async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          firstName: "John",
          lastName: "Smith",
          username: "john_smith",
          email: "john.smith@gmail.com",
          birthday: "1990-12-01",
          password: "jSmith@2020",
        });
      const response = await request(app).post("/auth/signin")
        .send({
          username: "john_smith",
          password: "jSmith@2020",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(successMessages.signInSuccess);
    });
  });
});
