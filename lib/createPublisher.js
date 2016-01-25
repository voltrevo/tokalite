'use strict';

var opentokPromise = require('./opentokPromise.js');
var Publisher = require('./Publisher.js');

module.exports = function(targetElement, properties) {
  return opentokPromise.then(function(OT) {
    return new Promise(function(resolve, reject) {
      var otPublisher = OT.initPublisher(targetElement, properties, function(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(Publisher(otPublisher));
      });
    });
  });
};
