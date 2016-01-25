'use strict';

var bluebird = require('bluebird');
var EventEmitter = require('event-emitter');

var publish = require('./publish.js');
var Stream = require('./Stream.js');

module.exports = function(otSession) {
  var session = EventEmitter();

  var disconnectionDefer = bluebird.defer();
  var connected = true;
  var streams = [];

  session.isConnected = function() {
    return connected;
  };

  session.getDisconnectionPromise = function() {
    return disconnectionDefer.promise;
  };

  session.publish = function(targetElement, properties) {
    return publish(otSession, targetElement, properties);
  };

  session.getStreams = function() {
    return streams.slice();
  };

  otSession.on('streamCreated', function(evt) {
    var stream = Stream(otSession, evt.stream);
    streams.push(stream);

    stream.getDisconnectionPromise().then(function() {
      streams = streams.filter(function(s) {
        return s !== stream;
      });
    });

    session.emit('stream', stream);
  });

  otSession.on('sessionDisconnected', function() {
    disconnectionDefer.resolve();
  });

  return session;
};
