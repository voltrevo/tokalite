'use strict';

var bluebird = require('bluebird');
var EventEmitter = require('event-emitter');

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

  session._ = {};

  session._.otPublish = function(otPublisher) {
    return new Promise(function(resolve, reject) {
      otSession.publish(otPublisher, function(err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  };

  session._.otUnpublish = function(otPublisher) {
    var listener = undefined;

    otPublisher.on('streamDestroyed', listener = function(evt) {
      if (evt.stream.connection.connectionId === otSession.connection.connectionId) {
        evt.preventDefault();
        otSession.off(listener);
      }
    });

    otSession.unpublish(otPublisher);
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
