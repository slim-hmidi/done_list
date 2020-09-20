import request from "supertest";
import * as Knex from "knex";
import { app } from "../app";
import connection from "../db";
import { errorMessages, successMessages } from "../constants/httpUtils";

describe("Tasks", () => {
  beforeAll(() => {
    return connection.migrate.rollback()
      .then(() => connection.migrate.latest())
      .then(() =>
        connection.seed.run({ directory: "./src/seeds", extension: ".ts" })
      );
  });
  afterAll(() => connection.migrate.rollback());
  describe("POST /task", () => {
    // beforeEach(() =>
    //   connection.migrate.rollback()
    //     .then(() => connection.migrate.latest())
    //     .then(() =>
    //       connection.seed.run({ directory: "./src/seeds", extension: ".ts" })
    //     )
    // );
    it("Should returns an error if the title is missing", async () => {
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1234,
          tagId: 1,
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(
        errorMessages.invalidUserId,
      );
    });

    it("Should returns an error if the tagId does not exist", async () => {
      const response = await request(app).post("/tasks/add")
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
      const response = await request(app).post("/tasks/add")
        .send({
          title: "task title",
          description: "task description",
          realisationDate: "2020-09-20",
          userId: 1,
          tagId: 1,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        successMessages.taskCreationSuccess,
      );
    });
  });
  describe("Get /tasks", () => {
    it("Should return an error if the userId is missing", async () => {
      const response = await request(app).get("/tasks");

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.userIdRequired);
    });
    it("Should return an empty list if there is no tasks for the given user", async () => {
      const response = await request(app).get(`/tasks?userId=11`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });

    it("Should return the list tasks for the given user", async () => {
      const response = await request(app).get(`/tasks?userId=10`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });

    it("Should return an error if the user does not exist", async () => {
      const response = await request(app).get(`/tasks?userId=100`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.invalidUserId);
    });
  });

  describe("Delete /tasks/:id", () => {
    it("Should return an error if the userId is missing", async () => {
      const response = await request(app).delete("/tasks/100");

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.userIdRequired);
    });
    it("Should return an error if the task id not valid", async () => {
      const response = await request(app).delete(`/tasks/100?userId=11`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.invalidTaskId);
    });

    it("Should return an error if the task does not belong to the given user", async () => {
      const response = await request(app).delete(`/tasks/1?userId=5`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.taskNotBelongsToUser);
    });

    it("Should deletes successfully the task", async () => {
      const response = await request(app).delete(`/tasks/1?userId=1`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        successMessages.taskDeletionSuccess,
      );
    });
  });

  describe("Get /tasks/:id", () => {
    it("Should return an error if the userId is missing", async () => {
      const response = await request(app).get(`/tasks/${100}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.userIdRequired);
    });
    it("Should return an error if the task id not valid", async () => {
      const response = await request(app).get(`/tasks/100?userId=11`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.invalidTaskId);
    });

    it("Should return an error if the task does not belong to the given user", async () => {
      const response = await request(app).get(`/tasks/1?userId=5`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.taskNotBelongsToUser);
    });

    it("Should return an error if the user does not exist", async () => {
      const response = await request(app).get(`/tasks?userId=100`);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(errorMessages.invalidUserId);
    });

    it("Should returns successfully the task", async () => {
      const response = await request(app).get(`/tasks/1?userId=1`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        successMessages.taskFetchSuccess,
      );
    });
  });

  describe("Update /tasks/:id", () => {
    it("Should return an error if the task id not valid", async () => {
      const response = await request(app).put("/tasks/100").send(
        { title: "updated title" },
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(errorMessages.invalidTaskId);
    });

    it("Should return an error if the task does not belong to the given user", async () => {
      const response = await request(app).put(`/tasks/1`).send(
        { title: "updated title", userId: 2 },
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        errorMessages.updateUserTaskNotAllowed,
      );
    });

    it("Should update successfully the task", async () => {
      const response = await request(app).put("/tasks/1").send({
        title: "updated Title",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual(
        successMessages.taskUpdateSuccess,
      );
    });
  });
});
