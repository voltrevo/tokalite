'use strict';

var opentokPromise = require('./opentokPromise.js');

var Publisher = undefined;

var publish = function(otSession, targetElement, properties) {
  return opentokPromise.then(function(OT) {
    return new Promise(function(resolve, reject) {
      var otPublisher = OT.initPublisher(targetElement, properties, function(err) {
        if (err) {
          reject(err);
          return;
        }

        otSession.publish(otPublisher, function(err2) {
          if (err2) {
            reject(err2);
            return;
          }

          resolve(Publisher(otSession, otPublisher));
        });
      });
    });
  });
};

Publisher = function(otSession, otPublisher) {
  var publisher = {};

  publisher.stop = function() {
    otSession.unpublish(otPublisher);
  };

  return publisher;
};

module.exports = publish;
