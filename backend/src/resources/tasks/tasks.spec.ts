/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import request from 'supertest';
const API_BASE_URL = 'http://localhost:3000';

describe('Tasks', () => {
  beforeAll(async () => {});

  let testId: number;

  describe('POST', () => {
    it('should return 201 if a valid DTO is provided', async () => {
      const newTask = {
        name: 'Test Task',
        description: 'This is a test task',
        endDate: '2024-12-31',
        state: 'pending',
      };
      const res = await request(API_BASE_URL).post('/tasks').send(newTask);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('description');
      expect(res.body).toHaveProperty('endDate');
      expect(res.body).toHaveProperty('state');
      testId = res.body.id;

      await deleteTaskTest(testId);
    });
  });

  describe('GET', () => {
    it('should return 200 if task was found', async () => {
      const testId = await createTaskTest();
      const res = await request(API_BASE_URL).get(`/tasks/${testId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('description');
      expect(res.body).toHaveProperty('endDate');
      expect(res.body).toHaveProperty('state');
      await deleteTaskTest(testId);
    });

    it('should return 200 if tasks were found', async () => {
      await createTaskTest();
      const res = await request(API_BASE_URL).get('/tasks');
      expect(res.statusCode).toBe(200);
      await deleteTaskTest(testId);
    });
  });

  describe('PATCH', () => {
    it('should return 200 if task was updated', async () => {
      const testId = await createTaskTest();
      const updatedTask = {
        name: 'task 12',
      };

      const res = await request(API_BASE_URL)
        .patch(`/tasks/${testId}`)
        .send(updatedTask);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name');
      await deleteTaskTest(testId);
    });
  });

  describe('DELETE', () => {
    it('should return 200 if task was deleted', async () => {
      const testId = await createTaskTest();
      const res = await request(API_BASE_URL).delete(`/tasks/${testId}`);
      expect(res.statusCode).toBe(200);
    });
  });
});

async function createTaskTest() {
  const newTask = {
    name: 'Test Task',
    description: 'This is a test task',
    endDate: '2024-12-31',
    state: 'pending',
  };

  const res = await request(API_BASE_URL).post('/tasks').send(newTask);
  return res.body.id;
}

async function deleteTaskTest(testId: number) {
  await request(API_BASE_URL).delete(`/tasks/${testId}`);
}
