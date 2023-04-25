const request = require('supertest');
const app = require('../../../src/app');
const setupTestDB = require('../../utils/setupTestDB');

describe('Auth API', () => {
  const accessToken = '';
  let userUUID = '';

  setupTestDB();
  describe('Sign Up', () => {
    it('should sign up a user', async () => {
      const res = await request(app).get('/auth/sign-up').send({
        from: 'test@example.com',
        password: 'testpassword',
        role: 'user',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('uuid');
      userUUID = res.body.uuid;
    });
  });

  describe('Sign In', () => {
    it('should sign in a user', async () => {
      const res = await request(app).get('/auth/sign-in').send({
        from: 'test@example.com',
        password: 'testpassword',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('uuid');
      expect(res.body.uuid).toEqual(userUUID);
    });
  });

  describe('Sign in with Access Token', () => {
    it('should sign in a user with access token', async () => {
      const res = await request(app).get('/auth/access-token').set('Authorization', `Bearer ${accessToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('uuid');
      expect(res.body.uuid).toEqual(userUUID);
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const res = await request(app)
        .post('/auth/user/update')
        .send({
          uuid: userUUID,
          from: 'newemail@example.com',
          password: 'newtestpassword',
          role: 'admin',
          data: {
            displayName: 'John Doe',
            photoURL: 'https://example.com/johndoe.jpg',
            email: 'newemail@example.com',
            settings: {
              layout: {},
              theme: {},
            },
            shortcuts: ['dashboard', 'profile'],
          },
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('uuid');
      expect(res.body.uuid).toEqual(userUUID);
    });
  });
});
