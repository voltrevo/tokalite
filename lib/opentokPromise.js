'use strict';

var assert = require('assert');

var domReady = (
  window.document.readyState === 'complete' ?
  Promise.resolve() :
  new Promise(function(resolve) {
    window.addEventListener('load', resolve);
  })
);

module.exports = domReady.then(function() {
  return new Promise(function(resolve) {
    var otScript = document.createElement('script');
    otScript.setAttribute('src', '//static.opentok.com/v2/js/opentok.js');
    otScript.setAttribute('async', '');
    document.head.appendChild(otScript);

    otScript.addEventListener('load', function() {
      assert('OT' in window);
      resolve(window.OT);
    });
  });
});
