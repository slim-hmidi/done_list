import request from 'supertest';
import app from 'loaders/index';
import connection from 'loaders/db';
import { errorMessages, successMessages } from 'constants/httpUtils';

describe('Tasks', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run({ directory: './src/seeds', extension: '.ts' })));
  afterAll(() => connection.migrate.rollback());
  describe('POST /task', () => {
    it('Should returns an error if the title is missing', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        description: 'task description',
        realisationDate: '2020-09-20',
        userId: 1,
        tagId: 1,
      });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.titleRequired);
    });

    it('Should returns an error if the description is missing', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        realisationDate: '2020-09-20',
        userId: 1,
        tagId: 1,
      });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.descriptionRequired);
    });

    it('Should returns an error if the realisationDate is missing', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        userId: 1,
        tagId: 1,
      });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.realisationDateRequired);
    });

    it('Should returns an error if the userId is missing', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        realisationDate: '2020-09-20',
        tagId: 1,
      });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.userIdRequired);
    });

    it('Should returns an error if the tagId is missing', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        realisationDate: '2020-09-20',
        userId: 1,
      });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.tagIdRequired);
    });

    it('Should returns an error if the userId does not exist', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        realisationDate: '2020-09-20',
        userId: 1234,
        tagId: 1,
      });

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidUserId);
    });

    it('Should returns an error if the tagId does not exist', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        realisationDate: '2020-09-20',
        userId: 1,
        tagId: 1234,
      });

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidTagId);
    });

    it('Should create successfully the task', async () => {
      const { status, body } = await request(app).post('/tasks/add').send({
        title: 'task title',
        description: 'task description',
        realisationDate: '2020-09-20',
        userId: 1,
        tagId: 1,
      });

      const { data } = body;

      expect(status).toBe(200);
      expect(body.message).toEqual(successMessages.taskCreationSuccess);
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('realisationDate');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('tags');
      expect(data.tags[0]).toHaveProperty('id');
      expect(data.tags[0]).toHaveProperty('name');
    });
  });
  describe('Get /tasks', () => {
    it('Should return an error if the userId is missing', async () => {
      const { status, body } = await request(app).get('/tasks');

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.userIdRequired);
    });
    it('Should return an empty list if there is no tasks for the given user', async () => {
      const { status, body } = await request(app).get('/tasks?userId=11');

      expect(status).toBe(200);
      expect(body.data).toHaveLength(0);
    });

    it('Should return the list tasks for the given user', async () => {
      const { status, body } = await request(app).get('/tasks?userId=5');
      const { data } = body;

      expect(status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('realisationDate');
      expect(data[0]).toHaveProperty('description');
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('tags');
      expect(data[0].tags[0]).toHaveProperty('id');
      expect(data[0].tags[0]).toHaveProperty('name');
    });

    it('Should return the list tasks for the given user', async () => {
      const { status, body } = await request(app).get('/tasks?userId=10');
      const { data } = body;

      expect(status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('realisationDate');
      expect(data[0]).toHaveProperty('description');
      expect(data[0]).toHaveProperty('id');
    });

    it('Should return an error if the user does not exist', async () => {
      const { status, body } = await request(app).get('/tasks?userId=100');

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidUserId);
    });
  });

  describe('Delete /tasks/:id', () => {
    it('Should return an error if the userId is missing', async () => {
      const { status, body } = await request(app).delete('/tasks/100');

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.userIdRequired);
    });
    it('Should return an error if the task id not valid', async () => {
      const { status, body } = await request(app).delete('/tasks/100?userId=11');

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidTaskId);
    });

    it('Should return an error if the task does not belong to the given user', async () => {
      const { status, body } = await request(app).delete('/tasks/1?userId=5');

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.taskNotBelongsToUser);
    });

    it('Should deletes successfully the task', async () => {
      const { status, body } = await request(app).delete('/tasks/1?userId=1');

      expect(status).toBe(200);
      expect(body.message).toEqual(successMessages.taskDeletionSuccess);
    });
  });

  describe('Get /tasks/:id', () => {
    it('Should return an error if the userId is missing', async () => {
      const { status, body } = await request(app).get(`/tasks/${100}`);

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.userIdRequired);
    });
    it('Should return an error if the task id not valid', async () => {
      const { status, body } = await request(app).get(
        `/tasks/${100}?userId=${11}`,
      );

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidTaskId);
    });

    it('Should return an error if the task does not belong to the given user', async () => {
      const { status, body } = await request(app).get('/tasks/1?userId=5');

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.taskNotBelongsToUser);
    });

    it('Should return an error if the user does not exist', async () => {
      const { status, body } = await request(app).get('/tasks?userId=100');

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidUserId);
    });

    it('Should returns successfully the task', async () => {
      const { status, body } = await request(app).get('/tasks/1?userId=1');
      const { data } = body;

      expect(status).toBe(200);
      expect(body.message).toEqual(successMessages.taskFetchSuccess);
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('realisationDate');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('tags');
      expect(data.tags[0]).toHaveProperty('id');
      expect(data.tags[0]).toHaveProperty('name');
    });
  });

  describe('Update /tasks/:id', () => {
    it('Should return an error if the task id not valid', async () => {
      const { status, body } = await request(app)
        .patch(`/tasks/${100}`)
        .send({ title: 'updated title', userId: 1 });

      expect(status).toBe(404);
      expect(body.message).toEqual(errorMessages.invalidTaskId);
    });

    it('Should return an error while updating the userId', async () => {
      const { status, body } = await request(app)
        .patch('/tasks/1')
        .send({ title: 'updated title', userId: 2 });

      expect(status).toBe(400);
      expect(body.message).toEqual(errorMessages.updateUserNotAllowed);
    });

    it('Should update successfully the task', async () => {
      const { status, body } = await request(app).patch(`/tasks/${1}`).send({
        title: 'updated Title',
        userId: 1,
      });
      const { data } = body;

      expect(status).toBe(200);
      expect(body.message).toEqual(successMessages.taskUpdateSuccess);
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('realisationDate');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('tags');
      expect(data.tags[0]).toHaveProperty('id');
      expect(data.tags[0]).toHaveProperty('name');
    });
  });
});
