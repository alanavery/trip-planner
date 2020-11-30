let expect = require('chai').expect;
let request = require('supertest');
let app = require('../server');
let db = require('../models');

before(done => {
  db.sequelize.sync({ force: true }).then(() => {
    done();
  });
});

describe('Create User', () => {
  it('should create successfully', done => {
    db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@gmail.com',
      password: 'password'
    }).then(() => {
      done();
    }).catch(err => {
      done(err);
    });
  });

  it('should throw error on invalid first name', done => {
    db.user.create({
      firstName: '',
      lastName: 'Doe',
      email: 'jdoe2@gmail.com',
      password: 'password'
    }).then(newUser => {
      done(newUser);
    }).catch(err => {
      done();
    });
  });

  it('should throw error on invalid last name', done => {
    db.user.create({
      firstName: 'John',
      lastName: '',
      email: 'jdoe3@gmail.com',
      password: 'password'
    }).then(newUser => {
      done(newUser);
    }).catch(err => {
      done();
    });
  });

  it('should throw error on invalid email', done => {
    db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'email',
      password: 'password'
    }).then(newUser => {
      done(newUser);
    }).catch(err => {
      done();
    });
  });

  it('should throw error on invalid password', done => {
    db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe4@gmail.com',
      password: 'pw'
    }).then(newUser => {
      done(newUser);
    }).catch(err => {
      done();
    });
  });

  it('should hash password before saving to database', done => {
    db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe5@gmail.com',
      password: 'password'
    }).then(newUser => {
      if (newUser.password === 'password') {
        done(newUser);
      } else {
        done();
      }
    }).catch(err => {
      done(err);
    });
  });
});

describe('User Instance Methods', () => {
  describe('validPassword', () => {
    it('should validate correct password', done => {
      db.user.findOne().then(user => {
        if (user.validPassword('password')) {
          done();
        } else {
          done(user);
        }
      }).catch(err => {
        done(err);
      });
    });

    it('should invalidate incorrect password', done => {
      db.user.findOne().then(user => {
        if (!user.validPassword('incorrect')) {
          done();
        } else {
          done(user);
        }
      }).catch(err => {
        done(err);
      });
    });
  });

  describe('toJSON', () => {
    it('should return user without password field', done => {
      db.user.findOne().then(user => {
        if (user.toJSON().password === undefined) {
          done();
        } else {
          done(user);
        }
      }).catch(error => {
        done(error);
      });
    });
  });
});