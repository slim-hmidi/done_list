import request from "supertest";
import { app } from "../app";
import connection from "../db";
import { errorMessages } from "../constants/httpUtils";

describe("Tasks", () => {
  afterAll(() => connection.destroy());
  describe("POST /task", () => {
    beforeEach(() =>
      connection.migrate.rollback()
        .then(() => connection.migrate.latest())
    );
    it("Should returns an error if the title is missing", async () => {
      const response = await request(app).post("/tasks")
        .send({
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1,
          tagId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.titleRequired);
    });

    it("Should returns an error if the description is missing", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          realisationDate: "2020-09-20",
          userId: 1,
          tagId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.descriptionRequired);
    });

    it("Should returns an error if the realisationDate is missing", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          userId: 1,
          tagId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.realisationDateRequired,
      );
    });

    it("Should returns an error if the userId is missing", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          tagId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.userIdRequired,
      );
    });

    it("Should returns an error if the tagId is missing", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.tagIdRequired,
      );
    });

    it("Should returns an error if the userId does not exist", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1234,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.invalidUserId,
      );
    });

    it("Should returns an error if the tagId does not exist", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1,
          tagId: 1234,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.invalidTagId,
      );
    });

    it("Should create successfully the task", async () => {
      const response = await request(app).post("/tasks")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.userIdRequired,
      );
    });
  });
});
