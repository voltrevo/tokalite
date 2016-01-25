'use strict';

module.exports = function(otPublisher) {
  var publisher = {};

  publisher.publish = function(session) {
    return session._.otPublish(otPublisher).then(function() {
      return {
        stop: function() { session._.otUnpublish(otPublisher); }
      };
    });
  };

  publisher.remove = function() {
    otPublisher.destroy();
  };

  return publisher;
};
