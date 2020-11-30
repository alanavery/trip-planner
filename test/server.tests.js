let expect = require('chai').expect;
let request = require('supertest');
let app = require('../server');

describe('GET /', () => {
  it('should return 200 response', done => {
    request(app).get('/').expect(200, done);
  });
});