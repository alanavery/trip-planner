let expect = require('chai').expect;
let request = require('supertest');
let app = require('../server');
let db = require('../models');
let agent = request.agent(app);

before(done => {
  db.sequelize.sync({ force: true }).then(() => {
    done();
  });
});

describe('Trips Controller', () => {
  describe('GET /trips', () => {
    it('should redirect to /auth/login if not logged in', done => {
      request(app).get('/trips')
        .expect('Location', '/auth/login')
        .expect(302, done);
    });

    it('should return 200 response if logged in', done => {
      agent.post('/auth/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe20@gmail.com',
          password: 'password'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            agent.get('/trips').expect(200, done);
          }
        });
    });
  });
});