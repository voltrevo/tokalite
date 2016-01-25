# tokalite [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> An alternative api for the opentok js library.


## Install

```sh
$ npm install --save tokalite
```


## Usage

### Publish to a session and subscribe to all streams

```js
'use strict';

var tokalite = require('tokalite');

var token = '(your opentok token)';

Promise.all(
  tokalite.conect(token),
  tokalite.createPublisher()
).then(function(res) {
  var session = res[0];
  var publisher = res[1];

  publisher.publish(session);

  session.on('stream', function(stream) {
    stream.subscribe();
  });
});
```

### `tokalite.connect(token)`

Takes an opentok token and returns a promise to a `Session`.

### `Session`

| Method | Description |
|--------|-------------|
| `.isConnected()` | Returns a boolean indicating whether the connection is still alive. |
| `.getDisconnectionPromise()` | Returns a promise that resolves when the session is disconnected. |
| `.getStreams()` | Returns an array of external streams associated with the session (no publishers). |

| Event | Description |
|-------|-------------|
| stream | Emits a `Stream` when one becomes available. |

### `Stream`

| Method | Description |
|--------|-------------|
| `.subscribe(targetElement?, properties?)` | Returns a promise to a `Subscriber`. Optional arguments `targetElement` and `properties` are passed to [`session.subscribe`](https://tokbox.com/developer/sdks/js/reference/Session.html#subscribe) in opentok.js |
| `.isConnected()` | Returns a boolean indicating whether the stream is still available. |
| `.getDisconnectionPromise()` | Returns a promise that resolves when the stream becomes unavailable. |

### `Subscriber`

| Method | Description |
|--------|-------------|
| remove | Removes the subscriber from the DOM and the subscription to the stream. |

| Property | Description |
|----------|-------------|
| stream | The stream being subscribed to. |

### `tokalite.createPublisher(targetElement?, properties?)`

Returns a promise to a `Publisher`. `targetElement` and `properties` are optional and passed to [`OT.initPublisher()`](https://tokbox.com/developer/sdks/js/reference/OT.html#initPublisher).

### `Publisher`

| Method | Description |
|--------|-------------|
| `.publish(session)` | Publishes to the provided session. Returns a promise to a `PublishHandle`. |
| `.remove()` | Removes the publisher from the DOM and any session published to. |

### `PublishHandle`

| Method | Description |
|--------|-------------|
| `.stop()` | Stops publishing to the session. |

## License

MIT © [Andrew Morris](https://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/tokalite.svg
[npm-url]: https://npmjs.org/package/tokalite
[travis-image]: https://travis-ci.org/voltrevo/tokalite.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/tokalite
[daviddm-image]: https://david-dm.org/voltrevo/tokalite.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/tokalite
[coveralls-image]: https://coveralls.io/repos/voltrevo/tokalite/badge.svg
[coveralls-url]: https://coveralls.io/r/voltrevo/tokalite
