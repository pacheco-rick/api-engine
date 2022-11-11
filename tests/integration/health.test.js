const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');

const httpMethods = ['POST', 'PUT', 'DELETE', 'GET'];

describe('Health routes', () => {
  httpMethods.forEach((method) => {
    describe(`${method} /v1/health`, () => {
      test('should always return 200', async () => {
        config.env = 'production';
        await request(app)[method.toLowerCase()]('/v1/health').expect(httpStatus.OK);

        config.env = process.env.NODE_ENV;
      });
    });
  });
});
