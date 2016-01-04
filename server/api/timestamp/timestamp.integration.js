'use strict';

var app = require('../..');
import request from 'supertest';

var newTimestamp;

describe('Timestamp API:', function() {

  describe('GET /api/timestamp', function() {
    var timestamps;

    beforeEach(function(done) {
      request(app)
        .get('/api/timestamp')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          timestamps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      timestamps.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/timestamp', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/timestamp')
        .send({
          name: 'New Timestamp',
          info: 'This is the brand new timestamp!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTimestamp = res.body;
          done();
        });
    });

    it('should respond with the newly created timestamp', function() {
      newTimestamp.name.should.equal('New Timestamp');
      newTimestamp.info.should.equal('This is the brand new timestamp!!!');
    });

  });

  describe('GET /api/timestamp/:id', function() {
    var timestamp;

    beforeEach(function(done) {
      request(app)
        .get('/api/timestamp/' + newTimestamp._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          timestamp = res.body;
          done();
        });
    });

    afterEach(function() {
      timestamp = {};
    });

    it('should respond with the requested timestamp', function() {
      timestamp.name.should.equal('New Timestamp');
      timestamp.info.should.equal('This is the brand new timestamp!!!');
    });

  });

  describe('PUT /api/timestamp/:id', function() {
    var updatedTimestamp;

    beforeEach(function(done) {
      request(app)
        .put('/api/timestamp/' + newTimestamp._id)
        .send({
          name: 'Updated Timestamp',
          info: 'This is the updated timestamp!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTimestamp = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTimestamp = {};
    });

    it('should respond with the updated timestamp', function() {
      updatedTimestamp.name.should.equal('Updated Timestamp');
      updatedTimestamp.info.should.equal('This is the updated timestamp!!!');
    });

  });

  describe('DELETE /api/timestamp/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/timestamp/' + newTimestamp._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when timestamp does not exist', function(done) {
      request(app)
        .delete('/api/timestamp/' + newTimestamp._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
