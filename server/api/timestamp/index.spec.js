'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var timestampCtrlStub = {
  index: 'timestampCtrl.index',
  show: 'timestampCtrl.show',
  create: 'timestampCtrl.create',
  update: 'timestampCtrl.update',
  destroy: 'timestampCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var timestampIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './timestamp.controller': timestampCtrlStub
});

describe('Timestamp API Router:', function() {

  it('should return an express router instance', function() {
    timestampIndex.should.equal(routerStub);
  });

  describe('GET /api/timestamp', function() {

    it('should route to timestamp.controller.index', function() {
      routerStub.get
        .withArgs('/', 'timestampCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/timestamp/:id', function() {

    it('should route to timestamp.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'timestampCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/timestamp', function() {

    it('should route to timestamp.controller.create', function() {
      routerStub.post
        .withArgs('/', 'timestampCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/timestamp/:id', function() {

    it('should route to timestamp.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'timestampCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/timestamp/:id', function() {

    it('should route to timestamp.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'timestampCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/timestamp/:id', function() {

    it('should route to timestamp.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'timestampCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
