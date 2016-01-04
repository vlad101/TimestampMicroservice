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
  var date = new Date(isNaN(req.params.dateStr) ? req.params.dateStr : Number(req.params.dateStr));
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var month = month[date.getMonth()];
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  var dateFormat = month + ' ' + day + ', ' + year;
  var data = {};
  data.unix = dateFormat;
  data.natural = dateFormat;
  return res.json(data);
}