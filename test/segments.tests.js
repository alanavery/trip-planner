let expect = require('chai').expect;
let request = require('supertest');
let app = require('../server');
let db = require('../models');
let agent = request.agent(app);
let { exec } = require('child_process');

before(done => {
  db.sequelize.sync({ force: true }).then(() => {
    exec('sequelize db:seed:all');
  }).then(() => {
    done();
  });
});

describe('Create Segment', () => {
  before(done => {
    db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe30@gmail.com',
      password: 'password'
    }).then(user => {
      user.createTrip({
        name: 'Chicago',
        startDate: '2021-01-01',
        endDate: '2021-01-07'
      }).then(() => {
        done();
      });
    });
  });

  it('should create successfully and be assigned subcategory', done => {
    db.user.findOne({
      where: {
        email: 'jdoe30@gmail.com'
      }
    }).then(user => {
      user.getTrips().then(trips => {
        trips[0].createSegment({
          startTime: new Date('2020-12-02T12:00:00Z'),
          endTime: new Date('2020-12-02T13:00:00Z'),
          name: 'Museum of Science and Industry',
          address: '5700 S Lake Shore Dr, Chicago, IL 60637',
          phone: '(773) 684-1414',
          url: 'https://www.msichicago.org/',
          notes: 'The price for kids is $12.95 (ages 3-11).',
          booked: false
        }).then(segment => {
          db.subcategory.findOne({
            where: { name: 'Museum' }
          }).then(subcategory => {
            subcategory.addSegment(segment);
            done();
          }).catch(err => {
            done(err);
          });
        });
      });
    });
  });

  it('should throw error on invalid start time', done => {
    db.user.findOne({
      where: {
        email: 'jdoe30@gmail.com'
      }
    }).then(user => {
      user.getTrips().then(trips => {
        trips[0].createSegment({
          startTime: new Date('start date'),
          endTime: new Date('2020-12-02T13:00:00Z'),
          name: 'Museum of Science and Industry',
          address: '5700 S Lake Shore Dr, Chicago, IL 60637',
          phone: '(773) 684-1414',
          url: 'https://www.msichicago.org/',
          notes: 'The price for kids is $12.95 (ages 3-11).',
          booked: false
        }).then(segment => {
          done(segment);
        }).catch(err => {
          done();
        });
      });
    });
  });

  it('should throw error on invalid end time', done => {
    db.user.findOne({
      where: {
        email: 'jdoe30@gmail.com'
      }
    }).then(user => {
      user.getTrips().then(trips => {
        trips[0].createSegment({
          startTime: new Date('2020-12-02T12:00:00Z'),
          endTime: new Date('end time'),
          name: 'Museum of Science and Industry',
          address: '5700 S Lake Shore Dr, Chicago, IL 60637',
          phone: '(773) 684-1414',
          url: 'https://www.msichicago.org/',
          notes: 'The price for kids is $12.95 (ages 3-11).',
          booked: false
        }).then(segment => {
          done(segment);
        }).catch(err => {
          done();
        });
      });
    });
  });

  it('should throw error on invalid name', done => {
    db.user.findOne({
      where: {
        email: 'jdoe30@gmail.com'
      }
    }).then(user => {
      user.getTrips().then(trips => {
        trips[0].createSegment({
          startTime: new Date('2020-12-02T12:00:00Z'),
          endTime: new Date('2020-12-02T13:00:00Z'),
          name: '',
          address: '5700 S Lake Shore Dr, Chicago, IL 60637',
          phone: '(773) 684-1414',
          url: 'https://www.msichicago.org/',
          notes: 'The price for kids is $12.95 (ages 3-11).',
          booked: false
        }).then(segment => {
          done(segment);
        }).catch(err => {
          done();
        });
      });
    });
  });

  it('should create successfully without address, phone, url or notes', done => {
    db.user.findOne({
      where: {
        email: 'jdoe30@gmail.com'
      }
    }).then(user => {
      user.getTrips().then(trips => {
        trips[0].createSegment({
          startTime: new Date('2020-12-02T13:00:00Z'),
          endTime: new Date('2020-12-02T14:00:00Z'),
          name: 'Shedd Aquarium',
          address: null,
          phone: null,
          url: null,
          notes: null,
          booked: false
        }).then(segment => {
          done();
        }).catch(err => {
          done(err);
        });
      });
    });
  });
});