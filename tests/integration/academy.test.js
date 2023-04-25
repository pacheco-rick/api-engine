const request = require('supertest');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Academy API', () => {
  let courseIdToBeDeleted;
  let courseIdToBeUpdated;

  it('POST /academy/courses - Create a new course', async () => {
    const res = await request(app)
      .post('/academy/courses')
      .send({
        title: 'New Course',
        slug: 'new-course',
        description: 'A new course',
        category: 'web',
        duration: 60,
        totalSteps: 5,
        featured: true,
        progress: {
          currentStep: 0,
          completed: 0,
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    courseIdToBeDeleted = res.body.id;
    courseIdToBeUpdated = res.body.id;
  });

  it('GET /academy/courses - Retrieve all courses', async () => {
    const res = await request(app).get('/academy/courses');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /academy/courses/{courseId} - Retrieve a course by ID', async () => {
    const res = await request(app).get(`/academy/courses/${courseIdToBeDeleted}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', courseIdToBeDeleted);
  });

  it('PUT /academy/courses/{courseId} - Update a course by ID', async () => {
    const res = await request(app)
      .put(`/academy/courses/${courseIdToBeUpdated}`)
      .send({
        title: 'Updated Course',
        slug: 'updated-course',
        description: 'An updated course',
        category: 'android',
        duration: 120,
        totalSteps: 8,
        featured: false,
        progress: {
          currentStep: 2,
          completed: 1,
        },
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', courseIdToBeUpdated);
    expect(res.body).toHaveProperty('title', 'Updated Course');
  });

  it('DELETE /academy/courses/{courseId} - Delete a course by ID', async () => {
    const res = await request(app).delete(`/academy/courses/${courseIdToBeDeleted}`);

    expect(res.statusCode).toEqual(204);
  });
});
