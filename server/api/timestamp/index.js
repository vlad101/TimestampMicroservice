'use strict';

var express = require('express');
var controller = require('./timestamp.controller');

var router = express.Router();

router.get('/:dateStr', controller.getDateJson);

module.exports = router;