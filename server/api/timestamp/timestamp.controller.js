/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/timestamp/:dateStr     ->  getDateJson
 */

'use strict';

// Gets Date service
// Request http://localhost:9000/api/timestamp/1451970000
// Request http://localhost:9000/api/timestamp/January 5, 2016
// Response: {"unix":1451970000,"natural":"January 5, 2016"}
export function getDateJson(req, res) {
  var data = {};
  var unixDate = null;
  var naturalDate = 'Invalid Date';

  if(isNaN(req.params.dateStr)) {
    if(req.params.dateStr == null || !isValidDateFormat(req.params.dateStr)) {
      unixDate = null;
      naturalDate = null;  
    } else {
      unixDate = naturalToUnixDateConverter(req.params.dateStr);
      naturalDate = req.params.dateStr;
    }
  } else {
    unixDate = Number(req.params.dateStr)
    naturalDate = unixToNaturalDateConverter(Number(req.params.dateStr));
  }

  data.unix = unixDate;
  data.natural = naturalDate;
  return res.json(data);
}

function unixToNaturalDateConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = [ "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + ' ' + date + ', ' + year;
  return time;
}

function naturalToUnixDateConverter(natural_timestamp){
  return Date.parse(natural_timestamp) / 1000;
}

function isValidDateFormat(natural_timestamp) {
  if(new Date(natural_timestamp) == 'Invalid Date')
    return false;
  return true;
}