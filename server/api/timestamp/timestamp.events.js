/**
 * Timestamp model events
 */

'use strict';

import {EventEmitter} from 'events';
var Timestamp = require('./timestamp.model');
var TimestampEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TimestampEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Timestamp.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TimestampEvents.emit(event + ':' + doc._id, doc);
    TimestampEvents.emit(event, doc);
  }
}

export default TimestampEvents;
