let expect = require('chai').expect;
let request = require('supertest');
let app = require('../server');
let db = require('../models');

before(done => {
  db.sequelize.sync({ force: true }).then(() => {
    done();
  });
});

describe('Auth Controller', () => {
  describe('GET /auth/signup', () => {
    it('should return 200 response', done => {
      request(app).get('/auth/signup').expect(200, done);
    });
  });

  describe('POST /auth/signup', () => {
    it('should redirect to /trips on success', done => {
      request(app).post('/auth/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe10@gmail.com',
          password: 'password'
        })
        .expect('Location', '/trips')
        .expect(302, done);
    });

    it('should redirect to /auth/signup on failure', done => {
      request(app).post('/auth/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe10@gmail.com',
          password: 'pw'
        })
        .expect('Location', '/auth/signup')
        .expect(302, done);
    });
  });

  describe('GET /auth/login', () => {
    it('should return 200 response', done => {
      request(app).get('/auth/login').expect(200, done);
    });
  });

  describe('POST /auth/login', () => {
    it('should redirect to /trips on success', done => {
      request(app).post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'jdoe10@gmail.com',
          password: 'password'
        })
        .expect('Location', '/trips')
        .expect(302, done);
    });

    it('should redirect to /auth/login on failure', done => {
      request(app).post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'jdoe10@gmail.com',
          password: 'pw'
        })
        .expect('Location', '/auth/login')
        .expect(302, done);
    });
  });

  describe('GET /auth/logout', () => {
    it('should return 200 response', done => {
      request(app).get('/auth/logout')
        .expect('Location', '/')
        .expect(302, done);
    });
  });
});