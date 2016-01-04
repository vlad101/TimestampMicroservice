/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/timestamp/:dateStr     ->  getDateJson
 */

'use strict';

import _ from 'lodash';
var Timestamp = require('./timestamp.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Gets Date service
// Request http://localhost:9000/api/timestamp/1450137601
// Response: {"unix":1450137601,"natural":"December 15, 2015"}
export function getDateJson(req, res) {
  var data = {};
  data.unix = Number(req.params.dateStr);
  data.natural = null;
  return res.json(data);
}